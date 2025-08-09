document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const notesContainer = document.getElementById('notes-container');

    const notes = [
        { id: 1, content: 'First note' },
        { id: 2, content: 'Second note' },
        { id: 3, content: 'Third note' }
    ];

    const renderNotes = (filteredNotes) => {
        notesContainer.innerHTML = '';
        filteredNotes.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.textContent = note.content;
            notesContainer.appendChild(noteDiv);
        });
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredNotes = notes.filter(note => note.content.toLowerCase().includes(searchTerm));
        renderNotes(filteredNotes);
    });

    renderNotes(notes);
});