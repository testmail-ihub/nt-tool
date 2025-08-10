const notesContainer = document.getElementById('notes-container');
const noteInput = document.getElementById('note-input');
const addNoteButton = document.getElementById('add-note-button');
const searchInput = document.getElementById('search-input');
const pinButton = document.getElementById('pin-button');
const deleteButton = document.getElementById('delete-button');
const editButton = document.getElementById('edit-button');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editing = null;
let pinnedNotes = [];

function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        if (note.pinned) {
            noteElement.classList.add('pinned');
        }
        noteElement.innerHTML = `
            <div class="note-content">${note.text}</div>
            <div class="note-actions">
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function addNote() {
    const text = noteInput.value.trim();
    if (text) {
        const newNote = {
            text,
            pinned: false,
        };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        renderNotes();
    }
}

function editNote(index) {
    editing = index;
    const note = notes[index];
    noteInput.value = note.text;
    saveButton.style.display = 'block';
    cancelButton.style.display = 'block';
    editButton.style.display = 'none';
    addNoteButton.style.display = 'none';
}

function saveNote() {
    const text = noteInput.value.trim();
    if (text) {
        notes[editing].text = text;
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        editing = null;
        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
        editButton.style.display = 'block';
        addNoteButton.style.display = 'block';
        renderNotes();
    }
}

function cancelEdit() {
    noteInput.value = '';
    editing = null;
    saveButton.style.display = 'none';
    cancelButton.style.display = 'none';
    editButton.style.display = 'block';
    addNoteButton.style.display = 'block';
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

function pinNote(index) {
    notes[index].pinned = !notes[index].pinned;
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

function searchNotes() {
    const searchText = searchInput.value.toLowerCase();
    const filteredNotes = notes.filter((note) => note.text.toLowerCase().includes(searchText));
    notesContainer.innerHTML = '';
    filteredNotes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        if (note.pinned) {
            noteElement.classList.add('pinned');
        }
        noteElement.innerHTML = `
            <div class="note-content">${note.text}</div>
            <div class="note-actions">
                <button class="edit-button" data-index="${index}">Edit</button>
                <button class="delete-button" data-index="${index}">Delete</button>
            </div>
        `;
        notesContainer.appendChild(noteElement);
    });
}

addNoteButton.addEventListener('click', addNote);
editButton.addEventListener('click', () => {
    if (editing !== null) {
        saveNote();
    } else {
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                editNote(index);
            });
        });
    }
});
saveButton.addEventListener('click', saveNote);
cancelButton.addEventListener('click', cancelEdit);
deleteButton.addEventListener('click', () => {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            deleteNote(index);
        });
    });
});