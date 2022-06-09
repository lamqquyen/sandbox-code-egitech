const express =  require("express");
const mysql =  require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser")
const isEmpty = require("lodash/isEmpty");
const { ERROR_MESSAGE } = require("./constants");

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


var con = mysql.createConnection({
  host: "154.26.128.163",
  user: "zto_test",
  database: "zto_test",
  password: "4MHbdKjxmEaFp3iC"
});

function asyncQuery(query, params) {
  return new Promise((resolve, reject) =>{
      con.query(query, params, (err, result) => {
          if (err)
              return reject(err);
          resolve(result);
      });
  });
}

con.connect(async (err) => {
  if (err) throw err;

  console.log("Connected");
});


app.get("/students", async (req, res) => {
  try {
    const students = await asyncQuery("SELECT * FROM student");
    res.send(students);
  } catch (e) {
    console.log(e)
    res.status(400).send("Fail to fetch students");
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const {id} = req.params
    const students = await asyncQuery("SELECT * FROM student WHERE ?", {id});
    res.send(students.length ? students[0] : null);
  } catch (e) {
    console.log(e)
    res.status(400).send("Fail to fetch students");
  }
});


app.post("/students", async (req, res) => {
  try {
    const {studentInfo} = req.body
    const {first_name, last_name, date_of_birth} = studentInfo

    if (isEmpty(first_name) || isEmpty(last_name) || isEmpty(date_of_birth)) {
      res.status(400).send(ERROR_MESSAGE);
    }
    
    asyncQuery("INSERT INTO student SET ?", studentInfo);

    res.send("Add student sucessfully");
  } catch (e) {
    console.log(e)
    res.status(400).send("Fail to create students");
  }
});


app.put("/students/:studentId", async (req, res) => {
  try {
    const {studentId} = req.params
    const {studentInfo} = req.body
    const {first_name, last_name, date_of_birth} = studentInfo

    if (isEmpty(first_name) || isEmpty(last_name) || isEmpty(date_of_birth)) {
      res.status(400).send(ERROR_MESSAGE);
    }
    
    
    asyncQuery("UPDATE student SET ? Where ID = ?",
      [studentInfo, studentId]);

    res.send("Edit student sucessfully");
  } catch (e) {
    console.log(e)
    res.status(400).send("Fail to update students");
  }
});
const PORT = 5003;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
