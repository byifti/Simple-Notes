let noteHeader = document.getElementById("noteHeader")
let noteBody = document.getElementById("noteBody")
let addNote = document.getElementById("addNote")

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

}
