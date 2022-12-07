const {Technical} = require('../models/models')

exports.createTechnical = async(req, res) => {
    try{
        let {number, hard_soft} = req.body
        hard_soft = hard_soft.split(',')
        const technical = await Technical.create({number, hard_soft})
        res.status(201).json(technical)
    }catch (e){
        res.status(500).json({message: 'Что то пошло не так'})
    }
}

exports.deleteTechnical = async (req, res) => {
    try {
        const technical = await Technical.destroy({where: {id: req.params.id}})

        if(technical == 0){
            res.status(404).json({message: 'Мат-тех обеспечение не найдено!'})
        }else{
            res.status(201).json({message: 'Мат-тех обеспечение успешно удалено'})
        }
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.getTechnical = async (req,res) => {
    try {
        const technical = await Technical.findOne({where: {id: req.params.id}})
        if(technical == null){
            res.status(404).json({message: "Мат-тех обеспечение не найдено!"})
        }else{
            res.status(200).json(technical)

        }
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}

exports.updateTechnical = async (req, res) => {
    try {
        let {number, hard_soft} = req.body
        if(typeof hard_soft === "string" || hard_soft instanceof String){
            hard_soft = hard_soft.split(',')
        }
        const technical = await Technical.update({number, hard_soft}, {where: {id: req.params.id}})

        if(technical == 0){
            res.status(404).json({message: 'Мат-тех обеспечение не найдено!'})
        }else{
            res.status(201).json({message: 'Мат-тех обеспечение успешно обновлено!'})
        }

    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }

}

exports.getTechnicals = async (req, res) => {
    try {
        const technicals = await Technical.findAll()
        res.status(201).json(technicals)
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }
}