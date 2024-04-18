const subscription = require("./subscriptionsModel");

const getALlSubs = () => {
  return new Promise((resolve, reject) => {
    subscription.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getSubById = (id) => {
  return new Promise((resolve, reject) => {
    subscription.findById(id, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const addSub = (sub) => {
  return new Promise((resolve, reject) => {
    let Subscription = new subscription(sub);
    Subscription.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Created");
      }
    });
  });
};


const deleteSub = (id) => {
  return new Promise((resolve, reject) => {
    subscription.findByIdAndDelete(id, {}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Deleted');
      }
    });
  });
};




module.exports = { getALlSubs, getSubById, addSub, deleteSub };
