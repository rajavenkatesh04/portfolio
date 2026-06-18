---
title: "Building a RAG system that understands code-mixed Tamil"
date: "2026-05-28"
excerpt: "How I built a disaster-relief chatbot that answers questions in Tamil, English, and Tanglish — grounded in official government documents, not the model's imagination."
relatedProject: "code-mixed-rag-disaster-relief-chatbot"
---

When a cyclone is bearing down on the Tamil Nadu coast, people don't open a help desk and type in clean, grammatically correct English. They type the way they actually speak — half Tamil, half English, often in Latin script. "Evacuation center enga irukku?" "Relief fund apply panna eppadi?"

Most question-answering systems fall apart on exactly this kind of input. I wanted to build one that didn't — and, just as importantly, one that **never made up an answer** about something as high-stakes as disaster relief.

This is the story of that system.

## The two hard problems

There were really two problems hiding inside one project:

1. **Code-mixed, multi-script input.** The same question could arrive in Tamil script, English, or romanized Tanglish. A naive keyword search indexes none of these the same way.
2. **Zero tolerance for hallucination.** A model that confidently invents a relief-fund phone number is worse than useless. Every answer had to be traceable to an official document.

Retrieval-augmented generation (RAG) is the natural fit for the second problem: instead of asking the model what it *knows*, you retrieve the relevant source text first and ask it to answer *only from that*.

## Ingesting the official documents

The knowledge base was a set of government PDFs and circulars. The first step was chunking them into passages small enough to retrieve precisely but large enough to stay coherent.

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=120,
    separators=["\n\n", "\n", ". ", " "],
)

chunks = splitter.split_documents(raw_docs)
```

The overlap matters more than people expect: a relief eligibility rule that spans a paragraph break should never get split across two chunks with no shared context.

## Embeddings that survive language mixing

The key decision was the embedding model. I needed one whose vector space placed "evacuation center," the Tamil equivalent, and "evacuation center enga" near each other. A multilingual embedding model handles this surprisingly well, because it was trained to align meanings across languages rather than match surface strings.

I indexed the embeddings with FAISS for fast similarity search:

```python
import faiss
from langchain_community.vectorstores import FAISS

vector_store = FAISS.from_documents(chunks, embedding_model)
vector_store.save_local("faiss_index")

# At query time:
retriever = vector_store.as_retriever(search_kwargs={"k": 4})
```

`k=4` was a deliberate choice. Too few passages and the model misses context; too many and it gets distracted by loosely related text — and you burn tokens.

## Grounding the generation

This is the part that keeps the system honest. The retrieved passages go into the prompt, and the instruction is explicit: answer from the context, and if the context doesn't contain the answer, say so.

```python
SYSTEM_PROMPT = """You are a disaster-relief assistant.
Answer ONLY using the provided context.
If the answer is not in the context, say you don't have that information.
Reply in the same language and script the user used."""

def answer(query: str) -> str:
    docs = retriever.invoke(query)
    context = "\n\n".join(d.page_content for d in docs)
    return llm.invoke(
        [
            ("system", SYSTEM_PROMPT),
            ("human", f"Context:\n{context}\n\nQuestion: {query}"),
        ]
    ).content
```

That last line of the system prompt — *reply in the same language and script the user used* — is what makes Tanglish-in, Tanglish-out work. Llama-3.3-70B is strong enough multilingually to mirror the user's register without a separate translation step.

> The single most valuable instruction in the whole system is "if the answer is not in the context, say you don't have that information." Without it, RAG still hallucinates — it just hallucinates more plausibly.

## What I'd do differently

A few things I learned:

- **Evaluate retrieval separately from generation.** Most "wrong answers" were actually retrieval misses. Fixing the chunker fixed more bugs than fixing the prompt.
- **Log the retrieved context with every answer.** When something goes wrong, you want to see exactly what the model was looking at.
- **Multilingual embeddings beat translate-then-search.** Translating Tanglish to English first lost nuance and added a failure point.

The result is a system that meets people where they are — in their own words, in their own script — and answers them with information it can actually point to. For a domain like disaster relief, that combination of accessibility and trustworthiness is the whole point.

If you want the short version with the architecture and the numbers, the [project page](/projects/code-mixed-rag-disaster-relief-chatbot) has it.
