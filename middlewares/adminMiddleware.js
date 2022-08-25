const jwt = require('jsonwebtoken') 
const User = require('../models/userModel') 
const asyncHandler = require('express-async-handler') 

const adminProtect = asyncHandler(async (req, res, next) => {
  let token 
  var { userID } = req.body 
  if(!userID){
    userID = req.params.id 
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1] 

      const decoded = jwt.verify(token, process.env.JWT_SECRET) 

      req.user = await User.findById(decoded.id).select("-password") 
      admin = req.user.isAdmin
      if(!admin){
        res.status(401)
        throw new Error("Account is Not an Admin!")
      }
      next() 
    } catch (error) {
      res.status(401).json({
        message: "Account is Not an Admin"
      })
      throw new Error("Not authorized, token failed") 
    }
  }

  if (!token) {
    res.status(401) 
    throw new Error("Not authorized, no token") 
  }
}) 

module.exports = { adminProtect }