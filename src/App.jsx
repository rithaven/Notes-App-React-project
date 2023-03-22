import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"
import "./index.css";


export default function App() {
    const [notes, setNotes] = useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    );
    const [currentNoteId, setCurrentNoteId] = useState(
        (notes[0] && notes[0].id) || ""
    )
    
   useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
    }, [notes])
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => {
            const newArray = [];
            for(let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if(oldNote.id === currentNoteId) {
                    newArray.unshift({ ...oldNote, body: text });
                } else {
                    newArray.push(oldNote);
                }
            }
            return newArray
        })
    }

    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }
    
    function findCurrentNote() {
        return( notes.find(note => {
            return note.id === currentNoteId;
        }) || notes[0]
        );
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="flex"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&(
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                    )}
            </Split>
            :
            <div className="flex flex-col items-center w-full h-full bg-white ">
                <h1 className="p-4 text-4xl item-center mt-96">You have no notes</h1>
                <button 
                    className="w-64 p-4 text-2xl text-white border-none rounded-md cursor-pointer bg-slate-700" 
                    onClick={createNewNote} 
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    );
}
