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