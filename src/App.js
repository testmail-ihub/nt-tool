import React, { useState, useEffect } from 'react';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [editing, setEditing] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', text: '', color: '', pinned: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    setNotes(prevNotes => [...prevNotes, newNote]);
    setNewNote({ title: '', text: '', color: '', pinned: false });
  };

  const handleEditNote = (note) => {
    setEditing(note);
    setNewNote(note);
  };

  const handleSaveEdit = () => {
    setNotes(prevNotes => prevNotes.map(note => note.id === newNote.id ? newNote : note));
    setEditing(null);
    setNewNote({ title: '', text: '', color: '', pinned: false });
  };

  const handleDeleteNote = (id) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const handlePinNote = (id) => {
    setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, pinned: !note.pinned } : note));
  };

  const handleColorChange = (color) => {
    setNewNote(prevNote => ({ ...prevNote, color }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const filteredNotes = notes.filter(note => {
    if (filter === 'pinned') return note.pinned;
    if (filter === 'unpinned') return !note.pinned;
    return true;
  }).filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.text.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="App">
      <header>
        <h1>Note Taking App</h1>
        <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      </header>
      <main>
        <div className="note-form">
          {editing ? (
            <NoteForm
              note={newNote}
              onSave={handleSaveEdit}
              onColorChange={handleColorChange}
            />
          ) : (
            <NoteForm
              note={newNote}
              onSave={handleAddNote}
              onColorChange={handleColorChange}
            />
          )}
        </div>
        <div className="note-grid">
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDeleteNote}
              onEdit={handleEditNote}
              onPin={handlePinNote}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;