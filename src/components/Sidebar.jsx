
import classNames from "classnames";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note) => {
    const noteStyle = classNames(
      "overflow-hidden w-full cursor-pointer flex justify-between items-center py-3 group",
      { "bg-slate-600": note.id === props.currentNote.id }
    );
    const noteTileStyle = classNames(
      "text-sm font-normal whitespace-nowrap overflow-hidden text-ellipsis leading-5 pl-2",
      { "text-white": note.id === props.currentNote.id },
      { "text-slate-600": note.id !== props.currentNote.id }
    );
    return (
      <div key={note.id}>
        <div
          className={noteStyle}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <h4 className={noteTileStyle}>{note.body.split("\n")[0]}</h4>
          {note.id === props.currentNote.id && (
            <button
              onClick={(event) => props.deleteNote(event, note.id)}
              className="invisible mr-4 text-red-700 border-none bg-none group-hover:visible"
            >
              <img className="h-6" src="/delete.svg" alt="" />
            </button>
          )}
        </div>
      </div>
    );
  });

  return (
    <section className="w-1/5 h-screen overflow-y-auto">
      <div className="static top-0 flex items-center justify-between px-3 py-3">
        <h3 className="text-2xl">Notes</h3>
        <button
          className="w-8 h-8 text-white border-none rounded cursor-pointer bg-slate-600"
          onClick={props.newNote}
        >
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
