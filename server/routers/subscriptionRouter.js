const subscriptionBL = require("../models/subscriptionsBL");
const express = require("express");
const router = express.Router();

router.route("/").get(async (req, resp) => {
  try {
    const movies = await subscriptionBL.getALlSubs();
    return resp.json(movies);
  } catch (error) {
    console.log(error);
  }
});

router.route("/").post(async (req, resp) => {
  try {
    const obj = req.body;
    const status = await subscriptionBL.addSub(obj);
    return resp.json(status);
  } catch (error) {
    console.log(error);
  }
});


router.route("/:id").delete(async (req, resp) => {
  try {
    const {id} = req.params
    const status = await subscriptionBL.deleteSub(id);
    return resp.json(status);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
