import { Schema, model, Document } from 'mongoose';

const validateEmail = function(email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const PersonSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    company: { 
        name: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
    },
});

export interface IPerson extends Document {
    _id?: String,
    name: String,
    username: String,
    email: String,
    company: {
        name: String,
        position: String
    }
};

export default model<IPerson>('Person', PersonSchema);