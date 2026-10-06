let noteHeader = document.getElementById("noteHeader")
let noteBody = document.getElementById("noteBody")
let addNote = document.getElementById("addNote")
let filesLayout = document.getElementById("filesLayout")


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
   noteBody.value = ""

/*   noteHeader.focus()
   if(noteHeader.value == false)
   {
      noteHeader.value = "Untitled"
   }
   else
   {
      noteBody.focus()
   } 
*/
   renderNoteInFileManager()

}

function renderNoteInFileManager()
{
   let noteFileBody = document.createElement(`div`)
   noteFileBody.classList.add(`noteFile`)
   
   let noteTitle = document.createElement(`span`)
   noteTitle.textContent = noteHeader.value;

   noteFileBody.append(noteTitle)
   filesLayout.append(noteFileBody)

   noteHeader.addEventListener(`input`, function(event) // realtimeUpdate(event), might create it as separate function to use for autosaving as well
   {
      noteTitle.textContent = event.target.value;
      console.log("Just set title to: ", event.target.value);
   })

}


