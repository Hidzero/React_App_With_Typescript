import mongoose from 'mongoose';

export default async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Banco conectado com sucesso!");
    } catch (error) {
        console.log("Error: ", e.message);
    }
}

