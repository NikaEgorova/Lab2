// script.js
// === DOM елементи ===
const taskInput = document.getElementById('new-task'); 
const addButton = document.getElementById('add-btn'); 
const taskList = document.getElementById('task-list'); 
const leftCount = document.getElementById('left'); 
const clearButton = document.getElementById('clear-completed'); 

// === Стан ===
let tasks = []; 
let nextId = 1; 

// === Безпека: екранування HTML (для запобігання XSS) ===
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML; 
}

// === Збереження в localStorage ===
function save() { 
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    localStorage.setItem('todo-nextId', nextId.toString());
}

// === Завантаження з localStorage ===
function load() { 
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) { 
        tasks = JSON.parse(savedTasks);
    }
    const savedId = localStorage.getItem('todo-nextId');
    if (savedId) { 
        nextId = parseInt(savedId, 10); 
    }
}

// === Рендер (малювання) списку ===
function render() { 
    taskList.innerHTML = ''; 

    tasks.forEach(task => { 
        const li = document.createElement('li'); 
        li.className = 'task' + (task.completed ? ' completed' : ''); 
        li.dataset.id = task.id;

        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''}> 
            <span>${escapeHtml(task.text)}</span> 
            <button data-id="${task.id}">Видалити</button>
        `;

        // 1. Подія зміни стану чекбокса (позначення виконаного)
        li.querySelector('input[type="checkbox"]').addEventListener('change', () => { 
            const taskIndex = tasks.findIndex(t => t.id === task.id);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                save();
                render();
            }
        });

        // 2. Подія видалення
        li.querySelector('button').addEventListener('click', () => { 
            tasks = tasks.filter(t => t.id !== task.id);
            save();
            render();
        });

        taskList.appendChild(li);
    });
    
    // 3. Оновлення лічильника
    const left = tasks.filter(t => !t.completed).length;
    leftCount.textContent = left;
}

// === Додати задачу ===
function addTask() { 
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        id: nextId++,
        text: text,
        completed: false
    });

    taskInput.value = '';
    save();
    render();
}

// === Очистити виконані ===
clearButton.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    save();
    render();
});

// === Події: запуск функціоналу ===
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
});

// === Старт застосунку ===
load();
render();