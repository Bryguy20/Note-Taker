// all the dependecnies and the uuid download
const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); 

// Promisify that is the callback much easy for the readNote and writeNote and return backs here just like a promise 
const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);


class Save {
     write(note) {
         return writeNote('db/db.json', JSON.stringify(note));
     }

      read(){
            return readNote('db/db.json', 'utf8');
     }


     retrieveNotes() {
         return this.read().then(notes => {
             let parsedNotes;
             try {

                parsedNotes = [].concat(JSON.parse(notes)); 
             } catch (err) {
                 parsedNotes = [];
             }
            return parsedNotes;
         });

     }
      //function for he notes with the UUID pacage to add unique IDS
     addNote(note) {
         const { title, text} = note;
         if(!title || !text) {
             throw new Error('Both title and text can not be blank');
         }

         const newNote = { title, text, id: uuidv4() };
         // Retreve Notes, add the new note, update notes 
         return this.retrieveNotes()
           .then(notes => [...notes, newNote])
           .then(updatedNotes => this.write(updatedNotes))
           .then(() => newNote);
     }

      // To Delte function -BONUS
      deleteNote(id) {
          return this.retrieveNotes()
          .then(notes => notes.filter(note => note.id !== id))
          .then(filteredNotes => this.write(filteredNotes));
      }
}

module.exports = new Save();