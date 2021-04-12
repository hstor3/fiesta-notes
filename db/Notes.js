const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const uniqid = require('uniqid');

class Notes {
    read() {
        return readFile('db/db.json', 'utf8')
    }
    write(notes) {
        return writeFile('db/db.json', JSON.stringify(notes))
    }
    getNotes() {
        return this.read().then(rawNotes => {
            let parseNotes = [];
            try {
                parseNotes = parseNotes.concat(JSON.parse(rawNotes))
            } catch (error) {
                parseNotes = [];
            }
            return parseNotes
        }) 
    }
    addNotes(note) {
        return this.getNotes().then(notes => {
            note['id'] = uniqid();
            notes.push(note)
            return this.write(notes)
        })
    }

    deleteNotes(notes) {
        console.log(notes)
        return this.getNotes().then(notes => {
            note['id'] = uniqid();
            notes.splice(notes);
            return this.write(notes)
        });
    }
}

module.exports = new Notes();