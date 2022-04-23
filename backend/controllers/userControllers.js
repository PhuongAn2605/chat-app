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
  console.log(req.body)
    try{ 
        const userId = req.body.userId;
        const avatarImage = req.body.image;
        console.log('userId: ', userId)
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        });
        console.log('userData: ', userData)
        if(isEmpty(userData)) {
          return res.json({ msg: "Something went wrong", status: false })
        }
        return res.json(userData);
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
        // const users = await User.find({_id: { $ne: req.params.id }}).select(["email", "username","avatarImage","_id"]);
        const users = await User.find({});
        if(isEmpty(users)) {
          return res.json({ msg: "Something went wrong!", status: false })
        }
        return res.json({status: true, users});
    }catch(e) {
        next(e)
    }
    
}