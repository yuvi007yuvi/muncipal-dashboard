const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve the frontend statically
app.use(express.static(path.join(__dirname)));

// Initialize SQLite Database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Create Wards Table
    db.run(`CREATE TABLE IF NOT EXISTS wards (
      id INTEGER PRIMARY KEY,
      nameEn TEXT,
      name TEXT,
      zone TEXT,
      councillor TEXT,
      party TEXT,
      phone TEXT
    )`);

    // Create Works Table
    db.run(`CREATE TABLE IF NOT EXISTS works (
      id TEXT PRIMARY KEY,
      wardId INTEGER,
      title TEXT,
      scheme TEXT,
      type TEXT,
      contractor TEXT,
      je TEXT,
      amount INTEGER,
      status TEXT,
      progress INTEGER,
      remarks TEXT,
      lat REAL,
      lng REAL
    )`);
  }
});

// --- API Endpoints ---

// Get all Wards
app.get('/api/wards', (req, res) => {
  db.all("SELECT * FROM wards ORDER BY id ASC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update a Ward
app.put('/api/wards/:id', (req, res) => {
  const id = req.params.id;
  const { councillor, party, phone } = req.body;
  db.run(
    `UPDATE wards SET councillor = ?, party = ?, phone = ? WHERE id = ?`,
    [councillor, party, phone, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

// Get all Works
app.get('/api/works', (req, res) => {
  db.all("SELECT * FROM works", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update Work Progress
app.post('/api/works/:id/progress', (req, res) => {
  const id = req.params.id;
  const { progress, status, remarks } = req.body;
  
  db.run(
    `UPDATE works SET progress = ?, status = ?, remarks = ? WHERE id = ?`,
    [progress, status, remarks, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, changes: this.changes });
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
