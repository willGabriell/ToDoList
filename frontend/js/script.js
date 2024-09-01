const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks');
    const tasks = await response.json();
    return tasks;
}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'DELETE',
    });

    loadTaks();
}

const updateTask = async ({ id, titulo, status }) => {
   
    const url = `http://localhost:3333/tasks/${id}`

    await fetch(url , {
        method: 'PUT', 
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ titulo, status })
    })

    console.log("task: " + id + ' ' + titulo + ' ' + status);
    
    loadTaks();
}

const addTask = async (event) => {
    event.preventDefault();

    const task = { title: inputTask.value };

    await fetch('http://localhost:3333/tasks', {
        method: 'POST', 
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(task),
    });
    loadTaks();
    inputTask.value = '';
}

const formatDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' }
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
}

const createElement = (tag, innerText = '', innerHMTL = '') => {
    const element = document.createElement(tag);

    if (innerText) {
        element.innerText = innerText;
    }

    if(innerHMTL) {
        element.innerHTML = innerHMTL;
    }

    return element
}

const createSelect = (value) => {
    const options = `
        <option value="pendente">Pendente</option>
        <option value="Em Andamento">Em Andamento</option>
        <option value="Concluida">Concluida</option>
    `
    
    const select = createElement('select', '', options);
    
    select.value = value;

    return select;
}

const createRow = (task) => {
    const { id, titulo, created_at, status } = task;

    let title = titulo;

    const tr = createElement('tr');
    const tdTitle = createElement('td', titulo)
    const tdCreatedAt = createElement('td', formatDate(created_at))
    const tdStatus = createElement('td')
    const tdActions = createElement('td')

    const select = createSelect(status);

    const editBtn = createElement('button', '', '<span class="material-symbols-outlined"> edit </span>');
    const deleteBtn = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');
    editBtn.classList.add('edit-btn');
    deleteBtn.classList.add('dlt-btn');

    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = titulo;
    editForm.appendChild(editInput);
    
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateTask({ id, titulo: editInput.value, status });
    })

    editBtn.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    })
    
    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    
    tdStatus.appendChild(select); 

    select.addEventListener('change', ({ target }) => updateTask({ id, titulo, status: target.value }))

    tdActions.appendChild(editBtn);
    tdActions.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => deleteTask(id));

    return tr;
}

const loadTaks = async () => {
    const tasks = await fetchTasks();
    tbody.innerHTML = '';
    
    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);

tbody.innerHTML = '';

loadTaks();