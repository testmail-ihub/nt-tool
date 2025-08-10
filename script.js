const noteColors = ["yellow", "green", "blue", "pink"];

function saveNotesToLocalStorage(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
}

function createNoteElement(note) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.dataset.id = note.id;

    const noteFront = document.createElement("div");
    noteFront.classList.add("note-front");
    noteFront.style.backgroundColor = note.color;

    const noteTitle = document.createElement("h3");
    noteTitle.contentEditable = true;
    noteTitle.classList.add("note-title");
    noteTitle.innerText = note.title;

    const noteContent = document.createElement("p");
    noteContent.contentEditable = true;
    noteContent.classList.add("note-content");
    noteContent.innerText = note.content;

    noteFront.appendChild(noteTitle);
    noteFront.appendChild(noteContent);

    const noteActions = document.createElement("div");
    noteActions.classList.add("note-actions");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-note-btn");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    const pinButton = document.createElement("button");
    pinButton.classList.add("pin-note-btn");
    pinButton.innerHTML = '<i class="fas fa-thumbtack"></i>';

    noteActions.appendChild(deleteButton);
    noteActions.appendChild(pinButton);

    noteElement.appendChild(noteFront);
    noteElement.appendChild(noteActions);

    noteElement.addEventListener("input", () => {
        note.title = noteTitle.innerText;
        note.content = noteContent.innerText;
        saveNotesToLocalStorage([...notesList]);
    });

    deleteButton.addEventListener("click", () => {
        notesList = notesList.filter((n) => n.id !== note.id);
        saveNotesToLocalStorage([...notesList]);
        noteElement.remove();
    });

    pinButton.addEventListener("click", () => {
        note.pinned = !note.pinned;
        renderNotes();
    });

    return noteElement;
}

function renderNotes() {
    const pinnedNotesSection = document.querySelector(".pinned-notes");
    const allNotesSection = document.querySelector(".all-notes");
    const searchInput = document.querySelector(".search-input");
    const searchValue = searchInput.value.toLowerCase();

    pinnedNotesSection.innerHTML = "";
    allNotesSection.innerHTML = "";

    notesList.forEach((note) => {
        const noteElement = createNoteElement(note);

        if (note.pinned && (searchValue === "" || note.title.toLowerCase().includes(searchValue) || note.content.toLowerCase().includes(searchValue))) {
            pinnedNotesSection.appendChild(noteElement);
        } else if (!note.pinned && (searchValue === "" || note.title.toLowerCase().includes(searchValue) || note.content.toLowerCase().includes(searchValue))) {
            allNotesSection.appendChild(noteElement);
        }
    });
}

function createNewNote() {
    const selectedColor = document.querySelector(".color-label.selected")?.classList[1] || noteColors[0];
    const newNote = {
        id: Date.now(),
        title: "",
        content: "",
        color: selectedColor,
        pinned: false,
    };

    notesList.push(newNote);
    saveNotesToLocalStorage([...notesList]);
    renderNotes();
    document.querySelectorAll(".note-front")[document.querySelectorAll(".note-front").length - 1].children[0].focus();
}

document.querySelector(".add-note-btn").addEventListener("click", createNewNote);

const notesList = loadNotesFromLocalStorage();
renderNotes();

document.querySelector(".search-input").addEventListener("input", renderNotes);

noteColors.forEach((color) => {
    const colorSection = document.querySelector(`.${color}-notes`);
    colorSection.addEventListener("click", () => {
        const filteredNotes = notesList.filter((note) => note.color === color);
        const notesContainer = document.querySelector(".notes-container");
        notesContainer.innerHTML = "";
        filteredNotes.forEach((note) => {
            const noteElement = createNoteElement(note);
            notesContainer.appendChild(noteElement);
        });
    });
});

document.querySelector(".all-notes-btn").addEventListener("click", () => {
    const notesContainer = document.querySelector(".notes-container");
    notesContainer.innerHTML = "";
    renderNotes();
});