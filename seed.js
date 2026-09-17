const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const vm = require('vm');

console.log('Reading js/data.js...');
const dataJsCode = fs.readFileSync('./js/data.js', 'utf-8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(dataJsCode, sandbox);

const WARDS = sandbox.window.DATA.WARDS;
const WORKS = sandbox.window.DATA.WORKS;
console.log(`Found ${WARDS.length} wards and ${WORKS.length} works to seed.`);

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  // Create tables
  db.run(`CREATE TABLE IF NOT EXISTS wards (
    id INTEGER PRIMARY KEY,
    nameEn TEXT,
    name TEXT,
    zone TEXT,
    councillor TEXT,
    party TEXT,
    phone TEXT
  )`);

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

  console.log('Seeding Wards...');
  const stmtWards = db.prepare('INSERT OR REPLACE INTO wards (id, nameEn, name, zone, councillor, party, phone) VALUES (?, ?, ?, ?, ?, ?, ?)');
  for (const w of WARDS) {
    stmtWards.run(w.id, w.nameEn, w.name, w.zone, w.councillor, w.party, w.phone);
  }
  stmtWards.finalize();

  console.log('Seeding Works...');
  const stmtWorks = db.prepare('INSERT OR REPLACE INTO works (id, wardId, title, scheme, type, contractor, je, amount, status, progress, remarks, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  for (const w of WORKS) {
    stmtWorks.run(w.id, w.wardId, w.title, w.scheme, w.type, w.contractor, w.je, w.amount, w.status, w.progress, w.remarks, w.lat, w.lng);
  }
  stmtWorks.finalize();
  
  console.log('Database seeded successfully!');
});

db.close();
