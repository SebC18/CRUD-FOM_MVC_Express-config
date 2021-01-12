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
          
    }

    //---------------------------------------**/*//*//*/*/*/*/*/*/**/** */ */
    static post(newGlasses){
        return db.query('INSERT INTO glasses SET ?', newGlasses, function (error, results, fields) {
          if (error) throw error;
          // Neat!
        });
        
        
    }

    static update(id, updatedGlasses){
                                            
        let mysqlD = "UPDATE glasses SET  ? WHERE id = ?";

         return  db.query(mysqlD , [updatedGlasses, id], (err, res) =>{
            if (error) throw error;

            res.send('update description successful ! ');
        });
       // console.log('Updated Glasses ID :', id, 'Updated Glasses body :',updatedGlasses);
                   
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
        
     
      
    }
}