import '../ui/css/Notes.css';
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

interface Note {
    _id?: string;
    description: string;
    completed?: boolean;
}

const App: React.FC = () => {
    const [Notes, setNotes] = useState<Note[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editText, setEditText] = useState<string>('');

    useEffect(() => {
        getNotes();
    }, []);
    
    const createNote = async () => {
        const data: Note = {
            description: inputValue
        };
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/note`;
        await axios.post(baseUrl, data)
        .then(response => {
            setNotes([...Notes, { ...data, _id: response.data._id }]);
            getNotes();
        }).catch(error => {
            console.log(error);
        });
    }

    const getNotes = async () => {
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/note`;
        await axios.get(baseUrl)
        .then(response => {
            setNotes(response.data);
        }).catch(error => {
            console.log(error);
        });
    }
    
    const deleteNoteFromDB = async (noteData: Note, index: number) => {
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/note/${noteData._id}`;
        await axios.delete(baseUrl)
        .then(() => {
            const updatedNotes = Notes.filter((_, idx) => idx !== index);
            setNotes(updatedNotes);
            getNotes();
        }).catch(error => {
            console.log(error);
        });
    }    

    const addNote = () => {
        if (inputValue.trim() !== '') {
            const newNote: Note = {
                description: inputValue
            };
            setNotes([...Notes, newNote]);
            createNote();
            setInputValue('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNote();
        }
    }
    
    const startEditing = (Note: Note, index: number) => {
        setEditingIndex(index);
        setEditText(Note.description);
    }

    const saveEdit = async (Note: Note, index: number) => {
        const updatedNote: Note = { ...Note, description: editText };
        const baseUrl = `http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/note/${Note._id}`;
        try {
            await axios.put(baseUrl, updatedNote);
            const updatedNotes = Notes.map((t, idx) => idx === index ? updatedNote : t);
            setNotes(updatedNotes);
            setEditingIndex(null);
            setEditText('');
            getNotes();
        } catch (error) {
            console.error("Erro ao salvar as edições:", error);
        }
    }
    
    return (
        <div className="app-notes">
            <div className='header'>
                <FontAwesomeIcon icon={faClipboardCheck} className='clipboard-icon' />
                <div className='title'>Notes</div>
            </div>
            <div className="input-group">
                <TextField 
                    id="outlined-basic" 
                    label="Digite sua nova nota..." 
                    variant="outlined" 
                    value={inputValue}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} />
                <Button onClick={addNote}>Add</Button>
            </div>
            <div className="Note-list">
                {Notes.map((Note, index) => (
                    <div key={index} className={`Note ${Note.completed ? 'completed' : ''}`}>
                        {editingIndex === index ? (
                            <input
                                className="input-edit"
                                value={editText}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
                                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && saveEdit(Note, index)}
                            />
                        ) : (
                            <span className='text-description' onClick={() => startEditing(Note, index)}>
                                {Note.description}
                            </span>
                        )}
                        <FontAwesomeIcon icon={faTrash} id='trash-icon' style={{ cursor: 'pointer' }} onClick={() => deleteNoteFromDB(Note, index)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;

