const db = require("../models");
const Customer = db.customers;
const ObjectId = require("mongoose").Types.ObjectId;

exports.create = (req, res) => {
  if (/^[a-z0-9A-Z._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/.test(req.body.email)) {
    if (
      !req.body.customerType ||
      !req.body.email ||
      !req.body.buildings ||
      !req.body.fiscal_address
    ) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  } else {
    res
      .status(409)
      .send({ message: ` ${req.body.email} is not a valid Email ` });
    return;
  }
 

const customer = new Customer({
  customerType: req.body.customerType,
  email: req.body.email,
  buildings: req.body.buildings,
  fiscal_address: req.body.fiscal_address,
});

customer
  .save(customer)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the customer",
    });
  });
}


exports.findAll = (req, res) => {
  Customer.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrieving appointments.",
      });
    });
};

exports.findOne = (req, res) => {
  Customer.findOne({ _id: ObjectId(req.params.id) })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: ` Customer with id ${req.params.id} was not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the customer",
      });
    });
};

exports.update = (req, res) => {
  if (/^[a-z0-9A-Z._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,4}$/.test(req.body.email)) {
    if (
      !req.body.customerType ||
      !req.body.email ||
      !req.body.buildings ||
      !req.body.fiscal_address
    ) {
      res.status(400).send({ message: "Data to update can not be empty!" });
      return;
    }
  } else {
    res
      .status(409)
      .send({ message: ` ${req.body.email} is not a valid Email ` });
    return;
  }


  Customer.findOneAndUpdate({ _id: ObjectId(req.params.id) }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update Customer with id = ${ObjectId(
            req.params.id
          )}. Maybe Customer was not found`,
        });
      } else res.send({ message: "Customer was updated successfully." });
      res.send(data);
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({
        message: `Error updating Customer with id = ${ObjectId(
          req.params.id
        )}`,
        err,
      });
    });
}


exports.delete = (req, res) => {
  Customer.findOneAndRemove({ _id: ObjectId(req.params.id)}, { useFindAndModify: false })
    // eslint-disable-next-line no-unused-vars
    .then((data) => {
      res.send({ message: " Customer was removed succesfully." });
    })
    // eslint-disable-next-line no-unused-vars
    .catch((err) => {
      res.status(500).send({
        message: `Some error ocurred while removing customer with id = ${ObjectId(
          req.params.id
        )}`,
        err,
      });
    });
};
