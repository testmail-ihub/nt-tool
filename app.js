,{ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Data storage (in-memory for simplicity, consider using a database in production)
let notes = [];

// Load notes from file on startup
if (fs.existsSync('notes.json')) {
  notes = JSON.parse(fs.readFileSync('notes.json', 'utf8'));
}

// Save notes to file on exit
process.on('exit', () => {
  fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2), 'utf8');
});

// API endpoints

// Get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Add a new note
app.post('/notes', (req, res) => {
  const { title, content, tags } = req.body;
  const newNote = { id: notes.length + 1, title, content, tags, createdAt: new Date() };
  notes.push(newNote);
  res.json(newNote);
});

// Edit a note
app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, tags } = req.body;
  const note = notes.find(note => note.id === id);
  if (note) {
    note.title = title || note.title;
    note.content = content || note.content;
    note.tags = tags || note.tags;
    note.updatedAt = new Date();
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    res.json({ message: 'Note deleted' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});