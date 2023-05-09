const express = require("express");
const router = express.Router();
const librarianController = require("../controller/librarianController");
const userController = require("../controller/userController");
const memberController = require("../controller/memberController");
const { authenticate } = require("../middlewares/auth");

/***********************************user register *****************************/
router.post("/register", userController.createUser);

/***********************************login ************************************/
router.post("/login", userController.userLogin);

/***************************************create Book**************************/
router.post("/books", authenticate, librarianController.createBook);

/*****************************getbooks***************************************/
router.get("/books", authenticate, librarianController.getbooks);

/**************************get Book By BookId *******************************/
router.get("/books/:bookId", authenticate, librarianController.getBookById);

/*************************update books**************************************/
router.put("/books/:bookId", authenticate, librarianController.updateBook);

/***********************************delete books****************************/
router.delete(
  "/books/:bookId",
  authenticate,
  librarianController.deletebookbyId
);

/***********************************create review***************************/
router.post("/registermember", memberController.createMember);

/***********************************get members ***************************/
router.get("/members", memberController.getMemberById);

/***********************************update members ***************************/
router.get("/members/:id", memberController.updateMembers);

/***********************************burrow  ***************************/
router.get("/burrow", memberController.burrow);

/***********************************return book ***************************/
router.get("/returnBook", memberController.returnBook);

/***********************************get members ***************************/
router.get("/deleteaccount", memberController.deleteAccount);

/************************************delete review  ***********************/
router.delete("/deletemember/:id", memberController.deleteMemberbyId);

/*******************************path not found  ***********************/
router.all("/*", function (req, res) {
  return res.status(404).send({ status: false, message: "path not found" });
});

module.exports = router;
