const {Discipline, Technical, Teacher } = require('../models/models')

exports.getComponents = async(req, res) => {
    try{
        let data = []
        const disciplines = await Discipline.findAll()
        const technical = await Technical.findAll()
        const teachers = await Teacher.findAll()
        data.push(disciplines, technical, teachers)
        console.log(data)
        res.status(200).json(data)
    }catch (e){
        res.status(500).json({message: e.message})
    }

}