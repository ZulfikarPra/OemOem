const express = require('express')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const createUser = asyncHandler(async (req, res) => {
    const {
        email,
        name,
        password
    } = req.body

    const userExists = await User.findOne({
        email
    })

    if(!userExists){
        const user = User.create({
            name,
            email,
            password
        })
        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                message: `User ${name} Have Been Created!`
            })
        }
    } else{
        res.status(400).json({
            message: "User Already Existed!"
        })
    }
})

const authUser = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body

    const user = await User.findOne({
        email
    })

    if(user && (await user.matchPassword(password))){
        res.json({
            email: user.email,
            name: user.name,
            id: user._id,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else{
        res.status(400).json({
            message: "User is Not Found!"
        })
    }
}) 

const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id

    const user = await User.findById(id)

    if (user){
        await User.remove()
        res.json({
            message: `User ${user.name} is deleted!`
        })
    } else{
        res.json({
            message: "User is Not Found!"
        })
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id
    const {
        name,
        email,
        password
    } = req.body

    const user = await User.findById(id)

    console.log(user)

    if(user){
        if(name){
            user.name = name
        } else if(email){
            user.email = email
            res.json({
                message: `User email have been changed to ${email}`
            })
            await user.save()
        } else if (user && email){
            user.name = name
            user.email = email
            await user.save()
        } else if (password){
            user.password = password
            res.json({
                message: "Your Password is Successfully Changed!"
            })
            await user.save()
        } else {
            res.json({
                message: "Please Fill the Form!"
            })
        }
    } else{
        res.json({
            message: "User is Not Found!"
        })
    }
})

const findAllUser = asyncHandler(async (req, res) => {
    const user = await User.find()

    console.log(user)

    res.status(202).json(user)
})

module.exports = {
    createUser,
    authUser,
    deleteUser,
    updateUser,
    findAllUser
}