import mongoose from 'mongoose';

const regSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Registration', regSchema);