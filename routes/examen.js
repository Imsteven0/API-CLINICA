const express = require("express");
const router = express.Router();

const controllerExam = require("../controllers/controllerExamen.js");
const auth = require("../middlewares/authJWT");
const rol = require("../middlewares/roles-middleware");

module.exports = function () {
  router.get(
    "/listExams",
   
    controllerExam.ListExams
  );

  router.post(
    "/addExamOrina",
    controllerExam.AddExamOrina
  );

  router.post(
    "/addExamSangre",
    controllerExam.AddExamSangre
  );

  
  router.put(
    "/updateExamOrina",
    controllerExam.updateExamOrina
  );

  router.put(
    "/updateExamSangre",
    controllerExam.updateExamSangre
  );

  router.delete(
    "/deleteExamOrina/:id",
    controllerExam.deleteExamOrina
  );

  router.delete(
    "/deleteExamSangre/:id",
    controllerExam.deleteExamSangre
  );

  //   router.put(
  //     "/updateMedicalConsult",
  //     auth.verifyToken,
  //     rol.restrictTo(1),
  //     controllerMedicalConsult.UpdateMedicalConsult
  //   );

  //   router.delete(
  //     "/deleteMedicalConsult/:id",
  //     auth.verifyToken,
  //     rol.restrictTo(1),
  //     controllerMedicalConsult.DeleteMedicalConsult
  //   );

  return router;
};
