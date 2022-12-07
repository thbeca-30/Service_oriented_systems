const {Teacher, Technical} = require('../models/models')

exports.createTeacher = async(req, res) => {
    try{
        let {full_name, zuns, hard_soft} = req.body
        if(typeof zuns === "string" || zuns instanceof String){
            zuns = zuns.split(',')
        }
        if(typeof hard_soft === "string" || hard_soft instanceof String){
            hard_soft = hard_soft.split(',')
        }
        const teacher = await Teacher.create({full_name, zuns, hard_soft})
        res.status(201).json(teacher)
    }catch (e){
        res.status(500).json({message: 'Что то пошло не так'})
    }
}

exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.destroy({where: {id: req.params.id}})


        if(teacher == 0){
            res.status(404).json({message: 'Преподаватель не найден!'})
        }else{
            res.status(201).json({message: 'Преподаватель успешно удален'})
        }
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.getTeacher = async (req,res) => {
    try {
        const teacher = await Teacher.findOne({where: {id: req.params.id}})
        if(teacher == null){
            res.status(404).json({message: "Преподаватель не найден!"})
        }else{
            res.status(200).json(teacher)

        }
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.updateTeacher = async (req, res) => {
    try {
        let {full_name, zuns, hard_soft} = req.body
        if(typeof zuns === "string" || zuns instanceof String){
            zuns = zuns.split(',')
        }
        if(typeof hard_soft === "string" || hard_soft instanceof String){
            hard_soft = hard_soft.split(',')
        }
        const teacher = await Teacher.update({full_name, zuns, hard_soft}, {where: {id: req.params.id}})


        if(teacher == 0){
            res.status(404).json({message: 'Преподаватель не найден!'})
        }else{
            res.status(201).json({message: 'Преподаватель успешно обновлен!'})
        }
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }

}

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll()
        res.status(201).json(teachers)
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}