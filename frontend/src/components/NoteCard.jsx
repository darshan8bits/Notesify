export default function NoteCard({ note, deleteNote, setEditing }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition duration-300 border">
      <h3 className="text-lg font-semibold text-gray-800">
        {note.title}
      </h3>

      <p className="text-gray-600 mt-2 line-clamp-3">
        {note.content}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-400">
          {new Date(note.created_at).toLocaleDateString()}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => setEditing(note)}
            className="text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
          >
            Edit
          </button>

          <button
            onClick={() => deleteNote(note.id)}
            className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}