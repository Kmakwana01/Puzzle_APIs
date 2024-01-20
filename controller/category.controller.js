let CATEGORY = require('../model/category.model')
let fs = require('fs')

exports.add = async (req, res) => {
    try {
        if (req.file) req.body.image = req?.file?.filename

        if (!req.body.name || !req.body.image) throw new Error('please enter valid fields')

        const data = await CATEGORY.create(req.body)
        res.status(201).json({
            status: 'success',
            data: data
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 'fail'
        })
    }
}
exports.show = async (req, res) => {
    console.log(process?.env.SECRET_KEY)
    try {
        const data = await CATEGORY.find()
        res.status(201).json({
            status: 'success',
            data: data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 'fail'
        })
    }
}
exports.update = async (req, res) => {
    try {
        const { id } = req.query

        if (!id) throw new Error('please enter id')

        if (req.file) req.body.image = req?.file?.filename

        const data = await CATEGORY.findByIdAndUpdate(id, req.body, { new: true })

        if (!data) throw new Error('please enter valid id')

        res.status(201).json({
            status: 'success',
            message: 'updated data',
            data: data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 'fail'
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.query

        if (!id) throw new Error('please enter id')

        const category = await CATEGORY.findById(id)
        console.log(category)

        fs.unlink(`./public/images/${category?.image}`, function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });

        const data = await CATEGORY.findByIdAndDelete(id)

        if (!data) throw new Error('please enter valid id')

        res.status(201).json({
            status: 'success',
            message: 'Deleted Data',
            data: data
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: 'fail'
        })
    }
}