function NoteCard({ note, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer glass`}
      style={{ backgroundColor: note.color || "#ffffff22" }}
    >
      <h3 className="font-bold">{note.title}</h3>
      <p className="text-sm mt-2">{note.content}</p>
    </div>
  );
}

export default NoteCard;