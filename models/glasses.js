const db = require('../util/database');

module.exports = class Glasses {
    constructor(id, p_t, col, p_n, desc, price, c_f, h, w, l_o_t, l_t, intens){
        this.id = id;
        this.product_type = p_t;
        this.collection = col;
        this.product_name = p_n;
        this.description = desc;
        this.price = price;
        this.colour_frame = c_f;
        this.height = h;
        this.width = w;
        this.length_of_temple = l_o_t;
        this.lens_type = l_t;
        this.intensity = intens;
    }

    static fetchAll(){
        return db.execute('SELECT * FROM glasses');
    }

    static fetchOne(id){
        let query = db.query('SELECT * FROM glasses WHERE id = ?', id , function (error, results, fields) {
            if (error) throw error;
            // Neat!
          });
          console.log(query); 
          return query
    }

    //---------------------------------------**/*//*//*/*/*/*/*/*/**/** */ */
    static post(newGlasses){
        //const kaleidos1 = new Glasses(null, 1,  "Kaleidos", "Vortex Kaleido - Abstract", "Vortex lenses are...", 15.95, "Black", 5, 14, 14, "Vortex", "Medium");
        let query = db.query('INSERT INTO glasses SET ?', newGlasses, function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
        console.log(query); 
        return query
    }

    static updateDesc(id, description){
        //var columns  = {id: id, description: description};
        let mySqlQuery = `UPDATE glasses SET description = ?  WHERE id = ?`;
        let query = db.query(mySqlQuery, [description, id], (err, res) =>{
            if (err) throw err;

            res.send('update description successful ! ');
        });
        console.log('Requete : ',mySqlQuery, 'Description', description);
        } 
    
    static update(id, reqBody){
        const data = reqBody;
        
         let mySqlQ = `UPDATE glasses SET product_type     = ?, collection   = ?, 
                                          product_name     = ?, description  = ?, 
                                          price            = ?, colour_frame = ?, 
                                          height           = ?, width        = ?, 
                                          length_of_temple = ?, lens_type    = ?, 
                                          intensity        = ?  WHERE id     = ?`
        let testupdateQuery = "UPDATE `glasses` SET ? WHERE `id` = ?";
        //let mysqlD = "UPDATE `glasses` SET `product_type` = ?,  `collection` = ?,`product_name` = ?,`description` = ?,`price` = ?,`colour_lens` = ?,`colour_frame` = ?,`height` = ?,`width` = ?,`length_of_temple` = ?, `uv_protection` = ?,`lens_type` = ?,`intensity` = ? WHERE `id` = ?";
        let glassesColumns =            [
                                         data.product_type,     data.collection, 
                                         data.product_name,     data.description, 
                                         data.price,            data.colour_frame, 
                                         data.height,           data.width, 
                                         data.length_of_temple, data.lens_type, 
                                         data.intensity
                                        ];
                                

         const obj = JSON.parse(reqBody); 
         Glasses.description = reqBody.description ; 
         console.log('obj: ', obj);

         let query =  db.query(testupdateQuery , [reqBody, id], (err, res) =>{
            if (err) throw err;

            res.send('update description successful ! ');
        })                             


    }

    static delete(id){
        return db.execute('DELETE FROM glasses WHERE id = ?' , [id]);
    }

    //-----------------------------

    static postTest(item, desc){
        //return db.execute('INSERT INTO test (item, desc) VALUES (?)', [[item, desc]]);
        var columns  = {item: item, desc: desc};
        var query = db.query('INSERT INTO test SET ?', columns, function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
        console.log(query); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
        return query
     
      
    }
}