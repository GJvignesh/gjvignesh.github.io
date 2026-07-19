---
title: "Key Takeaways from Red Hat Meetup: Confidential Computing, Digital Assets & AI Sandboxing"
description: "An in-depth summary of three key sessions from a Red Hat community meetup covering Confidential Computing, Digital Assets security, and AI agent sandboxing at scale."
author: "Vignesh GJ"
date: 2026-07-19
tags:
  - Confidential Computing
  - Red Hat
  - CodeRabbit
  - Security
  - AI
  - Containers
  - Cloud Computing
---

# Key Takeaways from the Red Hat Meetup: Confidential Computing, Digital Assets & AI Sandboxing

I recently attended a Red Hat community meetup featuring speakers from Red Hat, IBM, and CodeRabbit. The sessions covered three fascinating topics:

- Confidential Computing fundamentals
- Why Confidential Computing matters for Digital Assets
- How CodeRabbit securely executes AI agents using large-scale sandboxes

Among these, the session by **Prashanth Pai (Principal Engineer, CodeRabbit)** was my personal favorite because it provided practical insights into how modern AI systems are built securely at scale.

---

# Session 1 — Confidential Computing: An Overview

**Speaker:** Pradipta Banerjee  
*Maintainer – Confidential Containers Project*

## Why Confidential Computing?

Traditionally, data stored in RAM exists in plaintext while applications are running.

Even if encryption protects data:

- at rest
- in transit

the data is still vulnerable **while being processed**.

An attacker who gains sufficient privileges could potentially dump application memory and extract sensitive information.

Confidential Computing addresses this exact problem.

---

## Trusted Execution Environments (TEE)

Modern CPUs provide **Trusted Execution Environments (TEE)**.

When enabled through software:

- a protected region of memory is carved out
- only trusted code can access it
- even privileged software like the hypervisor cannot inspect the contents

This significantly reduces the attack surface.

The speaker also mentioned that the performance overhead is surprisingly small—roughly **3%** for many workloads.

---

## Different Deployment Models

The ecosystem is evolving beyond just secure virtual machines.

Examples include:

- Confidential Virtual Machines
- Confidential Containers
- Confidential Kubernetes Clusters

Even consumer devices are adopting similar concepts.

For example, Apple devices include hardware-backed secure execution environments for handling highly sensitive operations such as biometric authentication and cryptographic key storage.

---

# Session 2 — Why Confidential Computing Matters to Digital Assets

**Speaker:** Anbazhagan Mani  
*Distinguished Engineer, IBM Z & LinuxONE Development*

This session connected Confidential Computing with one of the fastest-growing security domains—digital assets.

---

## Why Is It Needed?

The speaker began with several real-world incidents involving sensitive information leaks, including examples from product design and critical infrastructure.

The takeaway was straightforward:

> Data is valuable, and attackers target wherever sensitive information exists.

---

## Thinking About Cryptocurrency from a Computer Architecture Perspective

One interesting perspective presented was:

> What exactly is a cryptocurrency?

At the systems level, ownership fundamentally comes down to one thing:

**The private key.**

If someone gains access to your private key, ownership is effectively transferred.

Protecting that key therefore becomes the highest security priority.

---

## Immutable Data Structures

Another important concept discussed was the use of **Merkle Trees**.

Blockchain systems maintain an immutable distributed ledger where:

- transactions are grouped
- hashes are computed recursively
- the root hash represents the integrity of the entire tree

Changing even a single transaction changes every parent hash.

This property makes tampering immediately detectable.

---

## Why Banking Cares

As digital assets become increasingly integrated with financial systems, protecting:

- payment infrastructure
- private keys
- transaction processing

becomes increasingly critical.

Confidential Computing offers another layer of protection during execution—not just during storage or transmission.

---

## Does Confidential Computing Solve Everything?

One audience member asked an important question:

> Does Confidential Computing solve all security problems?

The answer was **No.**

Instead, it should be viewed as one important building block of a **Zero Trust Architecture**.

Security still requires multiple complementary layers.

---

## Future Directions

The speaker highlighted several interesting research directions:

- Hybrid privacy architectures combining:
  - Trusted Execution Environments (TEE)
  - Zero-Knowledge Proofs (ZK)
  - Fully Homomorphic Encryption (FHE)
  - Multi-Party Computation (MPC)

- Confidential AI Agents managing digital assets

- Post-Quantum Cryptography

These are exciting areas to watch over the next few years.

---

# Session 3 — LLMs Behind Bars: Sandboxes at Scale for AI on a Short Leash

**Speaker:** Prashanth Pai  
*Principal Engineer, CodeRabbit*

This was my favorite session of the meetup.

Rather than focusing on theory, it explored the practical engineering challenges of securely executing AI agents.

---

# The Core Problem

Modern AI coding agents can:

- execute shell commands
- run scripts
- inspect repositories
- compile projects
- execute arbitrary code

This creates a significant security risk.

Instead of trusting the generated code, CodeRabbit isolates execution inside sandboxes.

---

# Sandboxing at Massive Scale

One particularly impressive statistic:

> CodeRabbit spins up roughly **500,000 sandboxes every day.**

That scale immediately highlights why operational efficiency matters.

---

# Not Every Task Needs a Sandbox

One interesting engineering optimization was that sandboxing is **selective**.

For many pull requests:

- reviewing Git diffs is sufficient
- no code execution is necessary

Sandbox environments are primarily created for larger or more complex reviews where execution provides meaningful additional context.

This is a great example of balancing security with cost and latency.

---

# Agent vs Sandbox

The speaker distinguished between two concepts:

- **Agent Harness** — the application logic coordinating the AI
- **Sandbox** — the isolated execution environment

A useful analogy:

> Agent Harness = Driver  
> Sandbox = Seatbelt

The sandbox limits what the AI can do if something goes wrong.

---

# Two Sandboxing Patterns

## Pattern 1 — Agent Outside the Sandbox

The AI agent:

- streams scripts into the sandbox
- executes them
- receives the output
- continues reasoning outside

This is operationally simpler and easier to manage.

---

## Pattern 2 — Agent Inside the Sandbox

The entire AI agent runs inside the sandbox.

Advantages:

- stronger isolation

Trade-offs:

- operational complexity
- lifecycle management
- infrastructure overhead

---

# Creating Sandboxes

Containers are only one implementation option.

The speaker mentioned several technologies:

- Containers
- Podman
- MicroVMs
- gVisor

Each offers different trade-offs between isolation, compatibility and performance.

---

# Secret Management for AI Agents

One of the most interesting parts of the talk was how secrets are protected.

The challenge:

AI agents should never directly access production credentials.

Two approaches were discussed.

---

## Approach 1 — Secret Broker

Instead of exposing real credentials:

- fake credentials are injected into the sandbox
- outbound requests pass through a proxy
- the proxy replaces fake credentials with real ones
- access rules are enforced per sandbox

Example components include:

- Envoy
- Credential Injectors

This significantly reduces the risk of credential leakage.

---

## Approach 2 — Tokenized Secrets

Instead of credentials:

the sandbox receives encrypted opaque tokens.

The proxy:

- decrypts the token
- validates permissions
- performs the request

One drawback is that some applications perform credential format validation, which tokenization may complicate.

---

# Durable Workflows

Another interesting implementation detail was the use of **Durable Workflows** to coordinate long-running AI tasks.

This enables reliable execution even when workflows involve multiple asynchronous steps.

---

# Learnings About AI Agents

One particularly thought-provoking insight was around **Model Context Protocol (MCP).**

The speaker argued that MCPs often introduce excessive context into the model.

More context means:

- larger search space
- higher token usage
- increased hallucination risk

An alternative approach is using lightweight custom tools where the AI generates scripts and executes them as needed.

This gives the model greater flexibility while keeping the context window smaller.

The trade-off is that custom tools introduce additional engineering and maintenance overhead.

---

# Final Thoughts

This meetup nicely connected three important trends:

- securing workloads with Confidential Computing
- protecting digital assets using Zero Trust principles
- safely deploying AI agents through sandboxing

My biggest takeaway wasn't any individual technology—it was seeing how modern systems increasingly rely on **multiple complementary security layers** rather than a single solution.

As AI systems gain more autonomy, techniques like Confidential Computing, sandboxing, and secure secret management are likely to become foundational parts of production AI infrastructure.

Looking forward to attending more engineering meetups like this.
