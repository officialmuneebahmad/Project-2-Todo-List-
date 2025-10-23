// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // 1. Select the parent <ul> and the button
    const list = document.getElementById('myList');
    const button = document.getElementById('addItemBtn');
    const input = document.getElementById('itemInput');

    // Storage key for our todos
    const STORAGE_KEY = 'todos';

    // Load todos from localStorage when page loads
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todos.forEach(todo => addTodoToDOM(todo));
    }

    // Save todos to localStorage
    function saveTodos() {
        const todos = [];
        const listItems = list.querySelectorAll('li');
        listItems.forEach(li => {
            todos.push(li.querySelector('span').textContent);
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }

    // Add todo to the DOM
    function addTodoToDOM(itemText) {
        const newLi = document.createElement('li');
    newLi.className = 'flex flex-row justify-between font-semibold border-b items-center py-2';

    const textContainer = document.createElement('div');
    textContainer.className = 'flex items-center';

    const bullet = document.createElement('span');
    bullet.textContent = '•';
    bullet.className = 'mr-2 text-gray-600';

    const span = document.createElement('span');
    span.textContent = itemText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'bg-red-700 text-white py-2 px-4 my-2 rounded hover:bg-red-800';
    deleteBtn.addEventListener('click', function() {
        newLi.remove();
        saveTodos();
    });
    
    textContainer.appendChild(bullet);
    textContainer.appendChild(span);
    newLi.appendChild(textContainer);
    newLi.appendChild(deleteBtn);
    list.appendChild(newLi);
    }

    // 2. Add a click event listener to the button
    button.addEventListener('click', function() {
        // Get the value from the input field
        const itemText = input.value.trim();

        // Exit if the input is empty
        if (itemText === '') return;

        // 3. Create and add the new <li> element
        addTodoToDOM(itemText);

        // Save to localStorage
        saveTodos();

        // 6. Clear the input field for the next entry
        input.value = '';
    });

    // Allow pressing Enter to add item
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                button.click();
            }
        });

    // Clock 
    function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
    document.getElementById('clock').textContent = `${dateString} | ${timeString}`;
  }

    // Update every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call

    // Load existing todos on page load
    loadTodos();
});

