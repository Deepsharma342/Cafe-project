const express = require("express");
const router = express.Router();
const { createContact, getContacts } = require("../controllers/contactController");

// POST new contact message
router.post("/", createContact);

// GET all contact messages
router.get("/", getContacts);

module.exports = router;
