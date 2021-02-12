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

const getDatabaseName = (college) => {
  if (college === "AIC") return "AIC";
  else if (college === "SC") return "NSWBC";
};

router.post("/getUserDetail", (req, res) => {
  let student = req.body;

  // validate user
  let userValidation = validateUserLogin(student);
  if (userValidation.error)
    res.status(401).send({
      error: true,
      err: userValidation,
    });

  dbConfig.database = getDatabaseName(student.college);

  // get data from database
  new mssql.ConnectionPool(dbConfig).connect().then(async (pool) => {
    // =========
    var request = pool.request();

    let studentDetail;
    let enrolmentClass;
    let classStart = "2020-10-12";
    let classEnd = "2020-12-31";
    let paymentDetail;
    let enrolmentResult = [];

    // execute get user info
    // input variable
    request.input("studentID", mssql.VarChar, student.studentID);
    request.input("email", mssql.VarChar, student.email);

    await request
      .query(
        "SELECT ID AS id, StudentID AS studentID, FullName AS fullName, EmailAddress AS emailAddress, AustraliaPhone AS phone, OverDue AS overdueAmount, Photo_DOCDATA AS photoData FROM STUDENT WHERE (StudentID = @studentID) AND (EmailAddress = @email)"
      )
      .then((result) => {
        if (result.recordset.length > 0) studentDetail = result.recordset[0];

        mssql.close();
      })
      .catch((error) => {
        res.send(error);
        console.log(error);
        mssql.close();
      });

    // if do not have studentin the database, send do not have permission back
    if (!studentDetail) {
      res.status(200).send({
        error: true,
        message: "This user is not in database.",
      });
      return;
    }

    // get enrolment class
    request.input("classStart", mssql.VarChar, classStart);
    request.input("classEnd", mssql.VarChar, classEnd);
    await request
      .query(
        "SELECT TOP (100) PERCENT CLASS.ID AS class_id, CLASS.ClassName AS className, CLASS.StartDate AS classStart, CLASS.EndDate AS classEnd, UNIT.Code AS unitCode, UNIT.Name AS unitName, CLASS.Day AS deliveryDay, UNIT.ID AS unit_id FROM CLASS INNER JOIN ENROLMENT_REF ON CLASS.ID = ENROLMENT_REF.RID INNER JOIN ENROLMENT ON ENROLMENT_REF.ID = ENROLMENT.ID INNER JOIN UNIT ON CLASS.CourseUnit_RID = UNIT.ID INNER JOIN STUDENT ON ENROLMENT.Student_RID = STUDENT.ID WHERE (STUDENT.StudentID = @studentID) AND (CLASS.StartDate >= CONVERT(DATETIME, @classStart, 102)) AND (CLASS.EndDate <= CONVERT(DATETIME, @classEnd, 102)) AND (UNIT.Code <> '-') ORDER BY classStart"
      )
      .then((result) => {
        if (result.recordset.length > 0) enrolmentClass = result.recordset;

        mssql.close();
      })
      .catch((error) => {
        res.send(error);
        console.log(error);
        mssql.close();
      });

    // TODO: get enrolment and result
    let tmpEnrolment = [];
    request.input("studentID", mssql.VarChar, student.studentID);
    await request
      .query(
        "SELECT TOP (100) PERCENT ENROLMENT.ID as enrolId, COURSE.Code AS courseCode, COURSE.Name AS courseName, ENROLMENT.StartDate, ENROLMENT.EndDate, ENROLMENT.Status, ENROLMENT.CurrentAttendaceWithLeave FROM ENROLMENT INNER JOIN STUDENT ON ENROLMENT.Student_RID = STUDENT.ID INNER JOIN COURSE ON ENROLMENT.Course_RID = COURSE.ID WHERE (STUDENT.StudentID = @studentID)"
      )
      .then((result) => {
        if (result.recordset.length > 0) tmpEnrolment = result.recordset;

        mssql.close();
      })
      .catch((error) => {
        res.send(error);
        console.log(error);
        mssql.close();
      });

    let tmpResult = [];
    request.input("studentID", mssql.VarChar, student.studentID);
    await request
      .query(
        "SELECT TOP (100) PERCENT ENROLMENT.ID AS enrolId, UNIT.Code AS unitCode, UNIT.Name AS unitName, COURSERESULT.Name AS result, CLASS.StartDate AS classStartDate, CLASS.EndDate AS classEndDate FROM ENROLMENT INNER JOIN STUDENT ON ENROLMENT.Student_RID = STUDENT.ID INNER JOIN STUDENTRESULT ON ENROLMENT.ID = STUDENTRESULT.Enrolment_RID INNER JOIN UNIT ON STUDENTRESULT.Unit_RID = UNIT.ID INNER JOIN COURSERESULT ON STUDENTRESULT.Result_RID = COURSERESULT.ID INNER JOIN CLASS ON STUDENTRESULT.Class_RID = CLASS.ID WHERE (STUDENT.StudentID = @studentID) ORDER BY classStartDate, classEndDate"
      )
      .then((result) => {
        if (result.recordset.length > 0) tmpResult = result.recordset;

        mssql.close();
      })
      .catch((error) => {
        res.send(error);
        console.log(error);
        mssql.close();
      });

    for (let i = 0; i < tmpEnrolment.length; i++) {
      let tmpR = tmpResult.filter((item) => {
        return item.enrolId === tmpEnrolment[i].enrolId;
      });
      let tmpE = {
        enrolment: tmpEnrolment[i],
        unitResult: tmpR,
      };
      enrolmentResult.push(tmpE);
    }

    // get payment detail
    request.input("studentID", mssql.VarChar, student.studentID);
    await request
      .query(
        "SELECT TOP (100) PERCENT APPLICATION.Application, FEE.DueOn, FEE.Amount, FEE.Status FROM FEE INNER JOIN PRODUCTORDER ON FEE.Offer_RID = PRODUCTORDER.ID LEFT OUTER JOIN APPLICATION ON PRODUCTORDER.Application_RID = APPLICATION.ID LEFT OUTER JOIN STUDENT ON PRODUCTORDER.Student_RID = STUDENT.ID LEFT OUTER JOIN AGENT ON PRODUCTORDER.Agent_RID = AGENT.ID WHERE (PRODUCTORDER.Status = 'ACCEPTED') AND (STUDENT.StudentID = @studentID) ORDER BY FEE.DueOn"
      )
      .then((result) => {
        if (result.recordset.length > 0) paymentDetail = result.recordset;

        mssql.close();
      })
      .catch((error) => {
        res.send(error);
        console.log(error);
        mssql.close();
      });

    // send back request
    if (student) {
      res.send({
        error: false,
        message: "get user permission successfully.",
        data: {
          studentDetail: studentDetail,
          enrolmentClass: enrolmentClass,
          paymentDetail: paymentDetail,
          enrolmentResult: enrolmentResult,
        },
      });
    }
  });
});

// validate user login
function validateUserLogin(user) {
  // set schema to check for each variable. each variable can set different validation
  const schema = {
    college: Joi.required(),
    studentID: Joi.required(),
    email: Joi.string().email(),
  };
  // return ressult of validation to result
  return Joi.validate(user, schema);
}

module.exports = router;
