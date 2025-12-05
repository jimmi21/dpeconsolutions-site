/**
 * D.P. Accounting Solutions - Calculator Core Module
 * Shared tax calculation logic for Greek income tax
 * @version 5.0
 */

/**
 * Φορολογικές κλίμακες ανά έτος
 * @type {Object.<string, {EMP: Array, RENT: Array}>}
 */
export const TAX_TABLES = {
  "2025": {
    EMP: [
      { upTo: 10000, rate: 0.09 },
      { upTo: 20000, rate: 0.22 },
      { upTo: 30000, rate: 0.28 },
      { upTo: 40000, rate: 0.36 },
      { upTo: Infinity, rate: 0.44 }
    ],
    RENT: [
      { upTo: 12000, rate: 0.15 },
      { upTo: 35000, rate: 0.35 },
      { upTo: Infinity, rate: 0.45 }
    ]
  },
  "2024": {
    EMP: [
      { upTo: 10000, rate: 0.09 },
      { upTo: 20000, rate: 0.22 },
      { upTo: 30000, rate: 0.28 },
      { upTo: 40000, rate: 0.36 },
      { upTo: Infinity, rate: 0.44 }
    ],
    RENT: [
      { upTo: 12000, rate: 0.15 },
      { upTo: 35000, rate: 0.35 },
      { upTo: Infinity, rate: 0.45 }
    ]
  }
};

/**
 * Υπολογίζει την έκπτωση φόρου βάσει αριθμού τέκνων
 * Βάσει ελληνικής φορολογικής νομοθεσίας
 * @param {number} children - Αριθμός εξαρτώμενων τέκνων (0+)
 * @returns {number} Ποσό έκπτωσης σε ευρώ
 * @example
 * childrenCredit(0) // returns 0
 * childrenCredit(2) // returns 1120
 */
export function childrenCredit(children) {
  if (children <= 0) return 0;
  if (children === 1) return 900;
  if (children === 2) return 1120;
  if (children === 3) return 1340;
  if (children === 4) return 1580;
  if (children === 5) return 1780;
  return 1780 + (children - 5) * 220;
}

/**
 * Υπολογίζει τη σταδιακή μείωση της έκπτωσης φόρου
 * Η έκπτωση μειώνεται κατά 20€ ανά 1000€ εισοδήματος άνω των 12000€
 * @param {number} baseCredit - Βασική έκπτωση από childrenCredit()
 * @param {number} salary - Εισόδημα από μισθωτές υπηρεσίες
 * @param {number} children - Αριθμός τέκνων
 * @returns {number} Τελική έκπτωση μετά τη σταδιακή μείωση
 */
export function phasedCredit(baseCredit, salary, children) {
  if (children >= 5) return baseCredit;
  const excess = Math.max(0, (salary || 0) - 12000);
  const steps = Math.floor(excess / 1000);
  return Math.max(0, baseCredit - steps * 20);
}

/**
 * Υπολογίζει φόρο με προοδευτική κλίμακα
 * @param {number} amount - Φορολογητέο εισόδημα
 * @param {Array<{upTo: number, rate: number}>} brackets - Φορολογικές κλίμακες
 * @returns {{rows: Array, total: number}} Αναλυτική κατανομή και συνολικός φόρος
 */
export function calcProgressive(amount, brackets) {
  let remaining = Math.max(0, amount || 0);
  let prev = 0;
  const rows = [];
  let total = 0;

  for (const bracket of brackets) {
    const span = bracket.upTo === Infinity ? Infinity : bracket.upTo - prev;
    const taxable = Math.min(remaining, span);

    if (taxable > 0) {
      const tax = Math.round(taxable * bracket.rate);
      const rangeLabel = bracket.upTo === Infinity
        ? `${(prev + 1).toLocaleString('el-GR')} € και άνω`
        : `${(prev + 1).toLocaleString('el-GR')}–${bracket.upTo.toLocaleString('el-GR')} €`;

      rows.push({
        range: rangeLabel,
        amount: taxable,
        rate: bracket.rate,
        tax: tax
      });

      total += tax;
      remaining -= taxable;
    }

    if (bracket.upTo !== Infinity) prev = bracket.upTo;
    if (remaining <= 0) break;
  }

  return { rows, total };
}

/**
 * Μορφοποιεί αριθμό σε ελληνικό νόμισμα (EUR)
 * @param {number} value - Αριθμητική τιμή
 * @returns {string} Μορφοποιημένο νόμισμα (π.χ. "1.234 €")
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value || 0);
}

/**
 * Μετατρέπει πίνακα HTML σε CSV format
 * @param {HTMLTableSectionElement} tbody - Table body element
 * @returns {string} CSV string με ; ως διαχωριστικό
 */
export function tableToCSV(tbody) {
  const headers = ['Κλίμακες Φορολογίας', 'Ποσό', 'Συντελεστής', 'Φόρος'];
  const rows = [...tbody.querySelectorAll('tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td => td.textContent)
  );
  return [headers, ...rows].map(r => r.join(';')).join('\n');
}

/**
 * Μορφοποιεί ημερομηνία σε ICS format (UTC)
 * @param {Date} date - JavaScript Date object
 * @returns {string} ICS formatted date string
 */
export function formatICSDate(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
