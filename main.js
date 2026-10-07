let noteHeader = document.getElementById("noteHeader")
let noteBody = document.getElementById("noteBody")
let addNote = document.getElementById("addNote")
let filesLayout = document.getElementById("filesLayout")
let allNotes = [];
let activeNoteID;
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
   allNotes.push(newNote)
   activeNoteID = timestamp;

   realtimeUpdate(noteHeader, noteBody)

   console.log("This is the new created note:", newNote)
//   console.log(allNotes)
//   console.log(activeNoteID)

}

function realtimeUpdate(sourceOfInput, sourceOfInput2)
{

   activeNote = allNotes.find(function(noteObject)
   {
      return noteObject.timestamp === activeNoteID
   }); // This returns the latest Note object

   console.log("This is the active note:", activeNote)

   sourceOfInput.addEventListener(`input`, updateTitle)
   function updateTitle(event)
   {
      activeNote.noteTitle = event.target.value;
      //console.log(activeNote.noteTitle)
      // console.log(allNotes)
   }

   sourceOfInput2.addEventListener(`input`, updateContent)
   function updateContent(event)
   {
      activeNote.noteContent = event.target.value;
   } // Here I am updating the latest note object only BUT for some reason older ones get updated too
   // Speculation: Older one er khetre or ID tai latest chilo so thats active but when new one gets created, that one becomes latest and that one
   // becomes active, so in that sense, all of them are "activeNote" locally so it changes for all of them
   // This makes sense too because the older object notes' title gets updated when I press something inside the noteHeader which means when the
   // eventListener gets triggered, it gets triggered for both older note (because in its context, its the activeNote) and the actual activeNote
   // So both get updated instead of the real activeNote. Fucking hell, I was genuinely getting titled over ts
   // Fix: Just moved the activeNote object globally instead of locally and reassinged value on update. Idek why I made it local, that was dumb

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