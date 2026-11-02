import {runWebResearch} from "./src/agents.js"
import dotenv from "dotenv";
dotenv.config();

const question = process.argv.slice(2).join(" ").trim();

if (!question) {
  console.error('Usage: npm run research -- "Your research question"');
  process.exitCode = 1;
} else {
  try {
    console.log("calling agents");
    
    const result = await runWebResearch(question);

    console.log("\n\n# FINAL RESEARCH REPORT\n");
    console.log(result);

  } catch (error) {
    console.error("\nResearch run failed closed. No unvalidated report was returned.");
    console.error(error instanceof Error ? error.message : error);
    console.log(error);
    process.exitCode = 1;
  }
}
