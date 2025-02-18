require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Atlas conectado a databasePrueba"))
  .catch((err) => console.error("Error al conectar MongoDB", err));

const pruebaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true}
}, { collection: "pruebaCollection" });

const Prueba = mongoose.model("Prueba", pruebaSchema);

app.get("/api/prueba", async (req, res) => {
  try {
    const data = await Prueba.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/prueba", async (req, res) => {
  const { name, lastname} = req.body;
  const newData = new Prueba({ name, lastname });

  try {
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});