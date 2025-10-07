const KEY = 'csp_schedule_v1';

const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
function save(items){ localStorage.setItem(KEY, JSON.stringify(items)); }

// Validate times (conditional branching)
function validRange(start, end){
  return Boolean(start && end && start < end);
}

export function initSchedule(){
  const form = document.getElementById('scheduleForm');
  const grid = document.getElementById('scheduleGrid');
  const clearBtn = document.getElementById('clearWeek');

  if (!form || !grid) return;

  // Initialize grid columns
  grid.innerHTML = days.map(d => `
    <div class="col" data-day="${d}">
      <strong>${d}</strong>
      <div class="col-body"></div>
    </div>
  `).join('');

  let items = load(); // [{id,title,day,start,end}]
  const render = () => {
    // Clear
    grid.querySelectorAll('.col-body').forEach(c => c.innerHTML = '');
    // Group by day and render (arrays & methods)
    days.forEach(d => {
      const col = grid.querySelector(`.col[data-day="${d}"] .col-body`);
      const dayItems = items
        .filter(it => it.day === d)
        .sort((a,b) => a.start.localeCompare(b.start));

      dayItems.forEach(it => {
        const el = document.createElement('div');
        el.className = 'badge';
        el.innerHTML = `
          <span>${it.title} (${it.start}–${it.end})</span>
          <button class="del" aria-label="Delete ${it.title}" data-id="${it.id}">×</button>
        `;
        col.appendChild(el);
      });
    });
  };

  render();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const title = String(data.get('title')).trim();
    const day = data.get('day');
    const start = data.get('start');
    const end = data.get('end');

    if (!title || !day || !validRange(start, end)){
      alert('Please enter a title, pick a day, and ensure Start < End.');
      return;
    }

    const id = crypto.randomUUID();
    items.push({ id, title, day, start, end });
    save(items);
    render();
    form.reset();
  });

  grid.addEventListener('click', e => {
    const btn = e.target.closest('button.del');
    if (!btn) return;
    const id = btn.dataset.id;
    items = items.filter(x => x.id !== id);
    save(items);
    render();
  });

  clearBtn?.addEventListener('click', () => {
    if (confirm('Clear all blocks for the week?')){
      items = [];
      save(items);
      render();
    }
  });
}
