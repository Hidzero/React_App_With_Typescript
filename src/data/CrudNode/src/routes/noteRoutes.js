import express from 'express';
const router = express.Router();
import * as noteController from '../controllers/noteController.js';

router.get('/', noteController.getAllNotes);
router.post('/', noteController.createNote);
router.get('/:id', noteController.getById);
router.put('/:id', noteController.updateNote); 
router.delete('/:id', noteController.deleteNote); 

export default router;

