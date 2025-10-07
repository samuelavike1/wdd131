const KEY = 'csp_todos_v1';

function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
function save(list){ localStorage.setItem(KEY, JSON.stringify(list)); }

function isToday(dateStr){
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d.getFullYear()===now.getFullYear() && d.getMonth()===now.getMonth() && d.getDate()===now.getDate();
}

export function initTodo(){
  const form = document.getElementById('todoForm');
  const listEl = document.getElementById('todoList');
  const filterSel = document.getElementById('filterSelect');
  if (!form || !listEl) return;

  let todos = load(); // [{id,task,due,priority,done}]
  let filter = 'all';

  const render = () => {
    const filtered = todos.filter(t => {
      if (filter==='today') return isToday(t.due);
      if (filter==='completed') return t.done;
      if (filter==='open') return !t.done;
      return true;
    });

    listEl.innerHTML = filtered.map(t => {
      const dueStr = t.due ? new Date(t.due).toLocaleDateString() : 'No due date';
      const status = t.done ? 'done' : '';
      return `
        <li class="todo-item" data-id="${t.id}">
          <div class="todo-left">
            <input type="checkbox" ${t.done?'checked':''} aria-label="Mark complete">
            <div>
              <div class="todo-title ${status}">${t.task}</div>
              <div class="todo-meta">${t.priority} • ${dueStr}</div>
            </div>
          </div>
          <div class="todo-actions">
            <button class="btn-small edit">Edit</button>
            <button class="btn-small delete">Delete</button>
          </div>
        </li>
      `;
    }).join('') || `<p class="muted">No tasks found.</p>`;
  };

  render();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const task = String(data.get('task')).trim();
    const due = data.get('due');
    const priority = data.get('priority') || 'Low';
    if (!task){
      alert('Enter a task name.');
      return;
    }
    todos.push({ id: crypto.randomUUID(), task, due, priority, done:false });
    save(todos);
    render();
    form.reset();
  });

  listEl.addEventListener('change', e => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = li.dataset.id;
    if (e.target.matches('input[type="checkbox"]')){
      todos = todos.map(t => t.id===id ? { ...t, done: e.target.checked } : t);
      save(todos);
      render();
    }
  });

  listEl.addEventListener('click', e => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.classList.contains('delete')){
      todos = todos.filter(t => t.id !== id);
      save(todos);
      render();
    }

    if (e.target.classList.contains('edit')){
      const current = todos.find(t => t.id===id);
      const newTask = prompt('Edit task', current.task);
      if (newTask && newTask.trim()){
        todos = todos.map(t => t.id===id ? { ...t, task: newTask.trim() } : t);
        save(todos);
        render();
      }
    }
  });

  filterSel?.addEventListener('change', () => {
    filter = filterSel.value;
    render();
  });
}
