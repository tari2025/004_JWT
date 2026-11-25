const db = require("../models");

async function getAllKomik(req, res) {
  try {
    const komiks = await db.Komik.findAll();
    res.status(200).json(komiks);
  } catch (error) {
    console.error("Error fetching komiks:", error.message);
    res.status(500).json({ message: "Failed to fetch komiks" });
  } 
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
      const komik = await db.Komik.findByPk(id);
      if (!komik) {
        return res.status(404).json({ message: "Komik not found" });
      }
      res.status(200).json(komik);
    } catch (error) {
      console.error("Error fetching komik:", error.message);
      res.status(500).json({ message: "Failed to fetch komik" });
    }
}

async function createKomik(req, res) {
    const { title, description, author } = req.body;
    try {
        const komik = await db.Komik.create({ title, description, author });
        res.status(201).json(komik);
    } catch (error) {
        console.error("Error creating komik:", error.message);
        res.status(500).json({ message: "Failed to create komik" });
    }
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: "Komik not found" });
        }   
        komik.title = title;
        komik.description = description;
        komik.author = author;
        await komik.save();
        res.status(200).json(komik);
    } catch (error) {
        console.error("Error updating komik:", error.message);
        res.status(500).json({ message: "Failed to update komik" });
    }   
}

async function deleteKomik(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: "Komik not found" });
        }
        await komik.destroy();
        res.status(200).json({ message: "Komik deleted successfully" });
    } catch (error) {
        console.error("Error deleting komik:", error.message);
        res.status(500).json({ message: "Failed to delete komik" });
    }
}