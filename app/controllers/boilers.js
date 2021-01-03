const db = require("../models");
const Boilers = db.boilers;
const ObjectId = require('mongoose').Types.ObjectId;

exports.create = (req, res) => {
  // eslint-disable-next-line no-useless-escape
  if (/^[0-9]+(\.[0-9]{1,2})?$/.test(req.body.hour_maintaince_cost)) {
    // eslint-disable-next-line no-useless-escape
    if (/^[0-9]+(\.[0-9]{1,2})?$/.test(req.body.hour_eventual_cost)) {
      if (
        !req.body.typeId ||
        !req.body.maintaince_rate ||
        !req.body.hour_maintaince_cost ||
        !req.body.hour_eventual_cost
      ) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    } else {
      res.status(400).send({
        message: `The decimal number ${req.body.hour_eventual_cost} is incorrect, it must be separated by .`,
      });
      return;
    }
  } else {
    res.status(400).send({
      message: `The decimal number ${req.body.hour_maintaince_cost} is incorrect, it must be separated by .`,
    });
    return;
  }

  const boilers = new Boilers({
    typeId: req.body.typeId,
    maintaince_rate: req.body.maintaince_rate,
    hour_maintaince_cost: req.body.hour_maintaince_cost,
    hour_eventual_cost: req.body.hour_eventual_cost,
  });
  boilers
    .save(boilers)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occurred while creating the boiler.",
      });
    });
};

exports.findAll = (req, res) => {
  Boilers.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occurred while retrieving boilers.",
      });
    });
};

exports.findOne = (req, res) => {
  Boilers.findOne({ _id: ObjectId(req.params._id) })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Boiler was not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occurred while finding the boiler.",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  // eslint-disable-next-line no-useless-escape
  if (/^[0-9]+(\.[0-9]{1,2})?$/.test(req.body.hour_maintaince_cost)) {
    // eslint-disable-next-line no-useless-escape
    if (/^[0-9]+(\.[0-9]{1,2})?$/.test(req.body.hour_eventual_cost)) {
      if (
        !req.body.typeId ||
        !req.body.maintaince_rate ||
        !req.body.hour_maintaince_cost ||
        !req.body.hour_eventual_cost
      ) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
    } else {
      res.status(400).send({
        message: `The decimal number ${req.body.hour_eventual_cost} is incorrect, it must be separated by .`,
      });
      return;
    }
  } else {
    res.status(400).send({
      message: `The decimal number ${req.body.hour_maintaince_cost} is incorrect, it must be separated by .`,
    });
    return;
  }
  Boilers.findOneAndUpdate({ _id: ObjectId(req.params._id)}, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: "Some error ocurred while updating Boiler",
        });
      } else res.send({ message: "Boiler was update successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "some error occurred while updating the boiler.",
      });
    });
};

exports.delete = (req, res) => {
  Boilers.findOneAndRemove({ _id: ObjectId(req.params._id) }, { useFindAndModify: false })
    // eslint-disable-next-line no-unused-vars
    .then((data) => res.send(data))
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(503).send({
        ...err
      });
    });
};