const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const isEmpty = require('is-Empty');

module.exports.register = async (req, res, next) => {
    try{ 
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if(usernameCheck){
            return res.json({ msg: "Username is already used", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if(emailCheck) {
            return res.json({ msg: "Email is already used", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });
        delete user.password;
        return res.json({ status: true, user });
    }catch(e) {
        next(e)
    }
    
}

module.exports.login = async (req, res, next) => {
    try{ 
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(!user){
            return res.json({ msg: "Incorrect username", status: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.json({ msg: "Incorrect password!", status: false })
        }
        delete user.password;
        return res.json({ status: true, user });
    }catch(e) {
        next(e)
    }
    
}

module.exports.setAvatar = async (req, res, next) => {
    try{ 
        const userId = req.body.userId;
        const avatarImage = req.body.image;
        const user = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        });
        if(isEmpty(user)) {
          return res.json({ msg: "Something went wrong", status: false })
        }
        const updatedUser = await User.findById(userId);
        return res.json({status: true, user: updatedUser });
        // return res.json({
        //     isSet: userData.isAvatarImageSet,
        //     image: userData.avatarImage,
        //     status: true
        // })
    }catch(e) {
        next(e)
    }
    
}

module.exports.getAllUsers = async (req, res, next) => {
    try{ 
      const userId = req.body.userId;
      const user = await User.findById(userId);
        const users = await User.find({});
        if(isEmpty(users) || isEmpty(user)) {
          return res.json({ msg: "Something went wrong!", status: false })
        }
        return res.json({status: true, users, user});
    }catch(e) {
        next(e)
    }
    
}

module.exports.logout = (req, res, next) => {
  try {
    if(isEmpty(req.body.userId)) {
      return res.json({ msg: 'User id is required!'});
    }
    return res.status(200).send();
  }catch(ex){
    next(ex);
  }
}