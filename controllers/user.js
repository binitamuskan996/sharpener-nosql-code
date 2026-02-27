const User = require('../models/user');

const postAddUser = (req, res, next) => {
  const { name, email} = req.body;

  const user = new User(name, email);

  user.save()
    .then(result => {
      res.status(201).json({ message: "User created successfully",  userId: result.insertedId });
    })
    .catch(err => {
      console.log(err);
    });
};
const getUser = (req, res, next) => {
  const userId = req.params.userId;

  User.findUserById(userId)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
    });
};
module.exports={postAddUser,getUser}