const express = require("express");
const db = require("../database/connectPostgresDb");
const CodingQuestion = require("../model/Code");
const router = express.Router();
const { PythonShell } = require("python-shell");
const fs = require("fs");

const pre = "import sys;\n\n";

router.post("/allcodes", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const codingQuestions = await CodingQuestion.find();

    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await db.query(userQuery, [userEmail]);

    if (userResult.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = userResult.rows[0];

    const solvedQuery = "SELECT * FROM solved_questions WHERE user_id = $1";
    const solvedResults = await db.query(solvedQuery, [user.user_id]);

    const questionsWithStars = codingQuestions.map((question) => {
      const solvedQuestion = solvedResults.rows.find(
        (sq) => sq.question_id === question.id.toString()
      );

      const stars = solvedQuestion ? solvedQuestion.stars_earned : -1;

      return {
        question: question.question,
        description: question.description,
        stars: stars,
        ...question.toObject(),
      };
    });

    return res.status(200).json(questionsWithStars);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});
router.post("/questions", async (req, res) => {
  console.log(req.body);
  try {
    const newQuestion = new CodingQuestion(req.body);
    await newQuestion.save();
    res.status(201).send(newQuestion);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.post("/saveuser", async (req, res) => {
  try {
    const { email, username } = req.body;

    const existingUserQuery = "SELECT * FROM users WHERE email = $1";
    const existingUserResult = await db.query(existingUserQuery, [email]);

    if (existingUserResult.rows.length > 0) {
      return res.status(200).send("User already saved");
    }

    const insertUserQuery =
      "INSERT INTO users (username, email) VALUES ($1, $2)";
    await db.query(insertUserQuery, [username, email]);

    return res.status(201).send("User saved");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

router.get("/code/:id", async (req, res) => {
  try {
    const codeId = req.params?.id;
    const codeItem = await CodingQuestion.findById(codeId);

    if (!codeItem) {
      return res.status(404).json({ message: "Code item not found" });
    }
    return res.status(200).json(codeItem);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});
const getParticularCode = async (codeID) => {
  const codeItem = await CodingQuestion.findById(codeID);
  return codeItem;
};

router.post("/execute", async (req, res) => {
  const { code, codeId, email } = req.body;
  const codeDetails = await getParticularCode(codeId);

  try {
    fs.writeFileSync("test.py", pre + code + codeDetails.post);

    const results = [];
    for (const testcase of codeDetails.testcases) {
      const inputArray = testcase.inputs;
      let output = testcase.expectedOutput;

      const options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [...inputArray, output],
      };

      const pythonResults = await PythonShell.run("test.py", options);
      console.log(pythonResults);
      results.push(pythonResults == output);
    }

    const trueCount = results.filter((result) => result).length;
    const starsEarned = Math.round((trueCount / results.length) * 5);

    const userQuery = "SELECT * FROM users WHERE email = $1";
    const userResult = await db.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const userId = userResult.rows[0].user_id;

    const solvedQuery =
      "SELECT * FROM solved_questions WHERE user_id = $1 AND question_id = $2";
    const solvedResult = await db.query(solvedQuery, [userId, codeId]);

    if (solvedResult.rows.length > 0) {
      const updateSolved =
        "UPDATE solved_questions SET stars_earned = $1 WHERE user_id = $2 AND question_id = $3";
      await db.query(updateSolved, [starsEarned, userId, codeId]);
    } else {
      const insertSolved =
        "INSERT INTO solved_questions (user_id, question_id, stars_earned, solved_at) VALUES ($1, $2, $3, NOW())";
      await db.query(insertSolved, [userId, codeId, starsEarned]);
    }

    const today = new Date().toISOString().split("T")[0];
    const contributionQuery =
      "SELECT * FROM contributions WHERE user_id = $1 AND contribution_date = $2";
    const contributionResult = await db.query(contributionQuery, [
      userId,
      today,
    ]);

    if (contributionResult.rows.length > 0) {
      const updateContribution =
        "UPDATE contributions SET count = count + 1 WHERE user_id = $1 AND contribution_date = $2";
      await db.query(updateContribution, [userId, today]);
    } else {
      const insertContribution =
        "INSERT INTO contributions (user_id, contribution_date, count) VALUES ($1, $2, 1)";
      await db.query(insertContribution, [userId, today]);
    }

    return res.status(200).json({ testResults: results, starsEarned });
  } catch (error) {
    console.error("Error executing Python script:", error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/managecreds", async (req, res) => {
  const { email } = req.body;

  try {
    const userQuery = "SELECT user_id, credits FROM users WHERE email = $1";
    const userResult = await db.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = userResult.rows[0];

    if (user.credits > 0) {
      const newCredits = user.credits - 5;
      const updateCreditsQuery =
        "UPDATE users SET credits = $1 WHERE user_id = $2";
      await db.query(updateCreditsQuery, [newCredits, user.user_id]);

      return res.status(200).json({ success: true });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Insufficient credits" });
    }
  } catch (error) {
    console.error("Error managing credits:", error);
    return res.status(500).send("Internal Server Error");
  }
});
router.get("/count/challenges", async (req, res) => {
  try {
    const challengeCount = await CodingQuestion.countDocuments();
    res.status(200).json({ count: challengeCount });
  } catch (error) {
    console.error("Error retrieving challenge count:", error);
    res
      .status(500)
      .json({ message: "Error retrieving challenge count", error: error });
  }
});
module.exports = router;
