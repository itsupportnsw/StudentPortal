//Initiallising node modules
const Joi = require("joi"); // use for validation
const express = require("express");
const router = express.Router();
const dbConfig = require("../config/db");
var mssql = require("mssql");

// Body Parser Middleware
router.use(express.json());

// this function use for enable CORS on ExpressJS if get problem
// Access to XMLHttpRequest at 'http://localhost:5000/Students' from origin 'http://localhost:4200'
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested
// resource.
//CORS Middleware
router.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

router.get("/", (req, res) => {
  res.send("Users");
});

router.get("/get/all", (req, res) => {
  // create sql command

  res.send("All user data");
});

router.post("/getUserPermission", (req, res) => {
  let student = req.body;
  dbConfig.database = "AIC";

  // get data from database
  new mssql.ConnectionPool(dbConfig).connect().then((pool) => {
    // =========
    var request = pool.request();

    // input variable
    request.input("studentID", mssql.VarChar, student.studentID);
    request.input("email", mssql.VarChar, student.email);

    // execute get user info
    request
      .query(
        "SELECT ID AS id, StudentID AS studentID, FullName AS fullName, EmailAddress AS emailAddress, AustraliaPhone AS phone, OverDue AS overdueAmount, Photo_DOCDATA AS photoData FROM STUDENT WHERE (StudentID = @studentID) AND (EmailAddress = @email)"
      )
      .then((result) => {
        // return row affected back
        res.status(200);

        if (result.recordset.length > 0) {
          res.send({
            error: false,
            message: "get user permission successfully.",
            data: { studentDetail: result.recordset[0] },
          });
        } else {
          res.status(200).send({
            error: true,
            message: "This user is not in database.",
          });
        }

        mssql.close();
      })
      .catch((error) => {
        res.send(error);
        console.log(error);
        mssql.close();
      });
  });
});

// function validateEnrolment(enrolment) {
//   // set schema to check for each variable. each variable can set different validation
//   const schema = {
//     id: Joi.optional(),
//     offerLetterDetailId: Joi.required(),
//     studentId: Joi.required(),
//     courseId: Joi.required(),
//     tasId: Joi.optional(),
//     startDate: Joi.optional(),
//     endDate: Joi.optional(),
//     status: Joi.required(),
//     weeks: Joi.optional(),
//     durationHours: Joi.optional(),
//     note: Joi.optional(),
//     createDate: Joi.optional(),
//   };
//   // return ressult of validation to result
//   return Joi.validate(enrolment, schema);
// }

module.exports = router;
