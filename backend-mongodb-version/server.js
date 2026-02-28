const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv');

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 8080
const mongoURI = process.env.MONGO_URI;

const schemaData = mongoose.Schema({
  name: String,
  address: String,
  telephone: String,
}, {
  timestamps: true
});

const userModel = mongoose.model(" restaurant", schemaData);

app.post("/create",
  [
    body('name').notEmpty().withMessage("Name is required"),
    body('address').notEmpty().withMessage("Address is required"),
    body('telephone').isNumeric().withMessage("Telephone Number must be numeric")
  ],
  async (req, res,) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ success: false, errors: errors.array() });
    }
    try {
      console.log(req.body);
      const data = new userModel(req.body);
      await data.save();
      res.send({ success: true, message: "Data saved successfully", data: data });
    } catch (error) {
      next(error);
    }
  });

app.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const data = await userModel.findById(id);
    if (!data) {
      return res.send.json({ success: false, message: "Restaurant not found" });
    }
    res.json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
});

app.put("/update", async (req, res, next) => {
  console.log(req.body);
  try {
    const { _id, ...rest } = req.body
    const data = await userModel.updateOne({ _id: _id }, rest);
    res.send({ success: true, message: "Data updated successfully", data: data });
  } catch (error) {
    next(error);
  }
});

app.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    console.log(id);
    const data = await userModel.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Data deleted successfully", data: data });
  } catch (error) {
    next(error);
  }
})

app.get("/", async (req, res, next) => {
  try {
    const data = await userModel.find({});
    res.json({ success: true, data: data });
  } catch (error) {
    next(error);
  }
})

mongoose.connect(mongoURI)
  .then(() => {
    console.log("connect to database");
    app.listen(PORT, () => console.log("server is running"));
  })
  .catch((err) => console.log(err));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
});
