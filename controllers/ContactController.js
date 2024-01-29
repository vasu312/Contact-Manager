// Imports
const asyncHandler = require("express-async-handler");
const sequelize = require("../config/db");
const contactModel = require("../model/contactModel");
const userModel = require("../model/userModel");
const User = userModel(sequelize);

// Model Imports
const Contact = contactModel(sequelize);

/*
    @Description : Get All Contacts
    @Route       : GET /api/contact
    @Access      : Private   
*/

const getContacts = asyncHandler(async (req, res) => {
  const contact = (await Contact.findAll()).map((m) => m.get({ plain: true }));
  res.status(200).json({ Contact: contact });
});

/*
    @Description : Save Contact
    @Route       : POST   /api/contact/
    @Access      : Private   
*/

const saveContact = asyncHandler(async (req, res) => {
  const { id, name, email, phone } = req.body;
  const user_id = req.user.username;
  
  if (!phone || !name || !email) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await Contact.create({ id, name, email, phone,user_id});
  res.status(201).json({ message: `Contact Created`, data: contact });
});

/*
    @Description : Get Contact
    @Route       : GET   /api/contact/:id
    @Access      : Private   
*/

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json({ Contact: contact });
});

/*
    @Description : Update Contact
    @Route       : PUT   /api/contact/:id
    @Access      : Private   
*/

const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, email, phone } = req.body;
  const contact = await Contact.findByPk(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  await contact.update({ name, email, phone });
  res.status(200).json({ Message: "Contact Updated", Contact: contact });
});

/*
    @Description : Delete Contact
    @Route       : DELETE   /api/contact/:id
    @Access      : Private   
*/

const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const contact = await Contact.findByPk(id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  await contact.destroy();
  res.status(200).json({ Message: `Contact Deleted` });
});

module.exports = {
  getContacts,
  saveContact,
  getContact,
  updateContact,
  deleteContact,
};
