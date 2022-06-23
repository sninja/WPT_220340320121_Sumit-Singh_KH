
const { response } = require('express');
const express = require('express');
const app = express();
// const cors = require('cors');
const mysql = require('mysql2');
// app.use(cors());

// const bodyParser = require('body-parser');

app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

let dbparams = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'nexus',
    port: 3306
}

const conn = mysql.createConnection(dbparams);



app.get('/insertbook', function (req, resp) {
    console.log("inside add route");
    let bookdetails = { bookid: req.query.bookid, bookname: req.query.bookname, bookprice: req.query.bookprice }
    let output = { status: false }
    // testing

    conn.query('select bookname from book where bookid = ?', [bookdetails.bookid],
        (error, rows) => {
            if (error) {
                console.log(error);
            }
            else {
                if (rows.length > 0) {
                    console.log("Book already exists");

                }
                else {
                    output.status = true;
                    conn.query('insert into book (bookid, bookname, price) values (?, ?, ?)',
                        [bookdetails.bookid, bookdetails.bookname, bookdetails.bookprice],
                        (error, resu) => {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                if (resu.affectedRows > 0) {
                                    console.log("Inserted successfully");
                                    output.status = true;
                                }
                                else {
                                    console.log("Insertion failed");
                                }
                            }
                            //resp.send(output);
                        });
                }
            }
            resp.send(output);
        });

    connection.query("select * from book where bookid = ?", [bookid], (err, rows) => {
        if (err) {
            result = err;
            console.log("trouble " + result);
        } else {
            for (let i = 0; i < rows.length; i++)
                console.log(rows[i].bookid + " " + rows[i].bookname + " " + rows[i].price);
        }
    });

});





app.listen(8081, function () {
    console.log("server listening at port 8081...");
});