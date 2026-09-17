/* ===== NNMV Mock Data ===== */

// ── Wards ──
const WARDS = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: `वार्ड ${i + 1}`,
  nameEn: `Ward ${i + 1}`,
  zone: `Zone ${Math.ceil((i + 1) / 10)}`,
  councillor: `Councillor ${i + 1}`
}));

// ── Zones ──
const ZONES = [
  { id: 1, name: 'Zone 1' },
  { id: 2, name: 'Zone 2' },
  { id: 3, name: 'Zone 3' },
  { id: 4, name: 'Zone 4' },
  { id: 5, name: 'Zone 5' },
  { id: 6, name: 'Zone 6' }
];

// ── Schemes / Financial Sources ──
const SCHEMES = [
  { id: 1, name: '15th Finance Commission', short: '15th FC', category: 'Central Finance', color: 'var(--primary-500)' },
  { id: 2, name: 'State Finance Commission (SFC)', short: 'SFC', category: 'State Finance', color: 'var(--success)' },
  { id: 3, name: 'Nagar Nigam Nidhi', short: 'NN Fund', category: 'Nagar Nigam Fund', color: 'var(--warning)' },
  { id: 4, name: 'AMRUT', short: 'AMRUT', category: 'Central Schemes', color: 'var(--status-verification)' },
  { id: 5, name: 'Swachh Bharat Mission', short: 'SBM', category: 'Central Schemes', color: 'var(--info)' },
  { id: 6, name: 'CM-GRIDS', short: 'CM-GRIDS', category: 'Special Projects', color: 'var(--danger)' }
];

// ── Departments ──
const DEPARTMENTS = [
  { id: 1, name: 'Construction / Engineering', short: 'Construction', icon: '🏗️' },
  { id: 2, name: 'Water Supply', short: 'Water', icon: '💧' },
  { id: 3, name: 'Sewerage', short: 'Sewerage', icon: '🚰' },
  { id: 4, name: 'Drainage', short: 'Drainage', icon: '🌊' }
];

// ── Work Types ──
const WORK_TYPES = [
  'Road Construction', 'Road Repair', 'Drain Construction', 'Sewer Line',
  'Water Pipeline', 'Park Development', 'Community Hall', 'Street Lighting',
  'Boundary Wall', 'CC Road', 'Interlocking', 'Nali Nirman'
];

// ── JEs ──
const JES = [
  { id: 'JE001', name: 'Rajesh Kumar', phone: '9876543210', department: 'Construction' },
  { id: 'JE002', name: 'Suresh Sharma', phone: '9876543211', department: 'Construction' },
  { id: 'JE003', name: 'Amit Verma', phone: '9876543212', department: 'Water' },
  { id: 'JE004', name: 'Pradeep Singh', phone: '9876543213', department: 'Sewerage' },
  { id: 'JE005', name: 'Vinod Gupta', phone: '9876543214', department: 'Drainage' },
  { id: 'JE006', name: 'Manoj Yadav', phone: '9876543215', department: 'Construction' },
  { id: 'JE007', name: 'Deepak Tiwari', phone: '9876543216', department: 'Water' },
  { id: 'JE008', name: 'Rakesh Mishra', phone: '9876543217', department: 'Construction' },
  { id: 'JE009', name: 'Ankit Saxena', phone: '9876543218', department: 'Sewerage' },
  { id: 'JE010', name: 'Sanjay Pandey', phone: '9876543219', department: 'Drainage' }
];

// ── Contractors ──
const CONTRACTORS = [
  { id: 'CON001', name: 'M/s Sharma Construction', contact: '9800000001' },
  { id: 'CON002', name: 'M/s Gupta Builders', contact: '9800000002' },
  { id: 'CON003', name: 'M/s Verma Infrastructure', contact: '9800000003' },
  { id: 'CON004', name: 'M/s Singh & Sons', contact: '9800000004' },
  { id: 'CON005', name: 'M/s Agarwal Enterprises', contact: '9800000005' },
  { id: 'CON006', name: 'M/s National Builders', contact: '9800000006' },
  { id: 'CON007', name: 'M/s Yadav Construction Co.', contact: '9800000007' },
  { id: 'CON008', name: 'M/s Mathura Infra Pvt Ltd', contact: '9800000008' }
];

// ── Milestones Template (Road Work) ──
const MILESTONE_TEMPLATES = {
  road: [
    { name: 'Base Preparation', nameHi: 'आधार तैयारी', sequence: 1, weight: 15 },
    { name: 'Gitti / Sand Work', nameHi: 'गिट्टी / रेत कार्य', sequence: 2, weight: 20 },
    { name: 'Interlocking / Surface Work', nameHi: 'इंटरलॉकिंग', sequence: 3, weight: 30 },
    { name: 'Finishing', nameHi: 'फिनिशिंग', sequence: 4, weight: 20 },
    { name: 'Work Completed', nameHi: 'कार्य पूर्ण', sequence: 5, weight: 15 }
  ],
  drain: [
    { name: 'Excavation', nameHi: 'खुदाई', sequence: 1, weight: 20 },
    { name: 'Foundation', nameHi: 'नींव', sequence: 2, weight: 25 },
    { name: 'Wall Construction', nameHi: 'दीवार निर्माण', sequence: 3, weight: 30 },
    { name: 'Cover / Slab', nameHi: 'ढक्कन / स्लैब', sequence: 4, weight: 15 },
    { name: 'Finishing', nameHi: 'फिनिशिंग', sequence: 5, weight: 10 }
  ],
  pipeline: [
    { name: 'Survey & Marking', nameHi: 'सर्वे एवं मार्किंग', sequence: 1, weight: 10 },
    { name: 'Excavation', nameHi: 'खुदाई', sequence: 2, weight: 20 },
    { name: 'Pipe Laying', nameHi: 'पाइप बिछाई', sequence: 3, weight: 35 },
    { name: 'Testing', nameHi: 'परीक्षण', sequence: 4, weight: 20 },
    { name: 'Backfilling & Restoration', nameHi: 'भराई एवं पुनर्स्थापना', sequence: 5, weight: 15 }
  ]
};

// ── Status definitions ──
const STATUSES = [
  { id: 'not_started', label: 'Not Started', labelHi: 'प्रारंभ नहीं', color: 'var(--status-not-started)', bg: 'var(--bg-body)' },
  { id: 'in_progress', label: 'In Progress', labelHi: 'प्रगति पर', color: 'var(--info)', bg: 'var(--info-light)' },
  { id: 'on_hold', label: 'On Hold', labelHi: 'रुका हुआ', color: 'var(--warning)', bg: 'var(--warning-light)' },
  { id: 'delayed', label: 'Delayed', labelHi: 'विलंबित', color: 'var(--danger)', bg: 'var(--danger-light)' },
  { id: 'completed', label: 'Completed', labelHi: 'पूर्ण', color: 'var(--success)', bg: 'var(--success-light)' },
  { id: 'cancelled', label: 'Cancelled', labelHi: 'निरस्त', color: 'var(--status-cancelled)', bg: 'var(--bg-body)' },
  { id: 'under_verification', label: 'Under Verification', labelHi: 'सत्यापन हेतु', color: 'var(--status-verification)', bg: 'var(--primary-50)' }
];

// ── Helper functions ──
function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function formatDate(d) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}-${mm}-${d.getFullYear()}`;
}
function addDays(d, days) { const r = new Date(d); r.setDate(r.getDate() + days); return r; }

// ── Generate 50 Development Works ──
const WORK_NAMES = [
  'CC Road from Chowk to Mandir', 'Interlocking at Main Bazar', 'Nali Nirman near Temple Road',
  'Water Pipeline Extension', 'Sewer Line Repair', 'Park Development near School',
  'Street Light Installation', 'Boundary Wall Construction', 'Drain Widening Work',
  'Road Repair near Hospital', 'CC Road Gali No. 3', 'Interlocking Gali No. 7',
  'Nali Nirman Mohalla', 'Water Tank Construction', 'Sewerage Manhole Repair',
  'Community Hall Renovation', 'Road Resurfacing Main Road', 'New Drain Construction',
  'Pipeline Replacement', 'Road Construction Phase-II', 'Gali Khadanja Work',
  'Drain Cover Installation', 'Water Supply Augmentation', 'Road & Drain Combo Work',
  'Interlocking at Market Area', 'CC Road near Bus Stand', 'Nali Nirman Ward Road',
  'Street Light LED Upgrade', 'Boundary Wall Repair', 'Water Boring Work',
  'Sewer Treatment Plant Repair', 'Park Beautification', 'Road Patch Work',
  'Footpath Construction', 'Culvert Construction', 'Bridge Repair Work',
  'Overhead Tank Painting', 'Public Toilet Construction', 'Cremation Ground Wall',
  'Drainage Desilting', 'Water Meter Installation', 'Road Divider Construction',
  'Community Center Building', 'Sports Ground Development', 'Garbage Collection Point',
  'RCC Drain Construction', 'Submersible Pump Installation', 'Hand Pump Repair',
  'School Boundary Wall', 'Temple Road Widening'
];

function getMilestoneType(workType) {
  if (workType.includes('Road') || workType.includes('Interlocking') || workType.includes('CC') || workType.includes('Khadanja')) return 'road';
  if (workType.includes('Drain') || workType.includes('Nali') || workType.includes('Wall') || workType.includes('Culvert')) return 'drain';
  return 'pipeline';
}

function generateWorkMilestones(workId, workType, progress, status) {
  const type = getMilestoneType(workType);
  const template = MILESTONE_TEMPLATES[type] || MILESTONE_TEMPLATES.road;
  let remainingProg = progress;

  return template.map((t, idx) => {
    let msProgress = 0;
    let msStatus = 'not_started';
    if (status === 'completed' || status === 'under_verification') {
      msProgress = 100;
      msStatus = 'completed';
    } else if (remainingProg > 0) {
      const maxForThis = t.weight;
      const portion = Math.min(remainingProg, maxForThis);
      msProgress = Math.round((portion / maxForThis) * 100);
      remainingProg -= portion;
      msStatus = msProgress >= 100 ? 'completed' : msProgress > 0 ? 'in_progress' : 'not_started';
    }
    return {
      id: `${workId}-MS${idx + 1}`,
      workId,
      name: t.name,
      nameHi: t.nameHi,
      sequence: t.sequence,
      weight: t.weight,
      progress: msProgress,
      status: msStatus,
      targetDate: '',
      actualDate: msStatus === 'completed' ? formatDate(addDays(new Date(2026, 5, 1), idx * 20 + randomInt(0, 15))) : ''
    };
  });
}

function generateProgressUpdates(workId, currentProgress) {
  const updates = [];
  const numUpdates = randomInt(2, 5);
  let prevProg = 0;

  for (let i = 0; i < numUpdates; i++) {
    const thisProg = i === numUpdates - 1 ? currentProgress : Math.round(prevProg + ((currentProgress - prevProg) / (numUpdates - i)) * (0.8 + Math.random() * 0.4));
    const clampedProg = Math.min(thisProg, currentProgress);
    const updateDate = addDays(new Date(2026, 3, 1), i * randomInt(12, 25));

    updates.push({
      id: `${workId}-PU${i + 1}`,
      workId,
      date: formatDate(updateDate),
      progress: clampedProg,
      status: clampedProg >= 100 ? 'completed' : clampedProg > 0 ? 'in_progress' : 'not_started',
      milestone: `Stage ${Math.min(i + 1, 5)}`,
      remarks: randomItem([
        'Work progressing as per schedule',
        'Material delivered on site',
        'Labour shortage, slight delay expected',
        'Weather affected work for 2 days',
        'Good progress, on track for completion',
        'Inspection completed, quality satisfactory',
        'Work resumed after hold period',
        'Additional material requirement raised'
      ]),
      updatedBy: randomItem(JES).id
    });
    prevProg = clampedProg;
  }
  return updates;
}

function generatePhotos(workId, status, progress) {
  const photos = [];
  // Before photos always
  photos.push({
    id: `${workId}-PH1`, workId, category: 'Before',
    date: '15-03-2026', uploadedBy: randomItem(JES).id,
    remarks: 'Site condition before work', hasGPS: Math.random() > 0.5,
    placeholder: '📷 Before Photo'
  });
  if (progress > 20) {
    photos.push({
      id: `${workId}-PH2`, workId, category: 'Progress',
      date: '20-05-2026', uploadedBy: randomItem(JES).id,
      remarks: 'Work in progress', hasGPS: Math.random() > 0.5,
      placeholder: '📷 Progress Photo'
    });
  }
  if (progress > 60) {
    photos.push({
      id: `${workId}-PH3`, workId, category: 'Progress',
      date: '15-07-2026', uploadedBy: randomItem(JES).id,
      remarks: 'Advanced stage progress', hasGPS: Math.random() > 0.5,
      placeholder: '📷 Progress Photo 2'
    });
  }
  if (status === 'completed' || status === 'under_verification') {
    photos.push({
      id: `${workId}-PH4`, workId, category: 'Completion',
      date: '10-08-2026', uploadedBy: randomItem(JES).id,
      remarks: 'Work completed', hasGPS: Math.random() > 0.5,
      placeholder: '📷 Completion Photo'
    });
  }
  return photos;
}

// Generate works
const WORKS = [];
const statusWeights = ['in_progress', 'in_progress', 'in_progress', 'completed', 'completed', 'delayed', 'delayed', 'not_started', 'on_hold', 'under_verification'];

for (let i = 0; i < 50; i++) {
  const ward = WARDS[i % 60];
  const scheme = SCHEMES[i % 6];
  const dept = DEPARTMENTS[i % 4];
  const je = JES[i % 10];
  const contractor = CONTRACTORS[i % 8];
  const workType = randomItem(WORK_TYPES);
  const workName = WORK_NAMES[i];
  const status = statusWeights[i % statusWeights.length];

  let progress = 0;
  switch (status) {
    case 'not_started': progress = 0; break;
    case 'in_progress': progress = randomInt(15, 85); break;
    case 'completed': progress = 100; break;
    case 'under_verification': progress = 100; break;
    case 'delayed': progress = randomInt(10, 60); break;
    case 'on_hold': progress = randomInt(5, 40); break;
  }

  const sanctionedAmount = randomInt(5, 80) * 100000; // 5L to 80L
  const startDate = addDays(new Date(2026, 0, 1), randomInt(0, 120));
  const completionDate = addDays(startDate, randomInt(60, 240));
  const workId = `NNMV-2026-${String(i + 1).padStart(5, '0')}`;

  WORKS.push({
    id: workId,
    name: workName,
    description: `${workType} - ${workName} in ${ward.nameEn}`,
    ward: ward,
    zone: ward.zone,
    area: `${ward.nameEn} Area`,
    workType: workType,
    scheme: scheme,
    financialSource: scheme.category,
    department: dept,
    approvalNo: `APR/${2026}/${String(i + 1).padStart(4, '0')}`,
    approvalDate: formatDate(addDays(new Date(2025, 10, 1), randomInt(0, 90))),
    technicalSanctionNo: `TS/${2026}/${String(i + 1).padStart(4, '0')}`,
    workOrderNo: `WO/${2026}/${String(i + 1).padStart(4, '0')}`,
    workOrderDate: formatDate(addDays(new Date(2025, 11, 1), randomInt(0, 60))),
    assignedJE: je,
    contractor: contractor,
    estimatedCost: sanctionedAmount + randomInt(-200000, 200000),
    sanctionedAmount: sanctionedAmount,
    workOrderAmount: sanctionedAmount - randomInt(0, 200000),
    expenditure: Math.round(sanctionedAmount * (progress / 100) * (0.8 + Math.random() * 0.3)),
    startDate: formatDate(startDate),
    originalCompletionDate: formatDate(completionDate),
    revisedCompletionDate: status === 'delayed' ? formatDate(addDays(completionDate, randomInt(30, 90))) : '',
    actualCompletionDate: status === 'completed' ? formatDate(addDays(completionDate, randomInt(-15, 10))) : '',
    status: status,
    progress: progress,
    latitude: 27.4924 + (Math.random() * 0.05 - 0.025),
    longitude: 77.6737 + (Math.random() * 0.05 - 0.025),
    delayReason: status === 'delayed' ? randomItem([
      'Material shortage', 'Labour unavailability', 'Heavy rainfall',
      'Contractor delay', 'Land dispute', 'Approval pending',
      'Design change required', 'Budget revision pending'
    ]) : ''
  });
}

// Generate milestones, progress updates, and photos for each work
const ALL_MILESTONES = {};
const ALL_PROGRESS_UPDATES = {};
const ALL_PHOTOS = {};

WORKS.forEach(w => {
  ALL_MILESTONES[w.id] = generateWorkMilestones(w.id, w.workType, w.progress, w.status);
  ALL_PROGRESS_UPDATES[w.id] = generateProgressUpdates(w.id, w.progress);
  ALL_PHOTOS[w.id] = generatePhotos(w.id, w.status, w.progress);
});

// ── Audit Log ──
const AUDIT_LOG = [];
const auditActions = ['Progress Updated', 'Status Changed', 'Photo Uploaded', 'Work Created', 'Milestone Updated', 'User Login', 'JE Assigned', 'Work Modified'];

for (let i = 0; i < 30; i++) {
  const work = randomItem(WORKS);
  const action = randomItem(auditActions);
  AUDIT_LOG.push({
    id: `AUD-${String(i + 1).padStart(4, '0')}`,
    user: randomItem(JES).name,
    userId: randomItem(JES).id,
    action: action,
    workId: work.id,
    workName: work.name,
    oldValue: action === 'Progress Updated' ? `${randomInt(10, 50)}%` : action === 'Status Changed' ? 'In Progress' : '-',
    newValue: action === 'Progress Updated' ? `${randomInt(55, 95)}%` : action === 'Status Changed' ? 'Completed' : '-',
    timestamp: `${randomInt(1, 28)}-${String(randomInt(6, 9)).padStart(2, '0')}-2026 ${randomInt(8, 18)}:${String(randomInt(0, 59)).padStart(2, '0')}`,
    source: randomItem(['Web', 'Mobile', 'API'])
  });
}
AUDIT_LOG.sort((a, b) => b.id.localeCompare(a.id));

// ── Notifications ──
const NOTIFICATIONS = [
  { id: 1, type: 'warn', icon: '⚠️', message: 'NNMV-2026-00006 completion deadline approaching (5 days)', time: '10 min ago', read: false },
  { id: 2, type: 'error', icon: '🔴', message: 'NNMV-2026-00003 marked as Delayed', time: '25 min ago', read: false },
  { id: 3, type: 'info', icon: '📋', message: 'JE Rajesh Kumar has pending progress update', time: '1 hour ago', read: false },
  { id: 4, type: 'success', icon: '✅', message: 'NNMV-2026-00004 marked Completed', time: '2 hours ago', read: false },
  { id: 5, type: 'info', icon: '🔔', message: 'NNMV-2026-00010 completion verification pending', time: '3 hours ago', read: true },
  { id: 6, type: 'info', icon: '📌', message: 'New work NNMV-2026-00048 assigned to JE Manoj Yadav', time: '5 hours ago', read: true },
  { id: 7, type: 'warn', icon: '⚠️', message: '3 works deadline within next 7 days', time: '6 hours ago', read: true },
  { id: 8, type: 'error', icon: '🔴', message: 'NNMV-2026-00016 no update for 15 days', time: '1 day ago', read: true },
  { id: 9, type: 'success', icon: '✅', message: 'Monthly progress report generated', time: '1 day ago', read: true },
  { id: 10, type: 'info', icon: '👤', message: 'New user Councillor Ward 15 added', time: '2 days ago', read: true },
  { id: 11, type: 'warn', icon: '⚠️', message: 'NNMV-2026-00022 on hold for 20 days', time: '2 days ago', read: true },
  { id: 12, type: 'success', icon: '✅', message: 'NNMV-2026-00014 verification approved', time: '3 days ago', read: true }
];

// ── Users (mock) ──
const USERS = [
  { id: 'admin', name: 'Admin User', role: 'admin', roleName: 'Super Admin', ward: null },
  { id: 'officer1', name: 'Nagar Ayukt', role: 'officer', roleName: 'Municipal Officer', ward: null },
  { id: 'je001', name: 'Rajesh Kumar', role: 'je', roleName: 'Junior Engineer', ward: null, jeId: 'JE001' },
  { id: 'coun15', name: 'Councillor W15', role: 'councillor', roleName: 'Councillor', ward: 15 }
];

// ── Computed Stats ──
function computeStats(worksList) {
  const total = worksList.length;
  const totalAmount = worksList.reduce((s, w) => s + w.sanctionedAmount, 0);
  const byStatus = {};
  STATUSES.forEach(s => { byStatus[s.id] = worksList.filter(w => w.status === s.id).length; });
  const avgProgress = total > 0 ? Math.round(worksList.reduce((s, w) => s + w.progress, 0) / total) : 0;

  return { total, totalAmount, byStatus, avgProgress };
}

function computeWardStats() {
  const wardMap = {};
  WARDS.forEach(w => {
    const wardWorks = WORKS.filter(wk => wk.ward.id === w.id);
    wardMap[w.id] = {
      ward: w,
      ...computeStats(wardWorks)
    };
  });
  return wardMap;
}

function computeSchemeStats() {
  return SCHEMES.map(s => {
    const schemeWorks = WORKS.filter(w => w.scheme.id === s.id);
    return { scheme: s, ...computeStats(schemeWorks) };
  });
}

function computeDeptStats() {
  return DEPARTMENTS.map(d => {
    const deptWorks = WORKS.filter(w => w.department.id === d.id);
    return { department: d, ...computeStats(deptWorks) };
  });
}

function computeJEStats() {
  return JES.map(j => {
    const jeWorks = WORKS.filter(w => w.assignedJE.id === j.id);
    return { je: j, ...computeStats(jeWorks) };
  });
}

// Export
window.DATA = {
  WARDS, ZONES, SCHEMES, DEPARTMENTS, WORK_TYPES, JES, CONTRACTORS,
  MILESTONE_TEMPLATES, STATUSES, WORKS, ALL_MILESTONES, ALL_PROGRESS_UPDATES,
  ALL_PHOTOS, AUDIT_LOG, NOTIFICATIONS, USERS,
  computeStats, computeWardStats, computeSchemeStats, computeDeptStats, computeJEStats,
  formatDate, addDays, randomItem, randomInt
};
