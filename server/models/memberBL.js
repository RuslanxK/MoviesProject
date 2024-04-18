const member = require("./memberModel");

const getAllMembers = (name) => {
  return new Promise((resolve, reject) => {
    if (name != null) {
      member.find({ name: name }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } else {
      member.find({}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }
  });
};

const getMemberById = (id) => {
  return new Promise((resolve, reject) => {
    member.findById(id, {}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const addMember = (newMember) => {
  return new Promise((resolve, reject) => {
    let Member = new member(newMember);

    Member.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Created");
      }
    });
  });
};

const updateMember = (id, obj) => {
  return new Promise((resolve, reject) => {
    member.findByIdAndUpdate(
      id,
      {
        name: obj.name,
        email: obj.email,
        city: obj.city,
      },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Updated");
        }
      }
    );
  });
};

const deleteMember = (id) => {
  return new Promise((resolve, reject) => {
    member.findByIdAndDelete(id, {}, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted");
      }
    });
  });
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
