const fs = require('fs');

const ocrText = `1 1 Smt. Kiran Devi (BSP)9027220083 
2 2 Shri Ravikant (BJP) 8445536976
3 3 Shri Dinesh Kumar (BJP) 9719093110
4 4 Shri Omprakash (BJP) 8791892031
5 5 Shri Hanuman Gurjar (BJP) 8533930006
6 6 Smt. Rabuda Devi (RLD) 7457009269
7 7 Shri Hari chand (BJP)9410617101
8 8 Smt. Sonia (---) 7827475801
9 9 Shri Sumit gautam (BJP) 9045624801
10 10 Smt. Babita Saini (Nirdaliya) 9557313979
11 11 Smt. Sashi (Nirdaliye) 7457009267
12 12 Mrs. Pooja Ahiriya (BJP) 9548115161
13 13 Smt. Manju (BJP) 9837867021
14 14 Shri Jatendra (BJP) 9759965360
15 15 Smt. Jitendra Singh (BJP) 9607478682
16 16 Shri Gulshan kumar (BJP) 9058466803
17 17 Shri Birjesh Khare (BJP) 9368388838
18 18 Shri Vikash Diwakar (BJP) 9837562020
19 19 Shri Pradeep Singh (BJP)9412277448
20 20 Shri Devindra (BJP) 9897829801
21 21 Shri Raju (BJP) 7668764272
22 22 Smt Najra Begam (SP) 9837357211
23 23 Shri Subhash Yadav (BJP) 8273221506
24 24 Shri Ankur Gujjarv 9720202718
25 25 Shri Goverdhan ji (BJP) 9690235985
26 26 Shri Punit Baghel (BJP) 9956009303
27 27 Shri Rajendra (BJP) 7252804958
28 28 Smt. Krishna Devi (BJP) 886489091
29 29 Shri. Rakesh Yadav (BSP) 7453884003
30 30 Shri Chandan Ahuja (BJP) 9557816062
31 31 Moh. Munna Malik (SP) 9720007864
32 32 Smt. Hemlata (RLD) 9760062003
33 33 Shri Anil Kumar (BJP) 7906757133
34 34 Shri Satish Baghel (BJP) 9412728203
35 35 Shri Tarun Saini (BJP) 8393903788
36 36 Shri Rakesh Bhatia (BJP) 8077595901
37 37 Shri Rajeev Ch. (BJP) 9412171824
38 38 Shri Suresh (BSP) 8630503982
39 39 Smt Poonam Tiwari (BJP) 7983565256
40 40 Shri Sanjay Lodhi (BJP) 7579521777
41 41 Shri Sanjay Singh (BJP) 8077781631
42 42 Mohd. Abrar Khan (Congress) 7037654156
43 43 Mrs. Leela(BJP) 8077063470
44 44 Shri Niranjan Ch. BJP 9012336267
45 45 Mrs. Uma Dixit (BJP) 8630365802
46 46 Shri Rajveer Ch (BJP) 8057226326
47 47 Shri Tilakveer (Congress) 8394970700
48 48 Shri Lakshya Saini (BJP) 9927418535
49 49 Shri Manoj Sharma (BJP) 8218583482
50 50 Shri Sanshank Sharma (BJP) 7520552349
51 51 Shri Mukesh Shaswat (BJP) 9720085567
52 52 Shri Dharmesh Ch (BJP) 7078477263
53 53 Shri Dhananjay Ch. (Congress 7060784729
54 54 Shri Tejveer (BJP) 9719410009
55 55 Shri Vivek Prakash (BJP) 9917315297
56 56 Mrs. Neetu Verma (BJP) 9319741489
57 57 Shri Dinesh Ch (BJP) 8868908545
58 58 Mrs. Neelam Goyal (BJP) 8218005117
59 59 Smt. Pushpa Devi (BJP) 9837542151
60 60 Shri Niraj Vashist (BJP) 9368833539
61 61 Smt. Rachna Pathak (BJP) 6397984268
62 62 Shri Dr. Roopkishore (BJP) 9837022817
63 63 Shri Sanjay (BJP) 895447004
64 64 Shri Balkishan (BJP) 7037165205
65 65 Shri Santosh Pathak (Congress)7500754040
66 66 Shri Pankaj Arora (BJP) 9219768677
67 67 SHRI Radhakishna[BJP] 9837022749
68 68 Shri Kuldip Pathak (BJP) 9759443813
69 69 Shri Ghansyam (Congress) 9457029688
70 70 Shri Vaibhav (BJP) 9568817153`;

const mappings = {};
const lines = ocrText.trim().split('\n');
for (let line of lines) {
  line = line.trim();
  if (!line) continue;
  
  const phoneMatch = line.match(/\s*(\d{9,10})\s*$/);
  let phone = '';
  if (phoneMatch) {
    phone = phoneMatch[1];
    line = line.substring(0, line.length - phoneMatch[0].length).trim();
  }
  
  const prefixMatch = line.match(/^(\d+)\s+(\d+)\s+/);
  if (!prefixMatch) continue;
  const wardId = parseInt(prefixMatch[2], 10);
  line = line.substring(prefixMatch[0].length).trim();
  
  let party = '';
  const partyMatch = line.match(/[\(\[]?([A-Za-z\-]+)[\)\]]?$/);
  if (partyMatch) {
    party = partyMatch[1];
    if (party === '---') party = 'Independent';
    line = line.substring(0, line.length - partyMatch[0].length).trim();
  } else {
    const partyMatch2 = line.match(/\s+(BJP|Congress|SP|BSP|RLD|Nirdaliya|Nirdaliye)$/i);
    if (partyMatch2) {
       party = partyMatch2[1];
       line = line.substring(0, line.length - partyMatch2[0].length).trim();
    }
  }
  
  const councillor = line.replace(/[\(\[\]\)]/g, '').trim(); // strip stray braces
  
  mappings[wardId] = {
    councillor,
    party,
    phone
  };
}

let dataJs = fs.readFileSync('js/data.js', 'utf8');

const startIdx = dataJs.indexOf('const WARDS = [');
const endIdx = dataJs.indexOf('];', startIdx) + 2;

if (startIdx !== -1 && endIdx !== -1) {
  const wardsBlock = dataJs.substring(startIdx, endIdx);
  const tempScript = wardsBlock.replace('const WARDS = ', 'module.exports = ');
  fs.writeFileSync('temp.js', tempScript);
  const wardsArray = require('./temp.js');
  
  for (let w of wardsArray) {
    if (mappings[w.id]) {
      w.councillor = mappings[w.id].councillor;
      w.party = mappings[w.id].party;
      w.phone = mappings[w.id].phone;
    }
  }
  
  const newWardsBlock = 'const WARDS = [\n' + wardsArray.map(w => {
    return `  { id: ${w.id}, name: '${w.name}', nameEn: '${w.nameEn}', zone: '${w.zone}', councillor: '${w.councillor.replace(/'/g, "\\'")}', party: '${(w.party||'').replace(/'/g, "\\'")}', phone: '${w.phone}' }`;
  }).join(',\n') + '\n];';
  
  dataJs = dataJs.substring(0, startIdx) + newWardsBlock + dataJs.substring(endIdx);
  fs.writeFileSync('js/data.js', dataJs);
  console.log('Successfully updated js/data.js');
} else {
  console.error('Could not find WARDS block');
}
