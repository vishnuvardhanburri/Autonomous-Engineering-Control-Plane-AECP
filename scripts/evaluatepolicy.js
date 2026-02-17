import policy from "../policies/prod.policy.js";
import fs from "fs";

const data = JSON.parse(fs.readFileSync("proposal.json", "utf-8"));

function checkRisk(risk) {
  const levels = ["low", "medium", "high"];
  return levels.indexOf(risk) <= levels.indexOf(policy.risk.maxLevel);
}

function checkCost(costUsd) {
  return costUsd <= policy.cost.maxUsd;
}

if (!checkRisk(data.risk)) {
  console.error("❌ Policy fail: risk too high");
  process.exit(1);
}

if (!checkCost(data.costUsd)) {
  console.error("❌ Policy fail: cost too high");
  process.exit(1);
}

console.log("✅ Policy approved");


npm i ts-node typescript
