document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const lanes = document.querySelectorAll('.tasks');

    // タスク追加機能
    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const taskElement = createTaskElement(taskText);
            document.querySelector('#todo-lane .tasks').appendChild(taskElement);
            newTaskInput.value = '';
        }
    });

    // タスク要素を作成する関数
    function createTaskElement(text) {
        const div = document.createElement('div');
        div.classList.add('task');
        div.draggable = true;
        div.innerText = text;

        // ドラッグ開始時の処理
        div.addEventListener('dragstart', () => {
            div.classList.add('dragging');
        });

        // ドラッグ終了時の処理
        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
        });

        return div;
    }

    // ドラッグ＆ドロップの処理
    lanes.forEach(lane => {
        lane.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(lane, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (afterElement == null) {
                lane.appendChild(draggable);
            } else {
                lane.insertBefore(draggable, afterElement);
            }
        });
    });

    function getDragAfterElement(lane, y) {
        const draggableElements = [...lane.querySelectorAll('.task:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
});
