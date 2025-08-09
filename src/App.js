import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import Header from './components/Header';
import './styles/index.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const editNote = (id, updatedNote) => {
    setNotes(notes.map(note => (note.id === id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    note.content.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="app">
      <Header setSearchInput={setSearchInput} />
      <NoteEditor addNote={addNote} />
      <NoteList 
        notes={filteredNotes} 
        editNote={editNote} 
        deleteNote={deleteNote} 
      />
    </div>
  );
};

export default App;