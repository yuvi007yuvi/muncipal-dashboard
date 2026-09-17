/* ===== NNMV Mock Data ===== */

// ── Wards ──
const WARDS = [
  { id: 2, name: '02 – Ambedkar Nagar', nameEn: '02 – Ambedkar Nagar', zone: 'Z1 – City', councillor: 'Shri Ravikant', party: 'BJP', phone: '8445536976' },
  { id: 4, name: '04 – Ishapur Yamunapar', nameEn: '04 – Ishapur Yamunapar', zone: 'Z1 – City', councillor: 'Shri Omprakash', party: 'BJP', phone: '8791892031' },
  { id: 5, name: '05 – Bharatpur Gate', nameEn: '05 – Bharatpur Gate', zone: 'Z1 – City', councillor: 'Shri Hanuman Gurjar', party: 'BJP', phone: '8533930006' },
  { id: 7, name: '07 – Lohvan', nameEn: '07 – Lohvan', zone: 'Z1 – City', councillor: 'Shri Hari chand', party: 'BJP', phone: '9410617101' },
  { id: 14, name: '14 – Lakshmi Nagar Yamunapar', nameEn: '14 – Lakshmi Nagar Yamunapar', zone: 'Z1 – City', councillor: 'Shri Jatendra', party: 'BJP', phone: '9759965360' },
  { id: 19, name: '19 – Ramnagar Yamunapar', nameEn: '19 – Ramnagar Yamunapar', zone: 'Z1 – City', councillor: 'Shri Pradeep Singh', party: 'BJP', phone: '9412277448' },
  { id: 22, name: '22 – Badhri Nagar', nameEn: '22 – Badhri Nagar', zone: 'Z1 – City', councillor: 'Smt Najra Begam', party: 'SP', phone: '9837357211' },
  { id: 23, name: '23 – Aheer Pada', nameEn: '23 – Aheer Pada', zone: 'Z1 – City', councillor: 'Shri Subhash Yadav', party: 'BJP', phone: '8273221506' },
  { id: 26, name: '26 – Naya Nagla', nameEn: '26 – Naya Nagla', zone: 'Z1 – City', councillor: 'Shri Punit Baghel', party: 'BJP', phone: '9956009303' },
  { id: 35, name: '35 – Bankhandi', nameEn: '35 – Bankhandi', zone: 'Z1 – City', councillor: 'Shri Tarun Saini', party: 'BJP', phone: '8393903788' },
  { id: 40, name: '40 – Rajkumar', nameEn: '40 – Rajkumar', zone: 'Z1 – City', councillor: 'Shri Sanjay Lodhi', party: 'BJP', phone: '7579521777' },
  { id: 42, name: '42 – Manoharpur', nameEn: '42 – Manoharpur', zone: 'Z1 – City', councillor: 'Mohd. Abrar Khan', party: 'Congress', phone: '7037654156' },
  { id: 49, name: '49 – Daimpiriyal Nagar', nameEn: '49 – Daimpiriyal Nagar', zone: 'Z1 – City', councillor: 'Shri Manoj Sharma', party: 'BJP', phone: '8218583482' },
  { id: 53, name: '53 – Krishna Puri', nameEn: '53 – Krishna Puri', zone: 'Z1 – City', councillor: 'Shri Dhananjay Ch.', party: 'Congress', phone: '7060784729' },
  { id: 61, name: '61 – Chaubia Para', nameEn: '61 – Chaubia Para', zone: 'Z1 – City', councillor: 'Smt. Rachna Pathak', party: 'BJP', phone: '6397984268' },
  { id: 63, name: '63 – Maliyaan Sadar', nameEn: '63 – Maliyaan Sadar', zone: 'Z1 – City', councillor: 'Shri Sanjay', party: 'BJP', phone: '895447004' },
  { id: 64, name: '64 – Ghati Bahalray', nameEn: '64 – Ghati Bahalray', zone: 'Z1 – City', councillor: 'Shri Balkishan', party: 'BJP', phone: '7037165205' },
  { id: 65, name: '65 – Holi Gali', nameEn: '65 – Holi Gali', zone: 'Z1 – City', councillor: 'Shri Santosh Pathak', party: 'Congress', phone: '7500754040' },
  { id: 68, name: '68 – Shanti Nagar', nameEn: '68 – Shanti Nagar', zone: 'Z1 – City', councillor: 'Shri Kuldip Pathak', party: 'BJP', phone: '9759443813' },
  { id: 70, name: '70 – Biharipur', nameEn: '70 – Biharipur', zone: 'Z1 – City', councillor: 'Shri Vaibhav', party: 'BJP', phone: '9568817153' },
  { id: 3, name: '03 – Girdharpur', nameEn: '03 – Girdharpur', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Dinesh Kumar', party: 'BJP', phone: '9719093110' },
  { id: 12, name: '12 – Radhe Shyam Colony', nameEn: '12 – Radhe Shyam Colony', zone: 'Z2 – Bhuteshwar', councillor: 'Mrs. Pooja Ahiriya', party: 'BJP', phone: '9548115161' },
  { id: 16, name: '16 – Bakalpur', nameEn: '16 – Bakalpur', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Gulshan kumar', party: 'BJP', phone: '9058466803' },
  { id: 17, name: '17 – Bairaagpura', nameEn: '17 – Bairaagpura', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Birjesh Khare', party: 'BJP', phone: '9368388838' },
  { id: 20, name: '20 – Krishna Nagar First', nameEn: '20 – Krishna Nagar First', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Devindra', party: 'BJP', phone: '9897829801' },
  { id: 24, name: '24 – Sarai Azamabad', nameEn: '24 – Sarai Azamabad', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Ankur', party: 'Gujjarv', phone: '9720202718' },
  { id: 30, name: '30 – Krishna Nagar Second', nameEn: '30 – Krishna Nagar Second', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Chandan Ahuja', party: 'BJP', phone: '9557816062' },
  { id: 31, name: '31 – Navneet Nagar', nameEn: '31 – Navneet Nagar', zone: 'Z2 – Bhuteshwar', councillor: 'Moh. Munna Malik', party: 'SP', phone: '9720007864' },
  { id: 36, name: '36 – Jaisingh Pura', nameEn: '36 – Jaisingh Pura', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Rakesh Bhatia', party: 'BJP', phone: '8077595901' },
  { id: 37, name: '37 – Baldevpuri', nameEn: '37 – Baldevpuri', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Rajeev Ch.', party: 'BJP', phone: '9412171824' },
  { id: 39, name: '39 – Mahavidhya Colony', nameEn: '39 – Mahavidhya Colony', zone: 'Z2 – Bhuteshwar', councillor: 'Smt Poonam Tiwari', party: 'BJP', phone: '7983565256' },
  { id: 43, name: '43 – Ganeshra', nameEn: '43 – Ganeshra', zone: 'Z2 – Bhuteshwar', councillor: 'Mrs. Leela', party: 'BJP', phone: '8077063470' },
  { id: 44, name: '44 – Radhika Bihar', nameEn: '44 – Radhika Bihar', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Niranjan Ch.', party: 'BJP', phone: '9012336267' },
  { id: 45, name: '45 – Birla Mandir', nameEn: '45 – Birla Mandir', zone: 'Z2 – Bhuteshwar', councillor: 'Mrs. Uma Dixit', party: 'BJP', phone: '8630365802' },
  { id: 46, name: '46 – Radha Nagar', nameEn: '46 – Radha Nagar', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Rajveer Ch', party: 'BJP', phone: '8057226326' },
  { id: 47, name: '47 – Dwarkapuri', nameEn: '47 – Dwarkapuri', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Tilakveer', party: 'Congress', phone: '8394970700' },
  { id: 48, name: '48 – Satoha Asangpur', nameEn: '48 – Satoha Asangpur', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Lakshya Saini', party: 'BJP', phone: '9927418535' },
  { id: 54, name: '54 – Pratap Nagar', nameEn: '54 – Pratap Nagar', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Tejveer', party: 'BJP', phone: '9719410009' },
  { id: 55, name: '55 – Govind Nagar', nameEn: '55 – Govind Nagar', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Vivek Prakash', party: 'BJP', phone: '9917315297' },
  { id: 56, name: '56 – Mandi Randas', nameEn: '56 – Mandi Randas', zone: 'Z2 – Bhuteshwar', councillor: 'Mrs. Neetu Verma', party: 'BJP', phone: '9319741489' },
  { id: 58, name: '58 – Gau Ghat', nameEn: '58 – Gau Ghat', zone: 'Z2 – Bhuteshwar', councillor: 'Mrs. Neelam Goyal', party: 'BJP', phone: '8218005117' },
  { id: 60, name: '60 – Jagannath Puri', nameEn: '60 – Jagannath Puri', zone: 'Z2 – Bhuteshwar', councillor: 'Shri Niraj Vashist', party: 'BJP', phone: '9368833539' },
  { id: 1, name: '01 – Birjapur', nameEn: '01 – Birjapur', zone: 'Z3 – Aurangabad', councillor: 'Smt. Kiran Devi', party: 'BSP', phone: '9027220083' },
  { id: 6, name: '06 – Aduki', nameEn: '06 – Aduki', zone: 'Z3 – Aurangabad', councillor: 'Smt. Rabuda Devi', party: 'RLD', phone: '7457009269' },
  { id: 10, name: '10 – Aurangabad First', nameEn: '10 – Aurangabad First', zone: 'Z3 – Aurangabad', councillor: 'Smt. Babita Saini', party: 'Nirdaliya', phone: '9557313979' },
  { id: 11, name: '11 – Tarsi', nameEn: '11 – Tarsi', zone: 'Z3 – Aurangabad', councillor: 'Smt. Sashi', party: 'Nirdaliye', phone: '7457009267' },
  { id: 15, name: '15 – Maholi First', nameEn: '15 – Maholi First', zone: 'Z3 – Aurangabad', councillor: 'Smt. Jitendra Singh', party: 'BJP', phone: '9607478682' },
  { id: 27, name: '27 – Baad', nameEn: '27 – Baad', zone: 'Z3 – Aurangabad', councillor: 'Shri Rajendra', party: 'BJP', phone: '7252804958' },
  { id: 28, name: '28 – Aurangabad Second', nameEn: '28 – Aurangabad Second', zone: 'Z3 – Aurangabad', councillor: 'Smt. Krishna Devi', party: 'BJP', phone: '886489091' },
  { id: 29, name: '29 – Koyla Alipur', nameEn: '29 – Koyla Alipur', zone: 'Z3 – Aurangabad', councillor: 'Shri. Rakesh Yadav', party: 'BSP', phone: '7453884003' },
  { id: 32, name: '32 – Ranchibagar', nameEn: '32 – Ranchibagar', zone: 'Z3 – Aurangabad', councillor: 'Smt. Hemlata', party: 'RLD', phone: '9760062003' },
  { id: 33, name: '33 – Palikhera', nameEn: '33 – Palikhera', zone: 'Z3 – Aurangabad', councillor: 'Shri Anil Kumar', party: 'BJP', phone: '7906757133' },
  { id: 38, name: '38 – Civil Lines', nameEn: '38 – Civil Lines', zone: 'Z3 – Aurangabad', councillor: 'Shri Suresh', party: 'BSP', phone: '8630503982' },
  { id: 41, name: '41 – Dhaulipiau', nameEn: '41 – Dhaulipiau', zone: 'Z3 – Aurangabad', councillor: 'Shri Sanjay Singh', party: 'BJP', phone: '8077781631' },
  { id: 52, name: '52 – Chandrapuri', nameEn: '52 – Chandrapuri', zone: 'Z3 – Aurangabad', councillor: 'Shri Dharmesh Ch', party: 'BJP', phone: '7078477263' },
  { id: 57, name: '57 – Balajipuram', nameEn: '57 – Balajipuram', zone: 'Z3 – Aurangabad', councillor: 'Shri Dinesh Ch', party: 'BJP', phone: '8868908545' },
  { id: 59, name: '59 – Maholi Second', nameEn: '59 – Maholi Second', zone: 'Z3 – Aurangabad', councillor: 'Smt. Pushpa Devi', party: 'BJP', phone: '9837542151' },
  { id: 8, name: '08 – Atas', nameEn: '08 – Atas', zone: 'Z4 – Vrindavan', councillor: 'Smt. Sonia', party: 'Independent', phone: '7827475801' },
  { id: 9, name: '09 – Gandhi Nagar', nameEn: '09 – Gandhi Nagar', zone: 'Z4 – Vrindavan', councillor: 'Shri Sumit gautam', party: 'BJP', phone: '9045624801' },
  { id: 13, name: '13 – Sunrakh', nameEn: '13 – Sunrakh', zone: 'Z4 – Vrindavan', councillor: 'Smt. Manju', party: 'BJP', phone: '9837867021' },
  { id: 21, name: '21 – Chaitanya Bihar', nameEn: '21 – Chaitanya Bihar', zone: 'Z4 – Vrindavan', councillor: 'Shri Raju', party: 'BJP', phone: '7668764272' },
  { id: 25, name: '25 – Chharaura', nameEn: '25 – Chharaura', zone: 'Z4 – Vrindavan', councillor: 'Shri Goverdhan ji', party: 'BJP', phone: '9690235985' },
  { id: 34, name: '34 – Radhaniwas', nameEn: '34 – Radhaniwas', zone: 'Z4 – Vrindavan', councillor: 'Shri Satish Baghel', party: 'BJP', phone: '9412728203' },
  { id: 50, name: '50 – Patharpura', nameEn: '50 – Patharpura', zone: 'Z4 – Vrindavan', councillor: 'Shri Sanshank Sharma', party: 'BJP', phone: '7520552349' },
  { id: 51, name: '51 – Gaushala Nagar', nameEn: '51 – Gaushala Nagar', zone: 'Z4 – Vrindavan', councillor: 'Shri Mukesh Shaswat', party: 'BJP', phone: '9720085567' },
  { id: 62, name: '62 – Mathura Darwaza', nameEn: '62 – Mathura Darwaza', zone: 'Z4 – Vrindavan', councillor: 'Shri Dr. Roopkishore', party: 'BJP', phone: '9837022817' },
  { id: 66, name: '66 – Keshighat', nameEn: '66 – Keshighat', zone: 'Z4 – Vrindavan', councillor: 'Shri Pankaj Arora', party: 'BJP', phone: '9219768677' },
  { id: 67, name: '67 – Kemar Van', nameEn: '67 – Kemar Van', zone: 'Z4 – Vrindavan', councillor: 'SHRI Radhakishna', party: 'BJP', phone: '9837022749' },
  { id: 69, name: '69 – Ratan Chhatri', nameEn: '69 – Ratan Chhatri', zone: 'Z4 – Vrindavan', councillor: 'Shri Ghansyam', party: 'Congress', phone: '9457029688' }
];

// ── Zones ──
const ZONES = [
  { id: 'Z1 – City', name: 'Z1 – City' },
  { id: 'Z2 – Bhuteshwar', name: 'Z2 – Bhuteshwar' },
  { id: 'Z3 – Aurangabad', name: 'Z3 – Aurangabad' },
  { id: 'Z4 – Vrindavan', name: 'Z4 – Vrindavan' }
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
