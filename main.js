let noteHeader = document.getElementById("noteHeader")
let noteBody = document.getElementById("noteBody")
let addNote = document.getElementById("addNote")
let filesLayout = document.getElementById("filesLayout")
let allNotes = [];
let activeNote;

class Note
{
   constructor(timestamp, noteTitle, noteContent)
   {
      this.timestamp = timestamp,
      this.noteTitle = noteTitle,
      this.noteContent = noteContent
   }
}

window.addEventListener("DOMContentLoaded", function()
{
   noteHeader.style.display = "none"
   noteBody.style.display = "none"
})

noteHeader.addEventListener("keydown", function(event)
{
   if(event.key === "Enter")
   {
      event.preventDefault()
      noteBody.focus()
   }
})


addNote.addEventListener("click", createNote)

function createNote()
{
   noteHeader.style.display = "block"
   noteBody.style.display = "block"
   noteHeader.focus() 
   noteHeader.value = "Untitled" 
   noteBody.value = "" // Default values and states

   let timestamp = Date.now()
   let noteTitle; // Need this to be updated live
   let noteContent; // Need this to be updated live
   
   let newNote = new Note(timestamp, noteTitle, noteContent)

   realtimeUpdate(noteHeader, noteBody, newNote)

   console.log(newNote)
   console.log(allNotes)

   allNotes.push(newNote)

   activeNote = timestamp;
   console.log(activeNote)

}

function realtimeUpdate(sourceOfInput, sourceOfInput2, sourceOfOutput)
{
   sourceOfInput.addEventListener(`input`, updateTitle)
   function updateTitle(event)
   {
      sourceOfOutput.noteTitle = event.target.value;
      console.log(sourceOfOutput)
   }

   sourceOfInput2.addEventListener(`input`, updateContent)
   function updateContent(event)
   {
      sourceOfOutput.noteContent = event.target.value;
   }

}

function renderNoteInFileManager()
{
   let noteFileBody = document.createElement(`div`)
   noteFileBody.classList.add(`noteFile`)
   
   let noteTitle = document.createElement(`span`)
   noteTitle.textContent = noteHeader.value;

   noteFileBody.append(noteTitle)
   filesLayout.append(noteFileBody)

}


/* 

CURRENT BUGS:
- Updating updates all of the notes. I just want it to update specific or latest one. It needs to know 
inside which note / state its in

Note object -> Main source of truth
|- timestamp = Unique identifier, gives each note own identity
|- noteTitle = Header, file title
|- noteContent = The note body, written things inside the note

*/