const {Discipline, Technical, Teacher} = require('../models/models')

exports.createDiscipline = async(req, res) => {
    try{
        let {name, zuns, zunsOUT, hard_soft, prepod} = req.body
        zuns = zuns.split(',')
        hard_soft = hard_soft.split(',')
        zunsOUT = zunsOUT.split(',')
        const discipline = await Discipline.create({name, zuns, zunsOUT, hard_soft, prepod})
        res.status(201).json(discipline)
    }catch (e){
        res.status(500).json({message: e.message})
    }
}

exports.deleteDiscipline = async (req, res) => {
    try {
        const discipline = await Discipline.destroy({where: {id: req.params.id}})
        console.log(discipline)
        if(discipline == 0){
            res.status(404).json({message: 'Дисциплина не найдена!'})
        }else{
            res.status(201).json({message: 'Дисциплина успешно удалена!'})
        }
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.getDiscipline = async (req,res) => {
    try {
        const discipline = await Discipline.findOne({where: {id: req.params.id}})
        if(discipline == null){
            res.status(404).json({message: "Пользователь не найден!"})
        }else{
            res.status(200).json(discipline)
        }

    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.updateDiscipline = async (req, res) => {
    try {
        //console.log(req.body)
        let {name, zuns, zunsOUT, hard_soft, prepod} = req.body
        if(typeof zuns === "string" || zuns instanceof String){
            zuns = zuns.split(',')
        }
        if(typeof hard_soft === "string" || hard_soft instanceof String){
            hard_soft = hard_soft.split(',')
        }
        if(typeof zunsOUT === "string" || hard_soft instanceof String){
            zunsOUT = zunsOUT.split(',')
        }
        const discipline = await Discipline.update({name, zuns, zunsOUT, hard_soft, prepod}, {where: {id: req.params.id}})
        console.log(discipline)
        if(discipline == 0){
            res.status(404).json({message: 'Дисциплина не найдена!'})
        }else{
            res.status(201).json({message: 'Дисциплина успешно обновлена!'})
        }

    }
    catch (e) {
        res.status(500).json({message: e.message})
    }

}

exports.getDisciplines = async (req, res) => {
    try{
        const disciplines = await Discipline.findAll()
        return res.status(201).json(disciplines)
    }catch (e) {
        return res.status(500).json({message: "Что-то пошло не так..."})
    }
}