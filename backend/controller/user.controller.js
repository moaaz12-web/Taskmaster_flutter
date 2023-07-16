const UserServices = require('../services/user.service');
exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password } = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`UserName ${email}, Already Registered`)
        }
        const response = await UserServices.registerUser(email, password);

        res.json({ status: true, success: 'User registered successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (isPasswordCorrect === false) {
            throw new Error(`Username or Password does not match`);
        }

        // Creating Token

        let tokenData;
        tokenData = { _id: user._id, email: user.email };
    

        const token = await UserServices.generateAccessToken(tokenData,"secret","1h")

        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


// // ! LEGALMIMD BACKEND
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// // Load User model
// const User = require("../models/user.model");
// // Load input validation
// const SignupValidation = require("../validator/SignupValidation");
// const SigninValidation = require("../validator/SigninValidation");

// module.exports = {
//   //  ---------------------------------------- //signup method to add a new user//--------------------------- //

//   register: async (req, res) => {
//     const { email, password } = req.body;
//     const { errors, isValid } = SignupValidation(req.body);

//     try {
//       if (!isValid) {
//         res.status(404).json(errors);
//       } else {
//         await User.findOne({ email }).then(async (exist) => {
//           if (exist) {
//             errors.email = "Email already in use";
//       return  res.status(404).json(errors);
//           } else {
//             const hashedpassword = await bcrypt.hash(password, 8);
//             await User.create({
//               email,
//               password: hashedpassword,
//             });
//                 res.json({ status: true, success: 'User registered successfully' });
//           }
//         });
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   },
//   //  ---------------------------------------- //signin method to add a new user//--------------------------- //
//   login: async (req, res) => {
//     const { email, password } = req.body;
//     const { errors, isValid } = SigninValidation(req.body);

//     try {
//       if (!isValid) {
//         res.status(404).json(errors);
//       } else {
//         await User.findOne({ email }).then(async (user) => {
//           if (!user) {
//             errors.email =
//               "Email does not exist ! please Enter the right Email or You can make account";
//             return res.status(404).json(errors);
//           }
//           // Compare sent in password with found user hashed password
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (!passwordMatch) {
//             errors.password = "Wrong Password";
//             return res.status(404).json(errors);
//           } else {
//             // generate a token and send to client
//             const token = jwt.sign({ _id: user._id }, "zhioua_DOING_GOOD", {
//               expiresIn: "3d",
//             });


// res.status(200).json({ status: true, success: "sendData", token: token });


//           }
//         });
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   },
// }