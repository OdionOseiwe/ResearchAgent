
import dotenv from "dotenv";
import express from "express";
import { runWebResearch } from "./src/agents.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "20kb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Submit a research question
app.post("/api/research", async (req, res) => {
  const { question } = req.body;

  if (typeof question !== "string" || !question.trim()) {
    return res.status(400).json({
      error: "Please provide a research question.",
    });
  }

  if (question.trim().length > 2000) {
    return res.status(400).json({
      error: "Research questions must be 2000 characters or fewer.",
    });
  }

  try {
    const result = await runWebResearch(question.trim());

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Research API error:", error);

    return res.status(500).json({
      success: false,
      error: "Research failed. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Research API running at http://localhost:${PORT}`);
});
