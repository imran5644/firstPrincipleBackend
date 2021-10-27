const { Testimonial } = require("../models/Testimonial");
const express = require("express");
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })

// const upload = multer({ storage: storage })
  var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './public/uploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname);   
    }
 });
  
 const upload = multer({
    storage: storage,
    limits : {fileSize : 1000000}
});

function fileFilter (req, file, cb) {    
    // Allowed ext
     const filetypes = /jpeg|jpg|png|gif/;
  
   // Check ext
    const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
   // Check mime
   const mimetype = filetypes.test(file.mimetype);
  
   if(mimetype && extname){
       return cb(null,true);
   } else {
       cb('Error: Images Only!');
   }
  }

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const testimonials = await Testimonial.find()
        .sort({ createdOn: -1 })
        res.send(testimonials);
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
        }
});

router.post("/", upload.single('photo'), async (req, res) => {
// const { name, post, companyName, description, createdOn } = req.body;

// console.log(req.body);
// const { photo } = req.file.originalname;
// console.log(req.file.originalname);

let testimonial = new Testimonial({
    name: req.body.name,
    post: req.body.post,
    companyName: req.body.companyName,
    photo: req.file.originalname,
    description: req.body.description,
    createdOn: req.body.createdOn,
});
// console.log(3333);
// console.log(testimonial);
try {
    testimonial = await testimonial.save();
    // console.log(66666);
    // console.log(testimonial);
    res.send(testimonial);
}
    catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
    }
});

router.put("/:id", upload.single('photo'), async(req, res) => {
const now = new Date(); 
try {
// const { name, post, photo, companyName, description } = req.body;
// console.log(1111);

// console.log(req.body);
console.log(req.params.id);
const UpdatedTestimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    {
        name: req.body.name,
        post: req.body.post,
        companyName: req.body.companyName,
        photo: req.file.originalname,
        description: req.body.description,
    }, 
    { new: true }
);

// console.log(77777);

// console.log(UpdatedTestimonial);
if(UpdatedTestimonial){
    const updatedDate = await Testimonial.findByIdAndUpdate(req.params.id, {$set: {lastUpdatedOn: now}}, {new: true});
    res.send(UpdatedTestimonial);
}
    
} 
    catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
    }
});

router.delete("/:id", async(req, res) => {
    try {
    let inactive = 0;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if( deletedTestimonial){
        const active = await Testimonial.findByIdAndUpdate(req.params.id, {$set: {active: inactive }}, {new: true});
        res.send(deletedTestimonial);
    }
    
    }
    catch (error) {
        res.status(500).send(error.message);
        console.log(error.message);
        }
});

module.exports = router;