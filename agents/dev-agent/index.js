export function proposeFeature(task) {
  return {
    summary: "Add example feature",
    risk: "medium",
    costUsd: 10,
    rollback: "Revert commit",
    diff: "git diff --example"
  };
}
