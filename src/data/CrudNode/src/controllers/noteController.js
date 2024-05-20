import noteRepositories from '../repositories/noteRepositories.js';
import noteSchema from '../models/Note.js';

export async function createNote (req, res) {
    try {
        const newNote = new noteSchema(req.body);
        const savedNote = await newNote.save();

        res.status(201).json({
            statusCode: 201,
            message: "Anotação criada com sucesso!",
            data: {
                savedNote
            }
        })

    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

export async function getAllNotes(req, res) {
    try{
        const notes = await noteRepositories.findAll();
        res.status(200).json(notes);
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}

export async function getById(req, res) {
    try {
        const note = await noteRepositories.findById(req.params.id);
        res.status(200).json(note);
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}

export async function updateNote(req, res) {
    try {
        const note = await noteRepositories.update(req.params.id, req.body);
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



export async function deleteNote(req, res){
    try {
        const deleteNote = await noteRepositories.delete(req.params.id);
        res.status(200).json({message: "Anotação deletada com sucesso"});
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
}