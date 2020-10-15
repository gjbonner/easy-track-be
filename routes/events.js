const router = require("express").Router();
const verify = require("./verifyToken");
const Event = require("../models/Event");
router.post("/", verify, async (req, res) => {
  // create event
  const event = new Event({
    user: req.user,
    eventTime: new Date(),
    severity: req.body.severity,
  });
  // save event
  try {
    const savedEvent = await event.save();
    res.status(res.statusCode).send(event);
  } catch (error) {
    res.status(res.statusCode).send(error);
  }
});

module.exports = router;
