document.getElementById('add-note').addEventListener('click', function() {
    const notesContainer = document.getElementById('notes-container');
    const noteInput = prompt('Enter your note:');
    if (noteInput) {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.textContent = noteInput;
        notesContainer.appendChild(noteCard);
    }
});