// Mobile menu toggle & year
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('show'));
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); nav?.classList.remove('show'); }
  });
});

// ===== PRO TAX CALCULATOR =====

// Editable tax tables by year (example values). Update here when ο νόμος αλλάξει.
const TAX_TABLES = {
  "2025": {
    EMP: [ // Μισθωτά/Συντάξεις & Επιχειρ. δραστηριότητα (ίδια κλιμάκια εδώ)
      { upTo: 10000, rate: 0.09 },
      { upTo: 20000, rate: 0.22 },
      { upTo: 30000, rate: 0.28 },
      { upTo: 40000, rate: 0.36 },
      { upTo: Infinity, rate: 0.44 },
    ],
    RENT: [
      { upTo: 12000, rate: 0.15 },
      { upTo: 35000, rate: 0.35 },
      { upTo: Infinity, rate: 0.45 },
    ]
  },
  "2024": {
    EMP: [
      { upTo: 10000, rate: 0.09 },
      { upTo: 20000, rate: 0.22 },
      { upTo: 30000, rate: 0.28 },
      { upTo: 40000, rate: 0.36 },
      { upTo: Infinity, rate: 0.44 },
    ],
    RENT: [
      { upTo: 12000, rate: 0.15 },
      { upTo: 35000, rate: 0.35 },
      { upTo: Infinity, rate: 0.45 },
    ]
  }
};

function calcProgressiveDetailed(amount, brackets){
  let remaining = Math.max(0, amount||0);
  let prevLimit = 0;
  const rows = [];
  let total = 0;
  for (const b of brackets){
    const span = b.upTo === Infinity ? Infinity : (b.upTo - prevLimit);
    const part = Math.min(remaining, span);
    if (part > 0){
      const tax = part * b.rate;
      rows.push({
        range: b.upTo === Infinity ? `${fmtEUR(prevLimit+1)}+` : `${fmtEUR(prevLimit+1)}–${fmtEUR(b.upTo)}`,
        amount: part,
        rate: b.rate,
        tax
      });
      total += tax;
      remaining -= part;
    }
    if (b.upTo !== Infinity) prevLimit = b.upTo;
    if (remaining <= 0) break;
  }
  return { rows, total: Math.round(total) };
}

function fmtEUR(n){
  return new Intl.NumberFormat('el-GR', { style:'currency', currency:'EUR', maximumFractionDigits:0 }).format(n||0);
}

function toCSV(rows){
  const head = ['Κλιμάκιο','Ποσό','Συντελεστής','Φόρος'];
  const body = rows.map(r=>[r.range, r.amount, (r.rate*100).toFixed(0)+'%', Math.round(r.tax)]);
  const all = [head, ...body].map(line=>line.join(';')).join('\n');
  return all;
}

// Elements
const elYear = document.getElementById('taxYear');
const elAdv = document.getElementById('advanceRate');
const elDuty = document.getElementById('businessDuty');
const elSalary = document.getElementById('incSalary');
const elBus = document.getElementById('incBusiness');
const elRent = document.getElementById('incRental');

const outSalary = document.getElementById('taxSalary');
const outBusiness = document.getElementById('taxBusiness');
const outAdvance = document.getElementById('taxAdvance');
const outRent = document.getElementById('taxRental');
const outDuty = document.getElementById('taxDuty');
const outTotal = document.getElementById('taxTotal');

const tblSalary = document.querySelector('#tblSalary tbody');
const tblBusiness = document.querySelector('#tblBusiness tbody');
const tblRent = document.querySelector('#tblRental tbody');

function renderRows(tbody, rows){
  tbody.innerHTML = '';
  rows.forEach(r=>{
    const tr = document.createElement('tr');
    const td1 = document.createElement('td'); td1.textContent = r.range;
    const td2 = document.createElement('td'); td2.textContent = fmtEUR(r.amount);
    const td3 = document.createElement('td'); td3.textContent = (r.rate*100).toFixed(0)+'%';
    const td4 = document.createElement('td'); td4.textContent = fmtEUR(Math.round(r.tax));
    tr.append(td1, td2, td3, td4);
    tbody.appendChild(tr);
  });
  if (!rows.length){
    const tr = document.createElement('tr');
    const td = document.createElement('td'); td.colSpan = 4; td.style.textAlign='center'; td.textContent = '—';
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
}

function calculate(){
  const year = elYear.value;
  const t = TAX_TABLES[year];
  const advRate = parseFloat(elAdv.value)||0;
  const duty = Math.max(0, parseFloat(elDuty.value)||0);

  const salary = Math.max(0, parseFloat(elSalary.value)||0);
  const business = Math.max(0, parseFloat(elBus.value)||0);
  const rental = Math.max(0, parseFloat(elRent.value)||0);

  const detS = calcProgressiveDetailed(salary, t.EMP);
  const detB = calcProgressiveDetailed(business, t.EMP);
  const detR = calcProgressiveDetailed(rental, t.RENT);

  const advance = Math.round(detB.total * advRate);
  const total = detS.total + detB.total + detR.total + advance + duty;

  outSalary.textContent = fmtEUR(detS.total);
  outBusiness.textContent = fmtEUR(detB.total);
  outAdvance.textContent = fmtEUR(advance);
  outRent.textContent = fmtEUR(detR.total);
  outDuty.textContent = fmtEUR(duty);
  outTotal.textContent = fmtEUR(total);

  renderRows(tblSalary, detS.rows);
  renderRows(tblBusiness, detB.rows);
  renderRows(tblRent, detR.rows);

  // Store last inputs
  const payload = {year, advRate, duty, salary, business, rental};
  try{ localStorage.setItem('finora_calc', JSON.stringify(payload)); }catch{}
}

document.getElementById('calcBtn')?.addEventListener('click', calculate);
document.getElementById('clearBtn')?.addEventListener('click', ()=>{
  [elSalary, elBus, elRent, elDuty].forEach(el=>el.value='');
  elAdv.value='0'; elYear.value='2025';
  calculate();
});
document.getElementById('printBtn')?.addEventListener('click', ()=>window.print());
document.getElementById('csvBtn')?.addEventListener('click', ()=>{
  // Combine CSV from all three tables
  const year = elYear.value;
  const blocks = [
    {title:'Μισθωτά/Συντάξεις', rows: readRows(tblSalary)},
    {title:'Επιχειρ. δραστηριότητα', rows: readRows(tblBusiness)},
    {title:'Ακίνητα', rows: readRows(tblRent)},
  ];
  let csv = `Έτος;${year}\n`;
  csv += `\nΜισθωτά/Συντάξεις\n` + toCSV(blocks[0].rows);
  csv += `\n\nΕπιχειρ. δραστηριότητα\n` + toCSV(blocks[1].rows);
  csv += `\n\nΑκίνητα\n` + toCSV(blocks[2].rows);
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `finora_tax_${year}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
});

function readRows(tbody){
  const rows = [];
  tbody.querySelectorAll('tr').forEach(tr=>{
    const cells = tr.querySelectorAll('td');
    if (cells.length===4 && cells[0].textContent !== '—'){
      rows.push({
        range: cells[0].textContent,
        amount: Number(cells[1].textContent.replace(/[^0-9]/g,'')),
        rate: Number(cells[2].textContent.replace('%',''))/100,
        tax: Number(cells[3].textContent.replace(/[^0-9]/g,''))
      });
    }
  });
  return rows;
}

// Load last inputs if any
try{
  const raw = localStorage.getItem('finora_calc');
  if (raw){
    const p = JSON.parse(raw);
    elYear.value = p.year||'2025';
    elAdv.value = String(p.advRate||'0');
    elDuty.value = p.duty||'';
    elSalary.value = p.salary||'';
    elBus.value = p.business||'';
    elRent.value = p.rental||'';
  }
}catch{}

calculate(); // initial render

