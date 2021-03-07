const mysql = require('mysql');
const express = require("express")
const bodyParser = require("body-parser");
const { json } = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())
var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "6U7onEcZR9",
  password: "qdgLT26cVP",
  database: "6U7onEcZR9", 
  port:"3306"
});

con.connect((err) =>{
  if (err){
    console.log("Connection Failed");
  }
  else{
    console.log("Connected");      }
});


//add new patient
app.post('/addNewPatient', (req, res) => {
  const {name, age, cause, doctor, room} = req.body;
  console.log(name, age, cause, doctor, room);
  let sql = `INSERT INTO patients_table(name, age, cause, doctor, room, status) VALUES ("${name}", ${age} , "${cause}", "${doctor}", ${room}, 1)`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.send({"code":"200", "message":"Successfully added to database"});
  })
})

//discharge a patient
app.post('/discharge', (req, res)=>{
  console.log(req.body);
  const {id} = req.body;
  const sql = `UPDATE patients_table SET status = 0 WHERE patients_table.patient_id = ${id};`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    res.send({"code":"200", "message":"Successfully removed to database"});
  })
})

//all patients in the hospital\
app.get('/allPatients', (req, res) => {
  const sql = `SELECT * from patients_table WHERE status = 1`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result)
  })
})

app.post('/search', (req, res) => {
  const {name} = req.body;
  const sql = `SELECT * from patients_table WHERE name = "${name}"`;
  let query = con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.listen(3010)