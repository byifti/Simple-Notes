let noteHeader = document.getElementById("noteHeader")
let noteBody = document.getElementById("noteBody")

window.addEventListener("DOMContentLoaded", function()
{
   noteHeader.focus()
   if(noteHeader.value == false)
   {
      noteHeader.value = "Untitled"
   }
   else
   {
      noteBody.focus()
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


