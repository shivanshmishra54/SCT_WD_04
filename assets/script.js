document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image'); // . lagana zaruri hai

    // Empty state toggle
    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    };

    // Add task
    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>     
        `;

        // Delete button functionality
        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });

        // Edit button functionality
        li.querySelector('.edit-btn').addEventListener('click', () => {
            const newText = prompt("Edit task:", li.querySelector('span').textContent);
            if (newText !== null && newText.trim() !== '') {
                li.querySelector('span').textContent = newText.trim();
            }
        });

        // Checkbox functionality (optional: strike-through text)
        li.querySelector('.checkbox').addEventListener('change', (e) => {
            if (e.target.checked) {
                li.querySelector('span').style.textDecoration = 'line-through';
            } else {
                li.querySelector('span').style.textDecoration = 'none';
            }
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
    };

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(e);
    });

    toggleEmptyState();
});
