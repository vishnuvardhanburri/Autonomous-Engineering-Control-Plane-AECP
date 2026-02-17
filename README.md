<img width="1470" height="956" alt="Screenshot 2026-02-17 at 6 40 23 AM" src="https://github.com/user-attachments/assets/cc4b0f0b-8fd9-4fb6-bb10-9c2f5b4847ad" />

# Autonomous Engineering Control Plane (AECP)

Backend-first platform enabling **safe, deterministic autonomous AI-driven software engineering**.

---

## Core Principle

```
Agents propose → Control Plane validates → Execution executes
```

Autonomy is permitted.
Authority is controlled.

Agents:

* ❌ Do not deploy
* ❌ Do not merge
* ❌ Do not bypass policy
* ✅ Only propose structured actions

---

## 1. Why AECP Exists

AI agents dramatically increase engineering velocity.

Without governance, they also introduce:

* Non-deterministic deployments
* Silent model-cost escalation
* Unsafe rollouts
* Cascading production failures

AECP separates **intelligence from execution authority**, enabling autonomy without sacrificing reliability, safety, or auditability.

---

## 2. Entire Automation Architecture (End-to-End)

```
                GitHub Issue / API / Event
                            │
                            ▼
                    Control Plane API
                (Orchestrator + Governance)
                            │
                            ▼
                       Policy Engine
        -------------------------------------------------
        │                   │                         │
     AI Agents          Model Router               Adapters
        │                                              │
        └──────────────────────┬───────────────────────┘
                               ▼
                        Execution Layer
                   (GitHub Actions CI/CD)
                               │
                               ▼
                         Runtime System
                               │
                               ▼
                     Monitoring & Observability
                               │
                               ▼
                         Self-Healing Engine
```

### Architectural Guarantees

* Backend is the single source of truth
* Policies are enforced deterministically
* Execution only occurs through CI/CD
* All actions are logged and auditable

---

## 3. End-to-End Automation Flow

### Step 1 — Task Intake

* Task enters via GitHub Issue, API, or event
* Control Plane records the task
* State initialized as `RECEIVED`

---

### Step 2 — Orchestration

The Agent Orchestrator:

* Classifies task (feature / bug / infra / ops)
* Assigns the correct agent
* Tracks deterministic state transitions
* Logs all actions with trace IDs

No execution occurs at this stage.

---

### Step 3 — Agent Proposal (No Authority)

Agent produces a structured proposal:

* Code diff
* Risk level
* Cost estimate (USD + tokens)
* Deployment strategy
* Rollback plan
* Blast-radius analysis

Agent output is **advisory only**.

---

### Step 4 — Policy Enforcement

Proposal is validated against policy:

* Risk threshold
* Cost ceiling
* Security scan requirements
* Canary rollout rules
* Circuit breaker constraints

If validation fails → execution is blocked.

**Policy-first. Always.**

---

### Step 5 — Controlled Execution

If approved:

* Control Plane triggers GitHub Actions
* Canary deployment begins (e.g. 10%)
* Health checks execute automatically

Execution is mechanical — not intelligent.

---

### Step 6 — Monitoring & Observability

The system continuously tracks:

* Error rate
* Latency
* Deployment health
* Cost metrics
* Execution trace IDs

All actions are auditable.

---

### Step 7 — Self-Healing

```
Metric Breach
     ↓
Automatic Rollback
     ↓
Circuit Breaker Activated
     ↓
Execution Freeze
     ↓
Slack Notification
     ↓
Debug Agent Investigation
```

Rollback is automatic.
Human intervention is optional — **system safety is not**.

---

## 4. Core System Components

### Agent Orchestrator

* Deterministic state machine
* Agent assignment
* Execution lifecycle tracking
* Immutable audit logging

### Policy Engine

Policy-as-code enforcement:

* Risk classification
* Token and cost caps
* Security validation
* Canary thresholds
* Circuit breaker triggers

No approval → no execution.

### Model Router

* Multi-model abstraction
* Fallback chains
* Cost-aware routing
* Failure isolation

Model selection never controls deployment authority.

### Execution Layer

* GitHub Actions CI/CD
* Canary deployments
* Health validation
* Automatic rollback

### Self-Healing Engine

* Detects failure patterns
* Triggers rollback
* Freezes unsafe execution
* Escalates to debug agent

---

## 5. Policy DSL Example

```ts
export default {
  id: "prod-policy",

  risk: {
    maxLevel: "medium",
    requireHumanApprovalAbove: "medium"
  },

  cost: {
    maxTokens: 120000,
    maxUsd: 25,
    hardFailOnBreach: true
  },

  deployment: {
    strategy: "canary",
    canaryPercent: 10,
    autoRollback: {
      errorRateIncrease: 2.0,
      latencyIncreaseMs: 250,
      windowSeconds: 300
    }
  },

  circuitBreaker: {
    maxFailures: 2,
    freezeMinutes: 30
  }
};
```

Policies are:

* Versioned
* Reviewed
* Enforced **before** execution

---

## 6. CI/CD Integration (GitHub Actions)

```yaml
name: Autonomous Deployment

on:
  repository_dispatch:
    types: [aecp-approved-task]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: node scripts/evaluate-policy.js

  deploy:
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh --canary=10
      - run: ./health_check.sh

  rollback:
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - run: ./deploy.sh --rollback
```

Execution **cannot occur** without successful validation.

---


## 7. n8n Automation Layer (Execution Integrations)

AECP uses **n8n strictly as an execution and integration layer**, never as a decision-making system.

Once the Control Plane approves a task, it emits an execution event that triggers predefined n8n workflows.

### Visual: Approved Execution Fan-Out (n8n)

<img width="2940" height="1912" alt="image" src="https://github.com/user-attachments/assets/78763b2b-b2c4-413c-980f-b584fd9a3280" />


### What This Visual Demonstrates

The workflow above shows how **approved executions are fanned out safely**:

```
Control Plane (Approved Execution)
              ↓
          n8n Webhook
              ↓
      Normalize Execution Payload
              ↓
 ┌──────────────┼───────────────┐
 │              │               │
Trigger CI/CD   Notify Slack    Write Audit Log
(GitHub)        (Ops Visibility) (Governance)
```

### Responsibilities

* Trigger GitHub Actions workflows
* Notify operators via Slack
* Write immutable audit records
* Execute predefined operational workflows

### Explicit Non-Responsibilities

* ❌ No policy evaluation
* ❌ No approval logic
* ❌ No risk assessment
* ❌ No deployment authority

All execution decisions originate from the **Control Plane**.
n8n operates purely as a **deterministic integration layer**.

---

## How this looks to a client (this matters)

When a CTO sees:

* A real n8n canvas
* Clear labels
* Explicit non-responsibilities

They think:

> “Okay — automation is downstream, governed, and safe.”

Not:

> “This guy wired random workflows.”

That difference is **huge**.




## 8. Agent Operating Contract (CLAUDE.md)

Agents must:

* Propose diffs only
* Provide risk classification
* Provide cost estimate
* Provide rollback strategy
* Provide blast-radius analysis

Agents must never:

* Deploy directly
* Merge protected branches
* Bypass policy
* Self-approve actions

All outputs are logged and auditable.

---

## 9. Observability & Governance

Built-in guarantees:

* Execution trace IDs
* Immutable audit logs
* Per-task cost tracking
* Deployment health metrics
* Incident escalation workflow

If the system cannot answer:

> Who approved this?
> Why did it deploy?
> What did it cost?

The system is incomplete.

---

## 10. Repository Structure

```
apps/
  control-plane/
  model-router/

agents/
adapters/
policies/
workflows/
infra/
docs/

CLAUDE.md
README.md
```

Strict separation of concerns.
Clear authority boundaries.
No logic leakage.

---

## 11. Design Principles

* Deterministic execution
* Policy-first architecture
* Backend as source of truth
* Bounded autonomy
* Automatic rollback
* Minimal blast radius

---

## 12. Target Outcome

A production-grade autonomous engineering platform that:

* Ships continuously
* Scales safely
* Contains agent risk
* Survives failure
* Remains auditable

---

## Final Note

This repository represents a **reference architecture and execution model** intended for **technical validation and deal confirmation**.

Production implementation is delivered iteratively based on client scale, compliance requirements, and infrastructure constraints.

---

