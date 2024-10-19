import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";
import { dummyNotesList } from "./constant";
import userEvent from "@testing-library/user-event";
import exp from "constants";

describe("Create StickyNote", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);

    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);

    // Please make sure your sticky note has a title and content input field with the following placeholders.
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea =
      screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });
});

describe("Read StickyNote", () => {
  test("renders default page content", () => {
    render(<StickyNotes />);

    dummyNotesList.forEach((note) => {
      const titleElement = screen.getByText(note.title);
      const element = screen.getByText(note.content);
      expect(element).toBeInTheDocument();
    });
  });
});

describe("Update StickyNote", () => {
  test("updates a note", () => {
    render(<StickyNotes />);

    const noteToUpdate = dummyNotesList[0];

    const noteTitle = screen.getByText(noteToUpdate.title);
    fireEvent.input(noteTitle, { target: { textContent: "Updated Title" } });

    const noteContent = screen.getByText(noteToUpdate.content);
    fireEvent.input(noteContent, {
      target: { textContent: "Updated Content" },
    });

    fireEvent.blur(noteContent);

    const updatedNoteTitle = screen.getByText("Updated Title");
    const updatedNoteContent = screen.getByText("Updated Content");
    expect(updatedNoteTitle).toBeInTheDocument();
    expect(updatedNoteContent).toBeInTheDocument();
  });
});

describe("Delete StickyNote", () => {
  test("deletes a note", () => {
    render(<StickyNotes />);

    const noteToDelete = dummyNotesList[0];
    const deleteButton = screen.getByTestId(`delete-button-${noteToDelete.id}`);

    fireEvent.click(deleteButton);

    const deletedNoteTitle = screen.queryByText(noteToDelete.title);
    expect(deletedNoteTitle).not.toBeInTheDocument();
  });
});

describe("Deleting the Last Note", () => {
  test("deletes the last remaining note", () => {
    render(<StickyNotes />);

    const initialNote = screen.getAllByTestId(/delete-button-/i);
    expect(initialNote.length).toBeGreaterThan(0);

    initialNote.forEach((noteButton) => {
      fireEvent.click(noteButton);
    });

    const remainingNotes = screen.queryAllByTestId(/delete-button-/i);
    expect(remainingNotes.length).toBe(0);

    const noNotesMessage = screen.queryByText("No Notes");
    if (noNotesMessage) {
      expect(noNotesMessage).toBeInTheDocument();
    }
  });
});

describe("Like sticky note then update", () => {
  test("like a note", async () => {
    render(<StickyNotes />);

    const noteToLike = dummyNotesList[0];
    const likeButton = screen.getByTestId(`like-button-${noteToLike.id}`);
    expect(likeButton.textContent).toBe("♡");
    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(likeButton.textContent).toBe("❤️");
    });
    const listItems = screen.getAllByRole('listitem');
    const textFoundInList = listItems.some(item => item.textContent === noteToLike.title);
    expect(textFoundInList).toBe(true);


    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(likeButton.textContent).toBe("♡");
    });

    fireEvent.click(likeButton);
    await waitFor(() => {
      expect(likeButton.textContent).toBe("❤️");
    });
    

  });
});