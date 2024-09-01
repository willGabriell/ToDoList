const tbody = document.querySelector('tbody');

const task = {
    id: 1,
    title: 'teste',
    created_at: '00 de Janeiro de 2021 14:30',
    status: 'Pendente',
}

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks');
    const tasks = await response.json();
    return tasks;
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
    
    select.value = value.toLowerCase();

    return select;
}

const createRow = (task) => {
    const { id, title, created_at, status } = task
    const tr = createElement('tr');
    const tdTitle = createElement('td', title)
    const tdCreatedAt = createElement('td', created_at)
    const tdStatus = createElement('td')
    const tdActions = createElement('td')

    const select = createSelect(status);

    const editBtn = createElement('button', '', '<span class="material-symbols-outlined"> edit </span>');
    const deleteBtn = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');
    editBtn.classList.add('edit-btn');
    deleteBtn.classList.add('dlt-btn');
    
    tdStatus.appendChild(select); 

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);
    
    tdActions.appendChild(editBtn);
    tdActions.appendChild(deleteBtn);

    tbody.appendChild(tr);
    console.log(tr);
}

createRow(task)