const neo4j = require('neo4j-driver')

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('admin', 'admin'))
const session = driver.session({database: 'neo4j'})


exports.findAll = async () =>{

    const result = await session.run(`Match (n) return n`)
    //console.log(result)
    return result.records.map(i=>i.get('n').properties)
}