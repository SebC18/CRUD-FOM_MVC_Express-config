const Glasses = require('../models/glasses');

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
        res.status(200).json(selectedGlasses);
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

        const postResponse = await Glasses.post(newGlasses);
        res.status(201).json(postResponse);
    } catch (err) {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};
//-----------------------------------------------------------


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
