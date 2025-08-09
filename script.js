document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const notesContainer = document.getElementById('notes-container');
    const addNoteButton = document.getElementById('addNoteButton');
    const noteColorPicker = document.getElementById('noteColorPicker');
    const noteTextInput = document.getElementById('noteText');

    const notes = [
        { id: 1, content: 'First note', color: '#ffffff' },
        { id: 2, content: 'Second note', color: '#ffffff' },
        { id: 3, content: 'Third note', color: '#ffffff' }
    ];

    const renderNotes = (filteredNotes) => {
        notesContainer.innerHTML = '';
        filteredNotes.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.textContent = note.content;
            noteDiv.style.backgroundColor = note.color;
            noteDiv.style.padding = '10px';
            noteDiv.style.margin = '5px';
            noteDiv.style.borderRadius = '5px';
            notesContainer.appendChild(noteDiv);
        });
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(searchTerm));
        renderNotes(filteredNotes);
    });

    addNoteButton.addEventListener('click', () => {
        const noteText = noteTextInput.value.trim();
        if (noteText) {
            const newNote = {
                id: notes.length + 1,
                content: noteText,
                color: noteColorPicker.value
            };
            notes.push(newNote);
            renderNotes(notes);
            noteTextInput.value = ''; // Clear the input field after adding the note
        } else {
            alert('Please enter a note before adding.');
        }
    });

    renderNotes(notes);
});