
let canvas = document.getElementById('canvas');
let addTextBtn = document.getElementById('addText');
let undoBtn = document.getElementById('undo');
let redoBtn = document.getElementById('redo');
let fontSizeInput = document.getElementById('fontSize');
let fontStyleInput = document.getElementById('fontStyle');

// Undo/Redo stack
let undoManager = new UndoManager();

// Function to add new text
addTextBtn.addEventListener('click', () => {
    let newText = document.createElement('div');
    newText.innerText = 'New Text';
    newText.contentEditable = true;
    newText.classList.add('draggable');
    newText.style.position = 'absolute';
    newText.style.left = '50px';
    newText.style.top = '50px';
    newText.style.fontSize = `${fontSizeInput.value}px`;
    newText.style.fontWeight = fontStyleInput.value === 'bold' ? 'bold' : 'normal';
    newText.style.fontStyle = fontStyleInput.value === 'italic' ? 'italic' : 'normal';

    canvas.appendChild(newText);
    
    // Enable dragging
    interact(newText).draggable({
        listeners: {
            move(event) {
                let target = event.target;
                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    });

    undoManager.add({
        undo: () => newText.remove(),
        redo: () => canvas.appendChild(newText)
    });
});

// Undo/Redo functionality
undoBtn.addEventListener('click', () => undoManager.undo());
redoBtn.addEventListener('click', () => undoManager.redo());

// Change font size/style
fontSizeInput.addEventListener('input', () => {
    let selected = document.querySelector('.draggable:focus');
    if (selected) {
        selected.style.fontSize = `${fontSizeInput.value}px`;
    }
});

fontStyleInput.addEventListener('change', () => {
    let selected = document.querySelector('.draggable:focus');
    if (selected) {
        selected.style.fontWeight = fontStyleInput.value === 'bold' ? 'bold' : 'normal';
        selected.style.fontStyle = fontStyleInput.value === 'italic' ? 'italic' : 'normal';
    }
});
