# Red Hat Meetup: Confidential Computing, Digital Assets & AI Sandboxing

## A Deep Dive into Modern Security Architecture

---

## Table of Contents

- [Introduction](#introduction)
- [Session 1: Confidential Computing Overview](#session-1-confidential-computing-overview)
- [Session 2: Digital Assets Protection](#session-2-why-confidential-computing-matters-to-digital-assets)
- [Session 3: AI Sandboxing at Scale](#session-3-llms-behind-bars-sandboxes-at-scale-for-ai-on-a-short-leash)
- [Key Takeaways](#key-takeaways)
- [Conclusion](#conclusion)

---

## Introduction

I recently had the privilege of attending a Red Hat community meetup featuring distinguished speakers from Red Hat, IBM, and CodeRabbit. The sessions explored three interconnected pillars of modern security architecture:

1. **Confidential Computing** — protecting data during processing
2. **Digital Asset Security** — applying Zero Trust principles to cryptocurrency
3. **AI Sandboxing** — securely executing AI agents at scale

This blog synthesizes my notes, observations, and key learnings from each session.

```mermaid
flowchart TB
    subgraph Security["Security Architecture"]
        CC[Confidential Computing<br/>Protect Data in Use]
        DA[Digital Assets<br/>Zero Trust Principles]
        AI[AI Sandboxing<br/>Secure Execution]
    end
    
    CC -->|Enables| DA
    DA -->|Informs| AI
    AI -->|Requires| CC
    
    style Security fill:#f9f9f9,stroke:#333,stroke-width:2px
    style CC fill:#e1f5fe,stroke:#0277bd
    style DA fill:#e8f5e9,stroke:#2e7d32
    style AI fill:#fff3e0,stroke:#e65100
```

---

## Session 1: Confidential Computing Overview

**Speaker:** Pradipta Banerjee  
*Maintainer – Confidential Containers Project*

### The Problem: Data in the Clear

Traditional security models protect data through encryption:

- **Data at Rest** — encrypted storage
- **Data in Transit** — encrypted communication channels

However, **Data in Use** remains vulnerable. While applications are running, data resides in RAM as plaintext. An attacker with sufficient privileges could:

- Dump application memory
- Extract sensitive information
- Bypass encryption entirely

> "Even with the strongest encryption, your data is exposed during processing. Confidential Computing solves this by protecting data while it's being used."

### Trusted Execution Environments (TEE)

Modern CPUs provide **Trusted Execution Environments (TEE)** . When enabled through software:

```mermaid
graph TD
    A[Application Request] --> B[CPU Instruction]
    B --> C{TEE Enabled?}
    C -->|Yes| D[Protected Memory Region]
    C -->|No| E[Standard Memory]
    D --> F[Hardware Isolation]
    F --> G[Even Hypervisor Can't Access]
    G --> H[Secure Execution]
    
    style D fill:#c8e6c9,stroke:#2e7d32
    style G fill:#ffcdd2,stroke:#c62828
```

**Key Capabilities:**

- Carves out a protected region of memory
- Only trusted code can access this region
- Even privileged software (hypervisor, host OS) cannot inspect contents
- **Performance overhead: ~3%** — surprisingly minimal for most workloads

### Deployment Models

The ecosystem has evolved significantly:

| Model | Description | Use Case |
|-------|-------------|----------|
| **Confidential VMs** | Traditional VMs with TEE protection | Legacy applications |
| **Confidential Containers** | Containerized workloads with TEE | Cloud-native apps |
| **Confidential Kubernetes** | Orchestrated confidential workloads | Enterprise deployments |
| **Device-Level TEE** | Consumer hardware protection | Mobile devices, IoT |

**Interesting Note:** Apple devices incorporate similar concepts for biometric authentication and cryptographic key storage — making Confidential Computing accessible to billions of consumers.

---

## Session 2: Why Confidential Computing Matters to Digital Assets

**Speaker:** Anbazhagan Mani  
*Distinguished Engineer, IBM Z & LinuxONE Development*

### Real-World Incidents

The session began with sobering examples of security breaches:

```mermaid
timeline
    title Major Security Incidents
    iPhone Design Leak : Confidential product schematics exposed
    Kudankulam Power Plant : Critical infrastructure breach
    Coin DCX Attack : Social engineering + malware
    Private Key Theft : Employee installed malicious software
```

**The core lesson:** Data is valuable, and attackers target wherever sensitive information resides.

### Understanding Cryptocurrency Through Systems Architecture

A fascinating perspective emerged:

> "What exactly is a cryptocurrency at the systems level? Ownership fundamentally comes down to one thing: **the private key.** "

```mermaid
flowchart LR
    subgraph Ownership["Cryptocurrency Ownership"]
        PK[Private Key] -->|Derives| PB[Public Key]
        PB -->|Generates| A[Address]
        A -->|Stores| B[Balance]
        PK -->|Signs| T[Transactions]
    end
    
    subgraph Risk["Threat Model"]
        L[Key Leakage] -->|Loss of| O[Full Ownership]
        M[Malware] -->|Steals| PK
    end
    
    style PK fill:#ffcdd2,stroke:#c62828
    style L fill:#ffcdd2,stroke:#c62828
```

**If someone gains access to your private key, ownership is effectively transferred.** This makes key protection the highest security priority.

### Immutable Data Structures: Merkle Trees

Blockchain systems maintain immutability through Merkle Trees:

```mermaid
graph TD
    R[Root Hash<br/>Merkle Root] --> H1[Hash 1]
    R --> H2[Hash 2]
    H1 --> T1[Transaction 1]
    H1 --> T2[Transaction 2]
    H2 --> T3[Transaction 3]
    H2 --> T4[Transaction 4]
    
    T1 -->|Changing| C[Changes Parent Hash]
    C -->|Changes All| A[All Hashes Up to Root]
    A -->|Mismatch| D[Tampering Detected]
    
    style R fill:#e1f5fe,stroke:#0277bd
    style D fill:#ffcdd2,stroke:#c62828
```

**Why This Matters:**

- Transactions are grouped and hashed recursively
- The root hash represents the integrity of the entire tree
- Changing even a single transaction changes every parent hash
- Tampering becomes immediately detectable

### Banking Industry Implications

As digital assets integrate with financial systems, protecting:

- Payment infrastructure
- Private keys
- Transaction processing

...becomes critical. Confidential Computing adds protection during execution — not just storage or transmission.

### Q&A: Does Confidential Computing Solve Everything?

**Question:** "Does Confidential Computing solve all security problems?"

**Answer:** "No. It's one building block of a Zero Trust Architecture."

```mermaid
graph TD
    subgraph ZeroTrust["Zero Trust Architecture"]
        A[Identity Verification] --> B[Device Security]
        B --> C[Network Segmentation]
        C --> D[Confidential Computing]
        D --> E[Encryption]
        E --> F[Access Controls]
    end
    
    style ZeroTrust fill:#f5f5f5,stroke:#333,stroke-dasharray: 5 5
    style D fill:#c8e6c9,stroke:#2e7d32
```

### Future Research Directions

The speaker highlighted emerging areas:

```mermaid
graph LR
    subgraph Future["Future Directions"]
        H[Hybrid Privacy<br/>TEE + ZK + FHE + MPC] 
        C[Confidential AI Agents<br/>Managing Digital Assets]
        P[Post-Quantum Cryptography<br/>Resilience]
    end
    
    style Future fill:#e8f5e9,stroke:#2e7d32
    style H fill:#e3f2fd,stroke:#1565c0
    style C fill:#f3e5f5,stroke:#7b1fa2
    style P fill:#fff3e0,stroke:#e65100
```

| Technology | Description |
|------------|-------------|
| **Hybrid Privacy Architectures** | Combining TEE + ZK + FHE + MPC |
| **Confidential AI Agents** | AI managing digital assets securely |
| **Post-Quantum Resilience** | Preparing for quantum computing threats |

---

## Session 3: LLMs Behind Bars — Sandboxes at Scale for AI on a Short Leash

**Speaker:** Prashanth Pai  
*Principal Engineer, CodeRabbit*

**My Personal Favorite Session** — this explored practical engineering challenges of securely executing AI agents at massive scale.

### The Core Problem

Modern AI coding agents can:

```mermaid
graph TD
    A[AI Coding Agent] --> B[Execute Shell Commands]
    A --> C[Run Scripts]
    A --> D[Inspect Repositories]
    A --> E[Compile Projects]
    A --> F[Execute Arbitrary Code]
    
    B --> G[Security Risk]
    C --> G
    D --> G
    E --> G
    F --> G
    
    G --> H[Potential Data Leakage]
    G --> I[System Compromise]
    G --> J[Credential Theft]
    
    style A fill:#e1f5fe,stroke:#0277bd
    style G fill:#ffcdd2,stroke:#c62828
```

**The Solution:** Isolate execution inside sandboxes rather than trusting generated code.

### Scale: 500,000 Sandboxes Daily

```mermaid
graph LR
    subgraph Scale["CodeRabbit Scale"]
        D[500,000 Sandboxes/Day]
        E[Massive Infrastructure]
        F[Operational Efficiency]
    end
    
    style D fill:#c8e6c9,stroke:#2e7d32
```

This scale immediately highlights why operational efficiency matters.

### Optimization: Selective Sandboxing

**Not every task requires a sandbox:**

```mermaid
flowchart TD
    PR[Pull Request] --> Check{PR Size?}
    
    Check -->|Small/Simple| Diff[Review Git Diff Only]
    Check -->|Large/Complex| Sandbox[Spin Up Sandbox]
    
    Diff --> R1[Cost-Effective]
    Diff --> R2[Fast Review]
    
    Sandbox --> S1[Execute Code]
    Sandbox --> S2[More Context]
    Sandbox --> S3[Higher Cost]
    
    style Diff fill:#c8e6c9,stroke:#2e7d32
    style Sandbox fill:#fff3e0,stroke:#e65100
```

This balance between security and cost is a great engineering optimization.

### Agent vs. Sandbox

The speaker distinguished two concepts:

| Concept | Description | Analogy |
|---------|-------------|---------|
| **Agent Harness** | Application logic coordinating the AI | Driver |
| **Sandbox** | Isolated execution environment | Seatbelt |

> "The sandbox limits what the AI can do if something goes wrong — just like a seatbelt limits injury in a crash."

### Two Sandboxing Patterns

#### Pattern 1: Agent Outside the Sandbox

```mermaid
graph LR
    subgraph Pattern1["Pattern 1: Agent Outside"]
        A[Agent Harness] -->|Streams Scripts| S[Sandbox]
        S -->|Executes| R[Runs Code]
        R -->|Returns Output| A
        A -->|Continues Reasoning| N[Next Step]
    end
    
    style Pattern1 fill:#e3f2fd,stroke:#1565c0
```

**Advantages:**
- Operationally simpler
- Easier to manage
- Faster to implement

#### Pattern 2: Agent Inside the Sandbox

```mermaid
graph LR
    subgraph Pattern2["Pattern 2: Agent Inside"]
        A[Agent Harness] -->|Deploys| S[Sandbox with Agent]
        S -->|Contains| Agent[Full AI Agent]
        Agent -->|Executes| Code[Code]
    end
    
    style Pattern2 fill:#f3e5f5,stroke:#7b1fa2
```

**Advantages:**
- Stronger isolation
- Complete protection

**Trade-offs:**
- Operational complexity
- Lifecycle management
- Infrastructure overhead

### Sandbox Technologies

Containers are only one implementation option:

```mermaid
graph TD
    S[Sandbox Technologies] --> C[Containers]
    S --> P[Podman]
    S --> M[MicroVMs]
    S --> G[gVisor]
    
    C -->|Pros| CP[Lightweight, Fast]
    C -->|Cons| CC[Less Isolation]
    
    G -->|Pros| GP[GPU Support]
    G -->|Cons| GC[Performance Overhead]
    
    style S fill:#e1f5fe,stroke:#0277bd
    style G fill:#fff3e0,stroke:#e65100
```

### Secret Management for AI Agents

**The Challenge:** AI agents should never directly access production credentials.

#### Approach 1: Secret Broker

```mermaid
graph LR
    subgraph SecretBroker["Approach 1: Secret Broker"]
        S[Sandbox] -->|Uses Fake Creds| P[Egress Proxy]
        P -->|Replaces with Real| A[API]
        P -->|Enforces Rules| R[Access Rules]
        I[Credential Injector] -->|Injects Fake| S
    end
    
    style SecretBroker fill:#e8f5e9,stroke:#2e7d32
```

**How It Works:**
1. Fake credentials injected into sandbox
2. Outbound requests pass through proxy
3. Proxy replaces fake with real credentials
4. Access rules enforced per sandbox

**Components:**
- Envoy
- Credential Injectors

#### Approach 2: Tokenized Secrets

```mermaid
graph LR
    subgraph Tokenized["Approach 2: Tokenized Secrets"]
        S[Sandbox] -->|Receives Token| P[Stateless Proxy]
        P -->|Decrypts| D[Validate & Decrypt]
        D -->|Performs Request| A[API]
    end
    
    style Tokenized fill:#fff3e0,stroke:#e65100
```

**How It Works:**
1. Sandbox receives opaque encrypted token
2. Proxy decrypts token
3. Validates permissions
4. Performs the request

**Drawback:** Some applications perform credential format validation, complicating tokenization.

### Durable Workflows

Another interesting implementation detail:

```mermaid
graph TD
    W[Durable Workflows] --> C[Coordinate Long-Running AI Tasks]
    C --> R[Reliable Execution]
    R --> M[Multiple Asynchronous Steps]
    M --> S[State Management]
    
    style W fill:#e3f2fd,stroke:#1565c0
```

### Learnings About AI Agents

#### The MCP Challenge

> "Model Context Protocol (MCP) often introduces excessive context into the model."

**The Problem:**
- More context = larger search space
- Larger search space = higher token usage
- Higher token usage = increased hallucination risk

**The Alternative:**
Lightweight custom tools where AI generates scripts and executes them as needed.

```mermaid
graph TD
    subgraph Approach["Two Approaches"]
        M[MCP Approach] -->|Heavy Context| H[More Hallucinations]
        M -->|High Cost| C[More Tokens]
        
        T[Custom Tools] -->|Flexible| F[More Creativity]
        T -->|Lightweight| L[Smaller Context]
        T -->|Trade-off| O[Engineering Overhead]
    end
    
    style M fill:#ffcdd2,stroke:#c62828
    style T fill:#c8e6c9,stroke:#2e7d32
```

**Trade-off:** Custom tools introduce additional engineering and maintenance overhead.

---

## Key Takeaways

```mermaid
mindmap
  root((Key Takeaways))
    Security Layers
      Confidential Computing
      Zero Trust Architecture
      Sandboxing
    AI Safety
      Selective Sandboxing
      Secret Management
      Agent Isolation
    Scale & Performance
      500K Sandboxes Daily
      3% Performance Overhead
      Cost-Benefit Balance
    Future Trends
      Hybrid Privacy
      Confidential AI Agents
      Post-Quantum Crypto
```

### The Big Picture

1. **Confidential Computing** — Protects data during processing
2. **Digital Assets** — Apply Zero Trust principles
3. **AI Sandboxing** — Secure execution at massive scale

### The Common Thread

My biggest takeaway wasn't any individual technology — it was seeing how modern systems rely on **multiple complementary security layers** rather than a single solution:

```mermaid
graph TD
    subgraph LayeredSecurity["Layered Security"]
        L1[Layer 1: Data at Rest Encryption]
        L2[Layer 2: Data in Transit Encryption]
        L3[Layer 3: Confidential Computing]
        L4[Layer 4: Zero Trust Architecture]
        L5[Layer 5: Sandboxing]
        L6[Layer 6: Secret Management]
    end
    
    L1 --> L2 --> L3 --> L4 --> L5 --> L6
    
    style LayeredSecurity fill:#f9f9f9,stroke:#333,stroke-width:2px
    style L3 fill:#e1f5fe,stroke:#0277bd
    style L5 fill:#fff3e0,stroke:#e65100
```

---

## Conclusion

As AI systems gain more autonomy, techniques like:

- **Confidential Computing** — protecting data in use
- **Sandboxing** — isolating AI execution
- **Secure Secret Management** — protecting credentials

...are becoming foundational parts of production AI infrastructure.

The meetup connected three important trends:

```mermaid
flowchart LR
    subgraph Trends["Three Connected Trends"]
        T1[Securing Workloads<br/>with Confidential Computing]
        T2[Protecting Digital Assets<br/>with Zero Trust Principles]
        T3[Deploying AI Agents<br/>through Sandboxing]
    end
    
    T1 -->|Enables| T2
    T2 -->|Informs| T3
    T3 -->|Requires| T1
    
    style Trends fill:#f5f5f5,stroke:#333,stroke-dasharray: 5 5
```

Looking forward to attending more engineering meetups like this and watching these technologies evolve.

---

*Published: [Date of Meetup]*

*Location: Red Hat Community Meetup*

*Tags: #ConfidentialComputing #AISecurity #ZeroTrust #Blockchain #Sandboxing #TechMeetup*