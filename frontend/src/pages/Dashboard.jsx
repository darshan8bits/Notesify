import { useEffect, useState } from "react";
import API from "../services/api";
import NoteCard from "../components/NoteCard";
import NoteForm from "../components/NoteForm";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    } else {
      fetchNotes();
    }
  }, []);

  const deleteNote = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <NoteForm
          fetchNotes={fetchNotes}
          editing={editing}
          setEditing={setEditing}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No notes yet. Start by adding one 🚀
            </p>
          ) : (
            notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                setEditing={setEditing}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}