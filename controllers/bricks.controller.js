const {Brick, Discipline, Technical, Teacher } = require('../models/models')

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
                        Brick.create({name: n['name'], number: n1['number'], full_name: n2['full_name']})
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
                        Brick.create({name: n['name'], number: n1['number'], full_name: n2['full_name']})
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
        fs.writeFileSync('./client/src/data/data.json', JSON.stringify(bricks));
        res.status(201).json(bricks)
    }catch (e){
        res.status(500).json({message: 'Что то пошло не так'})
    }
}

// exports.getAllForOne = async (req, res) => {
//    try{
//        let forDisciplines = []
//        const disciplines = await Discipline.findAll()
//        const technicals = await Technical.findAll()
//        const teachers = await Teacher.findAll()
//        disciplines.forEach(discipline =>{
//            technicals.forEach(technical => {
//                teachers.forEach(teacher =>{
//                    if(contains(teacher['hard_soft'], discipline['hard_soft']) &&
//                        (contains(technical['hard_soft'], discipline['hard_soft']))){
//                        forDisciplines.push([discipline, technical, teacher])
//                    }
//                })
//            })
//        })
//        res.status(201).json(forDisciplines)
//    }catch (e){
//        res.status(500).json({message: e.message})
//    }
// }