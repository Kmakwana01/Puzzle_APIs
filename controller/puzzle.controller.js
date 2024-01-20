let PUZZLE = require('../model/puzzle.model')

exports.add = async (req, res) => {
    try {
        console.log(req.body)
        if(req.file) req.body.image = req.file?.filename

        if (!req.body.category || !req.body.image || !req.body.ans) throw new Error('please enter valid fields')

        const data = await PUZZLE.create(req.body)
        
        res.status(201).json({
            status : 'success',
            data : data
        })

    } catch (error) {
        res.status(400).json({
            message : error.message,
            status : 'fail'
        })
    }
}
exports.show = async (req, res) => {
    try {
        const data = await PUZZLE.find().populate("category");
        res.status(201).json({
            status : 'success',
            data : data
        })
    } catch (error) {
        res.status(400).json({
            message : error.message,
            status : 'fail'
        })
    }
}
exports.update = async (req, res) => {
    try {
        const {id} = req?.query

        if(!id) throw new Error('please enter id')

        if(req.file) req.body.image = req.file.filename

        const data = await PUZZLE.findByIdAndUpdate(id,req.body,{new : true})

        if(!data) throw new Error('please enter valid id')

        res.status(201).json({
            status : 'success',
            data : data
        })
    } catch (error) {
        res.status(400).json({
            message : error.message,
            status : 'fail'
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const {id} = req.query

        if(!id) throw new Error('please enter id')

        const data = await PUZZLE.findByIdAndDelete(id)

        if(!data) throw new Error('please enter valid id')

        res.status(201).json({
            status : 'success',
            message : 'Deleted Data',
            data : data
        })
    } catch (error) {
        res.status(400).json({
            message : error.message,
            status : 'fail'
        })
    }
}