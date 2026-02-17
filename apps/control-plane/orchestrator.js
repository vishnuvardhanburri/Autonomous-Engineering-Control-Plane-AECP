export const STATES = [
  "RECEIVED",
  "CLASSIFIED",
  "PROPOSED",
  "VALIDATED",
  "APPROVED",
  "EXECUTING",
  "COMPLETED",
  "ROLLED_BACK",
  "FAILED"
];

export class Orchestrator {
  constructor() {
    this.state = "RECEIVED";
    this.history = [];
  }

  transition(next) {
    const allowed = {
      RECEIVED: ["CLASSIFIED"],
      CLASSIFIED: ["PROPOSED"],
      PROPOSED: ["VALIDATED"],
      VALIDATED: ["APPROVED", "FAILED"],
      APPROVED: ["EXECUTING"],
      EXECUTING: ["COMPLETED", "ROLLED_BACK", "FAILED"]
    };

    if (!allowed[this.state]?.includes(next)) {
      throw new Error(`Invalid transition: ${this.state} → ${next}`);
    }

    this.history.push({ from: this.state, to: next, at: new Date() });
    this.state = next;
    return this.state;
  }
}
