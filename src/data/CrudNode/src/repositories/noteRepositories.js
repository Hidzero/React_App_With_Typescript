import Note from '../models/Note.js';

class NoteRepository {
    async create(noteData){
        const note = new Task(noteData);
        await note.save();
        return note;
    }
    async findAll(){
        return Note.find();
    }
    async findById(id) {
        return Note.findById(id);
    }
    async update(id, updateData) {
        return Note.findOneAndUpdate({ _id: id }, updateData, { new: true });
    }
   
    async delete(noteData) {
        return Note.findByIdAndDelete(noteData)
    }
}

const noteRepositories = new NoteRepository();
export default noteRepositories;