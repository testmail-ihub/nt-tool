const noteContainer = document.getElementById('note-container');
const noteInput = document.getElementById('note-input');
const addNoteButton = document.getElementById('add-note-button');
const searchInput = document.getElementById('search-input');
const pinButton = document.getElementById('pin-button');
const deleteButton = document.getElementById('delete-button');
const editButton = document.getElementById('edit-button');
const saveButton = document.getElementById('save-button');
const cancelButton = document.getElementById('cancel-button');
const noteModal = document.getElementById('note-modal');
const noteModalInput = document.getElementById('note-modal-input');
const noteModalTitle = document.getElementById('note-modal-title');
const noteModalActions = document.getElementById('note-modal-actions');
const noteModalCloseButton = document.getElementById('note-modal-close-button');

let currentNoteId = null;
let isEditing = false;
let pinnedNotes = [];

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    noteContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = createNoteElement(note, index);
        noteContainer.appendChild(noteElement);
        if (note.pinned) {
            pinnedNotes.push(index);
        }
    });
}

function createNoteElement(note, index) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
        <p>${note.text}</p>
        <div class="note-actions">
            <button class="edit-button" data-index="${index}">Edit</button>
            <button class="delete-button" data-index="${index}">Delete</button>
            <button class="pin-button" data-index="${index}">${note.pinned ? 'Unpin' : 'Pin'}</button>
        </div>
    `;
    noteElement.addEventListener('click', () => {
        noteModalInput.value = note.text;
        noteModalTitle.textContent = `Note ${index + 1}`;
        currentNoteId = index;
        isEditing = true;
        noteModalActions.style.display = 'none';
        noteModal.style.display = 'block';
    });
    const editButton = noteElement.querySelector('.edit-button');
    editButton.addEventListener('click', () => {
        noteModalInput.value = note.text;
        noteModalTitle.textContent = `Note ${index + 1}`;
        currentNoteId = index;
        isEditing = true;
        noteModalActions.style.display = 'block';
        noteModal.style.display = 'block';
    });
    const deleteButton = noteElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        deleteNote(index);
    });
    const pinButton = noteElement.querySelector('.pin-button');
    pinButton.addEventListener('click', () => {
        togglePinNote(index);
    });
    return noteElement;
}

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ text: noteText, pinned: false });
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        loadNotes();
    }
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

function togglePinNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes[index].pinned = !notes[index].pinned;
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

function saveNote() {
    const noteText = noteModalInput.value.trim();
    if (noteText !== '') {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes[currentNoteId] = { text: noteText, pinned: notes[currentNoteId] ? notes[currentNoteId].pinned : false };
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
        noteModal.style.display = 'none';
        isEditing = false;
    }
}

function cancelEdit() {
    noteModal.style.display = 'none';
    isEditing = false;
}

function searchNotes() {
    const searchText = searchInput.value.toLowerCase();
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    noteContainer.innerHTML = '';
    notes.forEach((note, index) => {
        if (note.text.toLowerCase().includes(searchText)) {
            const noteElement = createNoteElement(note, index);
            noteContainer.appendChild(noteElement);
        }
    });
}