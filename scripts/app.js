const noteContainer = document.getElementById('note-container');
const searchInput = document.getElementById('search-input');
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
    noteContainer.innerHTML = '';
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchInput.value.toLowerCase()));
    filteredNotes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.content}</p>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="pin-btn ${note.pinned ? 'pinned' : ''}">${note.pinned ? 'Unpin' : 'Pin'}</button>
        `;
        if (note.pinned) {
            noteElement.classList.add('yellow');
        }
        noteContainer.appendChild(noteElement);
        noteElement.querySelector('.edit-btn').addEventListener('click', () => editNote(note));
        noteElement.querySelector('.delete-btn').addEventListener('click', () => deleteNote(note));
        noteElement.querySelector('.pin-btn').addEventListener('click', () => togglePin(note));
    });
}

function addNote() {
    const title = prompt('Enter note title:');
    const content = prompt('Enter note content:');
    if (title && content) {
        const newNote = { title, content, pinned: false };
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
}

function editNote(note) {
    const newTitle = prompt('Enter new title:', note.title);
    const newContent = prompt('Enter new content:', note.content);
    if (newTitle && newContent) {
        note.title = newTitle;
        note.content = newContent;
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
}

function deleteNote(note) {
    const index = notes.indexOf(note);
    if (index !== -1) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
    }
}

function togglePin(note) {
    note.pinned = !note.pinned;
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

document.getElementById('add-note-btn').addEventListener('click', addNote);
searchInput.addEventListener('input', renderNotes);
renderNotes();