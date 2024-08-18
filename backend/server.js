const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helpCenterModel = require("./model/helpcentermodel");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongoose connected");
  } catch (e) {
    console.log({ error: e.message });
    process.exit(1);
  }
};
connectDB();
app.listen(process.env.port, () => {
  console.log(`server is running ${process.env.port} Port`);
});

// GET ALL CARDS

app.get("/cards", async (req, res) => {
  try {
    const helpCenter = await helpCenterModel.find();
    res.json(helpCenter);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST CARD

app.post("/cards", async (req, res) => {
  const { title, description } = req.body;
  const newhelp = new helpCenterModel({
    title,
    description,
  });
  try {
    const helpmsg = await newhelp.save();
    return res.status(201).json({ data: helpmsg });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});
