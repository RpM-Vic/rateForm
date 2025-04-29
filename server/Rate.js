// oneUser.js
import { Schema, model } from 'mongoose';

const RateSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is mandatory"],
        trim: true  // Added to remove whitespace
    },
    email: {
        type: String,
        required: [true, "email is compulsory"],
        unique: true,  // Recommended for emails
        trim: true,
        lowercase: true,  // Normalize emails
        match: [/.+\@.+\..+/, 'Please fill a valid email address']  // Basic email validation
    },
    rate: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5']
    },
    comments: {  // You might want this based on your earlier code
        type: String,
        trim: true
    }
}, { 
    timestamps: true  // Adds createdAt and updatedAt automatically
});

// Fixed toJSON method - was referencing undefined 'usuario'
RateSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;  // Never send password back!
    delete obj.__v;       // Remove version key
    return obj;
};

export default model('Rate', RateSchema);