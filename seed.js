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
    name TEXT,
    wardId INTEGER,
    workType TEXT,
    schemeId INTEGER,
    departmentId INTEGER,
    jeId INTEGER,
    contractorId INTEGER,
    amount INTEGER,
    status TEXT,
    progress INTEGER,
    remarks TEXT,
    startDate TEXT,
    targetDate TEXT,
    lat REAL,
    lng REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    name TEXT,
    role TEXT,
    roleName TEXT,
    wardId INTEGER,
    jeId TEXT
  )`);

  console.log('Seeding Wards...');
  const stmtWards = db.prepare('INSERT OR REPLACE INTO wards (id, nameEn, name, zone, councillor, party, phone) VALUES (?, ?, ?, ?, ?, ?, ?)');
  for (const w of WARDS) {
    stmtWards.run(w.id, w.nameEn, w.name, w.zone, w.councillor, w.party, w.phone);
  }
  stmtWards.finalize();

  console.log('Seeding Works...');
  const stmtWorks = db.prepare('INSERT OR REPLACE INTO works (id, name, wardId, workType, schemeId, departmentId, jeId, contractorId, amount, status, progress, remarks, startDate, targetDate, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  for (const w of WORKS) {
    stmtWorks.run(
      w.id,
      w.name,
      w.ward?.id || null,
      w.workType,
      w.scheme?.id || null,
      w.department?.id || null,
      w.assignedJE?.id || null,
      w.contractor?.id || null,
      w.sanctionedAmount || 0,
      w.status,
      w.progress,
      w.remarks || '',
      w.startDate || '',
      w.targetDate || '',
      w.location?.lat || null,
      w.location?.lng || null
    );
  }
  stmtWorks.finalize();

  console.log('Seeding Users...');
  const stmtUsers = db.prepare('INSERT OR REPLACE INTO users (id, username, password, name, role, roleName, wardId, jeId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  const defaultUsers = [
    { id: 'admin', username: 'admin', password: 'admin123', name: 'Admin User', role: 'admin', roleName: 'Super Admin', ward: null, jeId: null },
    { id: 'officer1', username: 'officer', password: 'officer123', name: 'Nagar Ayukt', role: 'officer', roleName: 'Municipal Officer', ward: null, jeId: null },
    { id: 'je001', username: 'je001', password: 'je123', name: 'Rajesh Kumar', role: 'je', roleName: 'Junior Engineer', ward: null, jeId: 'JE001' },
    { id: 'coun15', username: 'coun15', password: 'coun123', name: 'Councillor W15', role: 'councillor', roleName: 'Councillor', ward: 15, jeId: null }
  ];
  for (const u of defaultUsers) {
    stmtUsers.run(u.id, u.username, u.password, u.name, u.role, u.roleName, u.ward, u.jeId);
  }
  stmtUsers.finalize();
  
  console.log('Database seeded successfully!');
});

db.close();
