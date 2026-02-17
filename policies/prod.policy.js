export default {
  risk: {
    maxLevel: "medium"
  },
  cost: {
    maxUsd: 25,
    hardFail: true
  },
  deployment: {
    strategy: "canary",
    canaryPercent: 10
  },
  rollback: {
    errorRate: 2.0,
    latencyMs: 250
  }
};
