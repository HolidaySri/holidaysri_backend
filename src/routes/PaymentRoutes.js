const router = require("express").Router();

const {addNewPayment,viewPayments,viewOnePayment, updatePayment,deletePayment} = require ('../controllers/PaymentRequestController.js')

//add new Event 
router.post("/add", addNewPayment);

//view all Events
router.get("/", viewPayments);

//update existing Event
 router.put("/updatePayment/:id",updatePayment);

//delete existing one
 router.delete("/delete/:id",deletePayment);

//view one Event
router.get("/get/:id", viewOnePayment);

module.exports = router;