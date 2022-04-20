const Glasses = require('../models/glasses');
const fileUpload = require ('express-fileupload');
const path = require('path');
const util = require('util');
const _ = require('lodash');

exports.getGlasses = async (req, res, next) => {
    try {
        const [allGlasses] = await Glasses.fetchAll();
        res.status(200).json(allGlasses);
    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getGlassesId = async (req, res, next) => {
    try {
        const [selectedGlasses] = await Glasses.fetchOne(req.params.id);
        res.status(200).json(selectedGlasses, id);
    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
//-----------------------------------------------------------
exports.postGlasses = async (req, res, next) => {
    let rb = req.body;

    try {

        let newGlasses = {
            product_type: rb.product_type,
            collection: rb.collection,
            product_name: rb.product_name,
            description: rb.description,
            price: rb.price,
            colour_lens: rb.colour_lens,
            colour_frame:rb.colour_frame,
            height: rb.height,
            width: rb.width,
            length_of_temple: rb.length_of_temple,
            uv_protection: rb.uv_protection,
            lens_type: rb.lens_type,
            intensity: rb.intensity
        }

        if (newGlasses.collection){

        }
        const postResponse = await Glasses.post(newGlasses);
        res.status(201).json(postResponse);
    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
//*****   fileUpload   **** */
exports.postImg = async(req,res) =>{
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'Error: No file uploaded'
            });
        } else {
            //----SINGLE FILE UPLOAD----------
            // let photo = req.files.photo;
            // let photoname = photo.name.split(' ').join('_'); //remplace les espaces ds le nom du fichier par un '_'
            // let extension = photo.mimetype;
            // let photo_size = photo.size;
            
            // photo.mv('./uploads/'+photoname );
            // res.json({
            //     message: 'File is uploaded',
            //     data: {
            //         name: photoname,
            //         mimetype: extension,
            //         size: photo_size,
            //     }
            // });
            //--------------------------------------

            //Multi FILES UPLOAD
            let data = []; 
    
            //loop all files
            _.forEach(_.keysIn(req.files.photos), (key) => {
                let photo = req.files.photos[key];
                
                //move photo to uploads directory
                photo.mv('./uploads/' + photo.name);

                //push file details
                data.push({
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                });
            });
    
            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                data: data
            }); 
        }
    } catch (err) {
        res.json({Error: "Error while uploading file dommage."})
    }
    //--------------------------------------
    
};

/* --------------------------------------------------------------*/
exports.putGlassesDescription = async (req, res, next) => {
    try {
        const putResponse = await Glasses.updateDesc(req.body.id, rb.description);
        res.status(200).json(putResponse);
    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.putGlasses = async (req, res, next) => { //A trouver : 
    let rb = req.body;

    const {id} = req.params;

    let updatedGlasses = {
        collection: rb.collection, 
        product_name : rb.product_name, 
        description : rb.description, 
        price: rb.price, 
        colour_lens: rb.colour_lens, 
        colour_frame: rb.colour_frame, 
        height: rb.height,
        width:rb.width,
        length_of_temple: rb.length_of_temple,
        uv_protection: rb.uv_protection,
        lens_type : rb.lens_type,
        intensity: rb.intensity 
    }
    try {
        const putResponse = await Glasses.update(id, updatedGlasses);  
        res.status(200).json(putResponse);
    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
            //throw(err);
        }
        next(err);
    }
};


exports.deleteGlasses = async (req, res, next) => {
    try {
        const deleteResponse = await Glasses.delete(req.params.id);
        res.status(200).json(deleteResponse);
    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
