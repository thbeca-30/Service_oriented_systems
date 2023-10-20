const {Brick, Discipline, Technical, Teacher } = require('../models/models')
const fs = require("fs");
const { Op } = require('sequelize')

function contains(where, what){
    for(var i=0; i<what.length; i++){
        if(where.indexOf(what[i]) == -1) return false;
    }
    return true;
}

exports.getBricks = async (req, res) => {
    try{
        let bricks = []
        await Brick.destroy({where: {}, truncate: true})
        const disciplines = await Discipline.findAll()
        const technical = await Technical.findAll()
        const teachers = await Teacher.findAll()
        disciplines.forEach( n => {
            technical.forEach(n1 => {
                teachers.forEach(n2 => {
                    if(contains(n1['hard_soft'], n['hard_soft']) && contains(n2['zuns'], n['zuns']) && contains(n2['hard_soft'], n1['hard_soft'])){
                        Brick.create({name: n['name'], number: n1['number'], full_name: n2['full_name'], zuns: n2['zuns'], hard_soft: n2['hard_soft']})
                        bricks.push([n['name'], n1['number'], n2['full_name']])
                    }
                })
            })
        })
        res.status(201).json(bricks)
    }catch (e){
        res.status(500).json({message: 'Что то пошло не так'})
    }
}

exports.getBricksForGraph = async (req, res) =>{
    try{
        const fs = require('fs')
        let i = 1;
        let bricks = {nodes: [], links: []}
        await Brick.destroy({where: {}, truncate: true})
        const disciplines = await Discipline.findAll()
        const technical = await Technical.findAll()
        const teachers = await Teacher.findAll()
        disciplines.forEach( n => {
            technical.forEach(n1 => {
                teachers.forEach(n2 => {
                    if(contains(n1['hard_soft'], n['hard_soft']) &&
                        contains(n2['zuns'], n['zuns']) &&
                        contains(n2['hard_soft'], n1['hard_soft'])){
                        Brick.create({name: n['name'], number: n1['number'], full_name: n2['full_name'], zuns: n2['zuns'], zunsOUT: n2['zunsOUT'], hard_soft: n2['hard_soft']})
                        bricks.nodes.push(
                            {
                                "id": i,
                                "name": n['name'],
                                "type": "discipline"
                            },
                            {
                                "id": i + 1,
                                "name": n1['number'],
                                "type": "technical"
                            },
                            {
                                "id": i + 2,
                                "name": n2['full_name'],
                                "type": "teacher"
                            }
                        )
                        bricks.links.push(
                            {
                                "source": i,
                                "target": i + 2
                            },
                            {
                                "source": i + 1,
                                "target": i
                            },
                            {
                                "source": i + 2,
                                "target": i + 1
                            }
                        )
                        i+=3
                    }
                })
            })
        })
        let id1 = 0
        let id2 = 0
        disciplines.forEach((n, i) => {
            disciplines.forEach((n1, j) => {
                if(i != 0){
                    if (JSON.stringify(n['zunsOUT']) === JSON.stringify(n1['zuns'])){
                        console.log("Первое условие ")
                        bricks.nodes.forEach(n2 => {
                            if(JSON.stringify(n2['name']) ===  JSON.stringify(n['name'])){
                                id1 = n2['id']
                            }
                        })
                        bricks.nodes.forEach(n2 => {
                            if(JSON.stringify(n2['name']) === JSON.stringify(n1['name'])){
                                id2 = n2['id']
                            }
                        })
                        bricks.links.push(
                            {
                                "source": id1,
                                "target": id2
                            }
                        )
                    }
                    if (JSON.stringify(n1['zunsOUT']) === JSON.stringify(n['zuns'])){
                        console.log("Второе условие ")
                        bricks.nodes.forEach(n2 => {
                            if(JSON.stringify(n2['name']) === JSON.stringify(n1['name'])){
                                id1 = n2['id']
                            }
                        })
                        bricks.nodes.forEach(n2 => {
                            if(JSON.stringify(n2['name']) ===  JSON.stringify(n['name'])){
                                id2 = n2['id']
                            }
                        })
                        bricks.links.push(
                            {
                                "source": id1,
                                "target": id2
                            }
                        )
                    }
                }
            })
        })
        console.log(id1, id2)
        fs.writeFileSync('./client/src/data/data.json', JSON.stringify(bricks));
        res.status(201).json(bricks)
    }catch (e){
        res.status(500).json({message: 'Что то пошло не так'})
    }
}

exports.getBricksForGraphFilter = async (req, res) =>{
    try {
        let {zuns, hard_soft} = req.body
        //console.log(typeof(zuns))
        //if(typeof zuns === "string" || zuns instanceof String){
        // console.log(zuns)
        // zuns = Object.values(zuns)
        // console.log(zuns)
        let zuns1 = zuns.toString().split(',')
        let hard_soft1 = hard_soft.toString().split(',')
        //console.log(search)
        //}
        const fs = require('fs')
        let i = 1;
        let bricks = {nodes: [], links: []}
        // const disciplines = await Discipline.findAll({where: {zuns: search}})
        // const technical = await Technical.findAll()
        // const teachers = await Teacher.findAll({where: {zuns: search}})
        let bricks0 = await Brick.findAll({
            where: {
                [Op.or]: [{
                    zuns: zuns1,
                    hard_soft: hard_soft1
                }]

            }
        })
        // bricks0 = bricks0.map(n => {
        //     n.zuns.filter(n1 => n1.includes(zuns1))
        // })
        console.log(bricks0)
        bricks0.forEach(n => {
            bricks.nodes.push(
                {
                    "id": i,
                    "name": n['name'],
                    "type": "discipline"
                },
                {
                    "id": i + 1,
                    "name": n['number'],
                    "type": "technical"
                },
                {
                    "id": i + 2,
                    "name": n['full_name'],
                    "type": "teacher"
                }
            )
            bricks.links.push(
                {
                    "source": i,
                    "target": i + 2
                },
                {
                    "source": i + 1,
                    "target": i
                },
                {
                    "source": i + 2,
                    "target": i + 1
                }
            )
            i += 3
        })

        fs.writeFileSync('./client/src/data/data.json', JSON.stringify(bricks));
        res.status(201).json(bricks)
    }catch (e){
        res.status(500).json({message: 'Что то пошло не так'})
    }
}

exports.testMethod = async (req, res) => {
    try{
        let {zuns} = req.body
    }catch (e){
    res.status(500).json({message: 'Что то пошло не так'})
}
}
