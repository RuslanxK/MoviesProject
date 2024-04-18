const express = require("express");
const memberBL = require("../models/memberBL");
const router = express.Router();

router.route("/").get(async (req, resp) => {
  try {
    const name = req.query.name;
    const members = await memberBL.getAllMembers(name);
    return resp.json(members);
  } catch (error) {
    console.log(error);
  }
});

router.route("/:id").get(async (req, resp) => {
  try {
    const { id } = req.params;
    const member = await memberBL.getMemberById(id);
    return resp.json(member);
  } catch (error) {
    console.log(error);
  }
});

router.route("/").post(async (req, resp) => {
  try {
    const newMember = req.body;
    const status = await memberBL.addMember(newMember);
    return resp.json(status);
  } catch (error) {
    console.log(error);
  }
});

router.route("/:id").put(async (req, resp) => {
  try {
    const { id } = req.params;
    const updateMember = req.body;
    const status = await memberBL.updateMember(id, updateMember);
    return resp.json(status);
  } catch (error) {
    console.log(error);
  }
});

router.route("/:id").delete(async (req, resp) => {
  try {
    const { id } = req.params;
    const status = await memberBL.deleteMember(id);
    return resp.json(status);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
