const KEY = 'csp_gpa_v1';

function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
function save(rows){ localStorage.setItem(KEY, JSON.stringify(rows)); }

// Convert letter or percent to 4.0 scale (simple model)
function toPoints(grade){
  if (grade == null) return 0;
  const g = String(grade).trim().toUpperCase();
  const map = { 'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,'C+':2.3,'C':2.0,'C-':1.7,'D+':1.3,'D':1.0,'F':0 };
  if (map[g] !== undefined) return map[g];
  const num = Number(g.replace('%',''));
  if (!Number.isNaN(num)){
    if (num >= 93) return 4.0;
    if (num >= 90) return 3.7;
    if (num >= 87) return 3.3;
    if (num >= 83) return 3.0;
    if (num >= 80) return 2.7;
    if (num >= 77) return 2.3;
    if (num >= 73) return 2.0;
    if (num >= 70) return 1.7;
    if (num >= 67) return 1.3;
    if (num >= 60) return 1.0;
    return 0;
  }
  return 0; // default
}

export function initGpa(){
  const form = document.getElementById('gpaForm');
  const body = document.getElementById('gpaTableBody');
  const currentEl = document.getElementById('currentGpa');
  const noteEl = document.getElementById('gpaNote');
  const clearBtn = document.getElementById('clearGPA');
  if (!form || !body) return;

  let rows = load(); // [{id,course,credits,grade}]
  const render = () => {
    body.innerHTML = rows.map(r => `
      <tr data-id="${r.id}">
        <td>${r.course}</td>
        <td>${r.credits}</td>
        <td>${r.grade}</td>
        <td><button class="btn-small remove">Remove</button></td>
      </tr>
    `).join('');

    const totals = rows.reduce((acc, r) => {
      const pts = toPoints(r.grade);
      const credits = Number(r.credits) || 0;
      acc.credits += credits;
      acc.quality += pts * credits;
      return acc;
    }, { credits:0, quality:0 });

    const gpa = totals.credits ? (totals.quality / totals.credits) : 0;
    currentEl.textContent = gpa.toFixed(2);

    // Conditional note
    noteEl.textContent = gpa >= 3.5
      ? 'Great work! You are on track for honors.'
      : gpa >= 2.0
        ? 'Solid progress. Keep going!'
        : 'Consider meeting with a tutor or advisor.';
    save(rows);
  };

  render();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const course = String(data.get('course')).trim();
    const credits = Number(data.get('credits'));
    const grade = String(data.get('grade')).trim();
    if (!course || !credits || credits <= 0 || !grade){
      alert('Enter course, positive credits, and grade.');
      return;
    }
    rows.push({ id: crypto.randomUUID(), course, credits, grade });
    form.reset();
    render();
  });

  body.addEventListener('click', e => {
    if (e.target.classList.contains('remove')){
      const tr = e.target.closest('tr');
      const id = tr.dataset.id;
      rows = rows.filter(r => r.id !== id);
      render();
    }
  });

  clearBtn?.addEventListener('click', () => {
    if (confirm('Clear all courses?')){
      rows = [];
      render();
    }
  });
}
