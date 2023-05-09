const memberModel = require("../model/memberModel");
const jwt = require("jsonwebtoken");
const {
  isValidString,
  isvalidMobile,
  isValidEmail,
  isValidPass,
  isValidPincode,
  isValidCity,
} = require("../validator/validator");
/******************************user register *****************************/

const createMember = async function (req, res) {
  try {
    let data = req.body;
    const { name, phone, email, password, address } = data;
    //------------------>>-validations-<<----------------------<<
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "please provide the request body" });

    //-------------------------->>-name-<<----------------------<<
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    if (!isValidString(name))
      return res
        .status(400)
        .send({ status: false, message: "please provide the valid name" });

    //-------------------------->>-phone-<<----------------------<<
    if (!phone)
      return res
        .status(400)
        .send({ status: false, message: "phone is required" });
    if (!isvalidMobile(phone))
      return res.status(400).send({
        status: false,
        message: "please provide the valid phone number",
      });

    let mobile = await memberModel.findOne({ phone: phone });
    if (mobile)
      return res.status(400).send({
        status: false,
        message: "this phone number is already exists",
      });

    //-------------------------->>-email-<<----------------------<<

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "please provide the valid emailId" });

    let emailId = await memberModel.findOne({ email: email });
    if (emailId)
      return res
        .status(400)
        .send({ status: false, message: "this emailId is already exists" });

    //-------------------------->>-password-<<---------------------<<
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    if (!isValidPass(password))
      return res.status(400).send({
        status: false,
        message:
          "please provide the valid or strong password length betweeen 8 to 15",
      });

    //------------------------->>-address-<<-----------------------<<
    if (address) {
      const { pincode, city } = address;
      if (city) {
        if (!isValidCity(city))
          return res.status(400).send({
            status: false,
            message: "please provide the valid city name",
          });
      }
      if (pincode) {
        if (!isValidPincode(pincode))
          return res.status(400).send({
            status: false,
            message: "please provide the valid pincode",
          });
      }
    }
    const member = await memberModel.create(data);
    return res.status(201).send({
      status: true,
      message: "Member created successfully",
      data: member,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

/***********************************get member by id********************************************/
const getMemberById = async function (req, res) {
  try {
    let memberId = req.params.memberId;
    const memberById = await memberModel.findOne({
      isDeleted: false,
      _id: memberId,
    });
    if (!memberById)
      return res
        .status(404)
        .send({
          status: false,
          message: "Member not found with this MemberId",
        });

    let Data = await memberModel.find({ memberId: memberId, isDeleted: false });

    return res
      .status(200)
      .send({ status: true, message: "Books list", data: Data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//************update books********//
const updateMembers = async function (req, res) {
  try {
    let data = req.body;
    const { name, phone, email, password, address } = data;
    let memberId = req.params.memberId;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "please provide Data in body" });
    //-------------------------->>-name-<<----------------------<<
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    if (!isValidString(name))
      return res
        .status(400)
        .send({ status: false, message: "please provide the valid name" });

    //-------------------------->>-phone-<<----------------------<<
    if (!phone)
      return res
        .status(400)
        .send({ status: false, message: "phone is required" });
    if (!isvalidMobile(phone))
      return res.status(400).send({
        status: false,
        message: "please provide the valid phone number",
      });

    let mobile = await memberModel.findOne({ phone: phone });
    if (mobile)
      return res.status(400).send({
        status: false,
        message: "this phone number is already exists",
      });

    //-------------------------->>-email-<<----------------------<<

    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, message: "please provide the valid emailId" });

    let emailId = await memberModel.findOne({ email: email });
    if (emailId)
      return res
        .status(400)
        .send({ status: false, message: "this emailId is already exists" });

    //-------------------------->>-password-<<---------------------<<
    if (!password)
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    if (!isValidPass(password))
      return res.status(400).send({
        status: false,
        message:
          "please provide the valid or strong password length betweeen 8 to 15",
      });

    //------------------------->>-address-<<-----------------------<<
    if (address) {
      const { pincode, city } = address;
      if (city) {
        if (!isValidCity(city))
          return res.status(400).send({
            status: false,
            message: "please provide the valid city name",
          });
      }
      if (pincode) {
        if (!isValidPincode(pincode))
          return res.status(400).send({
            status: false,
            message: "please provide the valid pincode",
          });
      }
    }

    let updatedmember = await memberModel.findOneAndUpdate(
      { _id: memberId, isDeleted: false },
      data,
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "Member updated", data: updatedmember });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

/*****************************************delete Member **************************************/
const deleteMemberbyId = async function (req, res) {
  try {
    let memberId = req.params.memberId;
    const memberbyId = await memberModel.findOneAndUpdate(
      { _id: memberId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date(Date.now()) } },
      { new: true }
    );
    if (!memberbyId)
      return res
        .status(404)
        .send({
          status: false,
          message: "member not exists with this memberId",
        });
    return res.status(200).send({
      status: true,
      message: "successfully deleted",
      data: memberbyId,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
//***********************************************burrow**************************************** */
const burrow = async function (req, res) {
  try {
    const bookId = req.body.bookId;
    // Verify the user's role to ensure they are a member
    if (req.user.role !== "member") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if the book is available to borrow
    const bookById = await libraryModel.findOne({
      isDeleted: false,
      _id: bookId,
    });
    if (!bookById)
      return res
        .status(404)
        .send({ status: false, message: "Book not found with this bookId" });
    if (book.status !== "available") {
      return res.status(400).json({ message: "Book not available to borrow" });
    }
    // Update the book status to "borrowed" and create a new borrowing record
    book.status = "borrowed";
    book.borrowerId = req.user._id;
    const updatedBook = await book.save();

    const borrowing = await Borrowing.create({
      bookId: updatedBook._id,
      memberId: req.user._id,
      borrowedDate: new Date(),
    });

    return res.status(200).json({
      message: "Book borrowed successfully",
      book: updatedBook,
      borrowing: borrowing,
    });
  } catch (err) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//***********************************************return book**************************************** */

const returnBook = async function (req, res) {
  try {
    const bookId = req.body.bookId;

    // Verify the user's role to ensure they are a member
    if (req.user.role !== "member") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the borrowing record for the book ID and member ID
    const borrowing = await memberModel.findOne({
      bookId: bookId,
      memberId: req.user._id,
    });
    if (!borrowing) {
      return res.status(404).json({ message: "Borrowing record not found" });
    }

    // Update the book status to "available" and delete the borrowing record
    const book = await Book.findById(borrowing.bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.status = "available";
    book.borrowerId = null;
    const updatedBook = await book.save();

    await memberModel.deleteOne({ _id: borrowing._id });

    return res.status(200).json({
      message: "Book returned successfully",
      book: updatedBook,
    });
  } catch (err) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//*******************************Account Delete******************************************* */

const deleteAccount = async function (req, res) {
  try {
    // Verify the user's role to ensure they are a member
    if (req.user.role !== "member") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete all the borrowing records for the member ID
    await memberModel.deleteMany({ memberId: req.user._id });

    // Delete the user account
    await User.deleteOne({ _id: req.user._id });

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createMember,
  getMemberById,
  updateMembers,
  deleteMemberbyId,
  burrow,
  returnBook,
  deleteAccount,
};
