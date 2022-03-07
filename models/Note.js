const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be 40 characters']
    },
    description : {
        type: String,
        required:true,
        maxlength: [200, 'Description cannot be 200 characters']
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema);