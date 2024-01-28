document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task !== '') {
        const timestamp = new Date().toLocaleString();
        const taskObject = { task, timestamp, completed: false };

        let tasks = getTasksFromStorage();
        tasks.push(taskObject);
        saveTasksToStorage(tasks);

        taskInput.value = '';
        loadTasks();
    }
}

function loadTasks() {
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');

    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    const tasks = getTasksFromStorage();

    tasks.forEach(taskObject => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskObject.task}</span>
            <span>${taskObject.timestamp}</span>
            <span>
                <button class="edit" onclick="editTask(${tasks.indexOf(taskObject)})">Edit</button>
                <button class="delete" onclick="deleteTask(${tasks.indexOf(taskObject)})">Delete</button>
            </span>
        `;

        if (taskObject.completed) {
            li.classList.add('completed');
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });
}

function editTask(index) {
    const tasks = getTasksFromStorage();
    const updatedTask = prompt('Edit the task:', tasks[index].task);

    if (updatedTask !== null) {
        tasks[index].task = updatedTask;
        saveTasksToStorage(tasks);
        loadTasks();
    }
}

function deleteTask(index) {
    const tasks = getTasksFromStorage();
    tasks.splice(index, 1);
    saveTasksToStorage(tasks);
    loadTasks();
}

function getTasksFromStorage() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
