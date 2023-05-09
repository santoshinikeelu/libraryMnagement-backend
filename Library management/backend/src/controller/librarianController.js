const libraryModel = require("../model/libraryModel");
const userModel = require("../model/userModel");

const { isValidObjectId, isValidString } = require("../validator/validator");
//-------------------------->>-createBook-<<---------------------------<<

const createBook = async function (req, res) {
  try {
    let data = req.body;

    const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } =
      data;

    //-------------->>-validation-<<----------------<<
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "please provide the data in request" });
    //----------->>-title..
    if (!title)
      return res
        .status(400)
        .send({ status: false, message: "title is mandatory in request body" });
    if (!isValidString(title))
      return res
        .status(400)
        .send({ status: false, message: "please provide the valid title" });
    let findTitle = await libraryModel.findOne({ title: title });
    if (findTitle)
      return res
        .status(400)
        .send({ status: false, message: "this title is already exists" });

    //----------->>-userId..
    if (!userId)
      return res.status(400).send({
        status: false,
        message: "userId is mandatory in request body",
      });
    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: "please provide the valid userId" });
    /******************************check authorization ***********************************/
    if (userId != req.tokenId)
      return res
        .status(403)
        .send({ status: false, message: "unauthorised user!" });

    let user = await userModel.findOne({ _id: userId, isDeleted: false });
    if (!user)
      return res
        .status(404)
        .send({ status: false, message: "user not found with this user id" });

    //----------->>-category..
    if (!author)
      return res.status(400).send({
        status: false,
        message: "Author is mandatory in request body",
      });
    if (!isValidString(author))
      return res
        .status(400)
        .send({
          status: false,
          message: "please provide the valid Author Name",
        });

    let createBook = await libraryModel.create(data);
    return res.status(201).json({
      status: true,
      message: "book created successfully",
      data: createBook,
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//------------------------------->>-getBook-<<-------------------<<
const getbooks = async function (req, res) {
  try {
    let queries = req.query;
    let result = { isDeleted: false, ...queries };
    if (!Object.keys(queries).length) {
      const data = await bookModel
        .find({ isDeleted: false })
        .sort({ title: 1 });
      if (data.length == 0)
        return res
          .status(404)
          .send({ status: false, message: "Book not found" });
      return res.status(200).send({ status: true, Data: data });
    } else {
      const data = await libraryModel.find(result).sort({ title: 1 });
      return res
        .status(200)
        .send({ status: true, message: "Book list", data: data });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

/***********************************get book by id********************************************/
const getBookById = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    const bookById = await libraryModel.findOne({
      isDeleted: false,
      _id: bookId,
    });
    if (!bookById)
      return res
        .status(404)
        .send({ status: false, message: "Book not found with this bookId" });

    let Data = await libraryModel.find({ bookId: bookId, isDeleted: false });

    return res
      .status(200)
      .send({ status: true, message: "Books list", data: Data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//************update books********//
const updateBook = async function (req, res) {
  try {
    let data = req.body;
    const { title } = data;
    let bookId = req.params.bookId;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "please provide Data in body" });
    if (title) {
      if (!isValidString(title))
        return res
          .status(400)
          .send({ status: false, message: "please provide the valid title" });
      let findTitle = await bookModel.findOne({ title: title });
      if (findTitle)
        return res
          .status(400)
          .send({ status: false, message: "this title is already exists" });
    }

    let updatebook = await libraryModel.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      data,
      { new: true }
    );

    return res
      .status(200)
      .send({ status: true, message: "Book updated", data: updatebook });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

/*****************************************delete book by Id**************************************/
const deletebookbyId = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    const bookbyId = await libraryModel.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      { $set: { isDeleted: true, deletedAt: new Date(Date.now()) } },
      { new: true }
    );
    if (!bookbyId)
      return res
        .status(404)
        .send({ status: false, message: "book not exists with this bookId" });
    return res
      .status(200)
      .send({ status: true, message: "successfully deleted", data: bookbyId });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = {
  createBook,
  getbooks,
  getBookById,
  updateBook,
  deletebookbyId,
};
