import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: String, 
    number: Number,
    email: String
   
}, {
    timestamps: true,
    collection: 'contacts'
});

export default mongoose.model('Contacts', MovieSchema);