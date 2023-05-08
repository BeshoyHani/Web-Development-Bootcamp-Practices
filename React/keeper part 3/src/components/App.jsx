import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  const addNote = (title, content) => {
    const note = {
      title: title,
      content: content
    }
    setNotes([...notes, note]);
  }

  const deleteNote = (noteIndex) => {
    setNotes(notes.filter((note, index) => index !== noteIndex));
  }
  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {
        notes.map(({title, content}, index) => <Note key={index} id={index} title={title} content={content} deleteNote={deleteNote} />)
      }
      <Footer />
    </div>
  );
}

export default App;
