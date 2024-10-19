import "./App.css";
import { dummyNotesList } from "./constant";
import React, { useState } from "react";
import { ClickLikeButton, LikedNotes } from "./likes";
import { ThemeProvider } from "./ThemeContext";
import { ToggleButton } from "./ToggleButton";
import { Label, Note } from "./types";

export const StickyNotes = () => {
  const [notes, setNotes] = useState(dummyNotesList);
  const [likedNotes, setLikedNotes] = useState<Note[]>([]); // Move likedNotes state here
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([createNote, ...notes]);
    setCreateNote(initialNote);
  };
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  return (
    <div className="body">
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <label htmlFor="note-title">Note Title</label>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })
            }
            required
          ></input>
        </div>

        <div>
          <label htmlFor="note-content">Note Content</label>
          <textarea
            placeholder="Note Content"
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })
            }
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="note-label">Note Label</label>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({
                ...createNote,
                label: event.target.value as Label,
              })
            }
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>

        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>

      <div className="app-container">
        <div className="notes-grid">
          {notes.length === 0 ? (
            <h1>No Notes</h1>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-item">
                <div className="notes-header">
                  <ClickLikeButton
                    item={note}
                    likedNotes={likedNotes}
                    setLikedNotes={setLikedNotes}
                  />
                  <button
                    data-testid={`delete-button-${note.id}`}
                    onClick={() => {
                      setNotes(notes.filter((n) => n.id !== note.id));
                      setLikedNotes(likedNotes.filter((n) => n.id !== note.id));
                    }}
                  >
                    x
                  </button>
                </div>
                <h2
                  contentEditable="true"
                  onBlur={(event) => {
                    const updatedNote = {
                      ...note,
                      title: event.target.innerText,
                    };
                    setSelectedNote(updatedNote);
                    setNotes(
                      notes.map((n) => (n.id === note.id ? updatedNote : n))
                    );
                  }}
                >
                  {note.title}
                </h2>
                <p contentEditable="true"> {note.content} </p>
                <p contentEditable="true"> {note.label} </p>
              </div>
            ))
          )}
        </div>
        <div className="toggle">
          <ThemeProvider>
            <div className="app">
              <h1>Theme Toggle</h1>
              <ToggleButton />
            </div>
          </ThemeProvider>
        </div>
        <div className="liked-grid">
          <h1>Liked Notes</h1>
          <LikedNotes likedNotes={likedNotes} /> {/* Pass likedNotes */}
        </div>
      </div>
    </div>
  );
};
