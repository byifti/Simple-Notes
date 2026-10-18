let noteHeader = document.getElementById("noteHeader")
let noteBody = document.getElementById("noteBody")
let addNote = document.getElementById("addNote")
let filesLayout = document.getElementById("filesLayout")
let contextMenu = document.getElementById("contextMenu")
let deleteBtn = document.getElementById("deleteBtn")
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
   noteBody.style.display = "none" // Default states
   loadData();

   for(let note of allNotes)
   {
      renderNoteInFileManager(note)
      realtimeUpdate(noteHeader, noteBody)
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
   renderNoteInFileManager(activeNote)
//   console.log("This is the new created note:", newNote)
   saveData(allNotes)
//   console.log(allNotes)
//   console.log(activeNoteID)

}

function realtimeUpdate(sourceOfTitle, sourceOfContent)
{

   activeNote = allNotes.find(function(noteObject)
   {
      return noteObject.timestamp === activeNoteID // IMPROVEMENT TO MAKE: CHANGE NAME FROM TIMESTAMP → noteID
   }); // This returns the latest Note object

   // console.log("This is the active note:", activeNote)

   sourceOfTitle.addEventListener(`input`, updateTitle)
   function updateTitle(event)
   {
      activeNote.noteTitle = event.target.value;
      saveData(allNotes)
      // console.log(activeNote.noteTitle)
      // console.log(allNotes)
   }

   sourceOfContent.addEventListener(`input`, updateContent)
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

   noteFileBody.addEventListener(`contextmenu`, function(event)
   {
      event.preventDefault()

      contextMenu.style.top = `${event.clientY}px`
      contextMenu.style.left = `${event.clientX}px` // Event Object theke mouse er X position nitasi

      contextMenu.showPopover()
   })

   noteFileBody.addEventListener(`click`, function()
   {
      activeNote = noteObject // Updates active note when clicked. Made typo of doing noteObject.timestamp before
      console.log("This changed active note to:", activeNote)
      renderNote()
   })

   noteHeader.addEventListener(`input`, updateNoteTitleInFileManager)

   function updateNoteTitleInFileManager()
   {
      noteTitle.textContent = noteObject.noteTitle;
   }
}

function renderNote()
{
   noteHeader.style.display = "block"
   noteBody.style.display = "block"
   noteHeader.focus() 

   noteHeader.value = activeNote.noteTitle
   noteBody.value = activeNote.noteContent 
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

