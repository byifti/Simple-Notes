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
   loadData();

   for(let note of allNotes)
   {
      renderNoteInFileManager(note)
   }

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
   let noteTitle; 
   let noteContent; 
   
   let newNote = new Note(timestamp, noteTitle, noteContent)
   allNotes.push(newNote)
   activeNoteID = timestamp;

   realtimeUpdate(noteHeader, noteBody)

   console.log("This is the new created note:", newNote)
   saveData(allNotes)
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
      saveData(allNotes)
      //console.log(activeNote.noteTitle)
      // console.log(allNotes)
   }

   sourceOfInput2.addEventListener(`input`, updateContent)
   function updateContent(event)
   {
      activeNote.noteContent = event.target.value;
      saveData(allNotes)
   }
   
}

function renderNoteInFileManager(noteObject)
{
   let noteFileBody = document.createElement(`div`)
   noteFileBody.classList.add(`noteFile`)
   
   let noteTitle = document.createElement(`span`)
   noteTitle.textContent = noteObject.noteTitle;

   noteFileBody.append(noteTitle)
   filesLayout.append(noteFileBody)

}


function saveData(arrayOfNotesObject)
{
   let dataString = JSON.stringify(arrayOfNotesObject)
   localStorage.setItem(`Notes`, `${dataString}`)
}

function loadData()
{
   let dataString = localStorage.getItem(`Notes`) 

   if(dataString === null) // Without this, if localStorage is empty, the dataString returns NULL which makes the array NULL then u cant add stuff to array which breaks the code cuz u need empty array not NULL (which is not an array) 
   {
      return
   }
   else
   {
      allNotes = JSON.parse(dataString)
   }

}