// On DOM manipulation
const titleinput = document.getElementById('title');
const description = document.getElementById('description');
const AddBtn = document.getElementById('AddBtn');
const Ncontainer = document.getElementById('noteContainer');

// On loading from localstorage
function getNotes() {
    const notes =  localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// On saving to loacalstorage
function saveNote(notes){
    localStorage.setItem('notes', JSON.stringify(notes));
}

// On adding notes
AddBtn.addEventListener('click', function(e){
    e.preventDefault();
    const title = titleinput.value.trim();
    const content = description.value.trim();
    if (title === '' || content === ''){
        alert('Fill both title and description')
        return;
    }

    const newNote = { title, content };
    const notes = getNotes();
    notes.push(newNote);
    saveNote(notes);

    titleinput.value = '';
    description.value = '';

    renderNotes();
});

// On rendering notes
function renderNotes(){
    Ncontainer.innerHTML = "";
    const notes = getNotes();

    notes.forEach((note, index) =>{
        const notediv = document.createElement('div');
        notediv.className = "note";

        const noteTitle = document.createElement('h2');
        noteTitle.textContent = note.title;

        const noteContent = document.createElement('p');
        noteContent.textContent = note.content;

        const delBtn =  document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.addEventListener('click', () => 
        {console.log("Deleting note at index:", index);
            deleteNote(index)});

        notediv.appendChild(noteTitle);
        notediv.appendChild(noteContent);
        notediv.appendChild(delBtn);

        Ncontainer.appendChild(notediv);
    });
}

// On deleting note
function deleteNote(index){
    const notes = getNotes();
    notes.splice(index, 1);
    saveNote(notes);
    renderNotes();
}

// On calling the render note
renderNotes();