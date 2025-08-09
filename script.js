document.getElementById('add-note').addEventListener('click', (event) => {
    event.preventDefault();
    const noteText = document.getElementById('new-note-input').value.trim();
    if (noteText !== '') {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');

        const noteContent = document.createElement('span');
        noteContent.innerText = noteText;
        noteElement.appendChild(noteContent);

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => {
            const newText = prompt('Edit your note:', noteContent.innerText);
            if (newText !== null) {
                noteContent.innerText = newText.trim();
            }
        });
        noteElement.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
            document.getElementById('notes-container').removeChild(noteElement);
        });
        noteElement.appendChild(deleteButton);

        document.getElementById('notes-container').appendChild(noteElement);
        document.getElementById('new-note-input').value = '';
    }
});