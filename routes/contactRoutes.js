const express = require("express");
const router = express.Router();
const {
  getContacts,
  updateContact,
  deleteContact,
  saveContact,
  getContact,
} = require("../controllers/ContactController");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);

router.route("/").get(getContacts);

router.route("/").post(saveContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
