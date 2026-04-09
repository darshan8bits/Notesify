import { useState, useEffect } from "react";
import API from "../services/api";

export default function NoteForm({ fetchNotes, editing, setEditing }) {
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        content: editing.content,
      });
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await API.put(`/notes/${editing.id}`, form);
      setEditing(null);
    } else {
      await API.post("/notes", form);
    }

    setForm({ title: "", content: "" });
    fetchNotes();
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          placeholder="Title"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Write your note..."
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          {editing ? "Update Note" : "Add Note"}
        </button>
      </form>
    </div>
  );
}