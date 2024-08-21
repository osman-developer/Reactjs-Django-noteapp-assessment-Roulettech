import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import NavBar from "../components/NavBar";
import "../styles/Note.css";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data), console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNoteFromState = (noteId) => {
    const index = notes.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      const newArrayNotes = [
        ...notes.slice(0, index),
        ...notes.slice(index + 1),
      ];
      setNotes(newArrayNotes);
    }
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note Deleted.");
        else alert("Failed to delete");
        deleteNoteFromState(id);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <NavBar />
      <CreateNote getNotes={getNotes} />
      <div>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
