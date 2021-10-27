const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: { type: String, minlength: 3, maxlength: 200 },
    post: {type: String,  minlength: 3, maxlength: 200},
    photo: {type: String,  minlength: 3, maxlength: 200},
    companyName: {type: String,  minlength: 3, maxlength: 200},
    description: {type: String,  minlength: 3, maxlength: 200},
    active: {type: Boolean, default: '1', enum: ['1', '0']},
    createdOn: { type: Date, default: new Date() },
    lastUpdatedOn: { type: Date, default: new Date() }
})

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

exports.Testimonial = Testimonial;