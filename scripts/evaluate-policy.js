import policy from "../policies/prod.policy.js";
import fs from "fs";

const proposal = JSON.parse(fs.readFileSync("proposal.json"));

if (proposal.risk === "high") {
  console.error("❌ Risk too high");
  process.exit(1);
}

if (proposal.costUsd > policy.cost.maxUsd) {
  console.error("❌ Cost limit exceeded");
  process.exit(1);
}

console.log("✅ Policy approved");
