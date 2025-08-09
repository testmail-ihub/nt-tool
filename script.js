,{
    event.preventDefault();
    const noteText = newNoteInput.value.trim();
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
            notesContainer.removeChild(noteElement);
        });
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);
        newNoteInput.value = '';
    }
});