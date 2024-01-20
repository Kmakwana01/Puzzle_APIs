let bcrypt = require('bcrypt')
let USER = require('../model/user.model')
let secreKey = 'Puzzle_api'
let jwt = require('jsonwebtoken')

exports.Signup = async (req, res) => {
    try {

        req.body.password = await bcrypt.hash(req.body.password,9)

        const { name, email, password, gender,username } = req?.body

        if (!name || !email || !password || !username) throw new Error('please enter valid fields')

        const user = await USER.create(req.body)

        const token = jwt.sign({ username : user?.username , email : user?.email ,id : user._id }, secreKey);

        res.status(201).json({
            status: 'success',
            user: user,
            token
        })

    } catch (error) {
        res.status(400).json({
            status: 'success',
            message: error.message
        })
    }
}

exports.login = async (req, res) => {

    try {
        const { name, email, password, gender ,username } = req.body

        const user = await USER.findOne({
            $or : [{email},{username}]
        })

        if(!user) throw new Error('please enter valid data')

        const checkPass = await bcrypt.compare(password,user.password)

        if(!checkPass) throw new Error('please enter valid password')
        
        const token = jwt.sign({ username : user?.username , email : user?.email ,id : user._id }, secreKey);
        
        res.status(201).json({
            status: 'success',
            user: user,
            token
        })

    } catch (error) {
        res.status(400).json({
            status: 'success',
            message: error.message
        })
    }
}