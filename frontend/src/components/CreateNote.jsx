import { React, useState } from "react";
import api from "../api";
import "../styles/Form.css";
import "../styles/Note.css";

function CreateNote({ getNotes }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const clearForm = () => {
    setContent("");
    setTitle("");
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note Created");
        else alert("Failed to create note");
        clearForm();
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />

        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default CreateNote;
