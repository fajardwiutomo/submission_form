import Form from "../models/Form.js";

export const createform = async (req, res, next) => {
  const newForm = new Form(req.body);

  try {
    const savedForm = await newForm.save();
    res.status(200).json(savedForm);
  } catch (error) {
    next(error);
  }
};

export const allForm = async (req, res, next) => {
  try {
    const Forms = await Form.find();
    res.status(200).json(Forms);
  } catch (error) {
    next(error);
  }
};

export const checkStatus = async (req, res, next) => {
  const { email, contactNumber } = req.query;
  try {
    const status = await Form.find({
      email: email,
      contactNumber: contactNumber,
    });
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const updatedStatus = await Form.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedStatus);
  } catch (error) {
    next(error);
  }
};




