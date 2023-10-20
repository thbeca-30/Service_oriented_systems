require('dotenv').config()
const express = require('express')
const sequelize = require('./database')
const models = require('./models/models')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')


const disciplineRouter = require('./routes/discipline.routes')
const technicalRouter = require('./routes/technical.routes')
const teacherRouter = require('./routes/teacher.routes')
const bricksRouter = require('./routes/bricks.routes')
const componentsRouter = require('./routes/components.routes')
const userRouter = require('./routes/user.routes')
const neoRouter = require('./routes/neo4j.routes')

const errorHandler = require('./middleware/ErrorHandlingMiddleware')
// const neo4j = require("neo4j-driver")

const PORT = process.env.PORT || 5000

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Educational units API",
            version: "1.0.0",
            description: "Educational units API"
        },
        servers: [
            {
                url: "http://localhost:5000"
            },
        ],

    },
    apis: ["./routes/*.js"],
}

const specs = swaggerJsDoc(options)


const app = express()
app.use(cors())
app.use(express.json({extended:true}))

// const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'admin'))
// const session = driver.session({database: 'Components'})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use('/api/disciplines', disciplineRouter)
app.use('/api/technicals', technicalRouter)
app.use('/api/teachers', teacherRouter)
app.use('/api/bricks', bricksRouter)
app.use('/api/components', componentsRouter)
app.use('/api/users', userRouter)
app.use('/neo/bricks', neoRouter)

app.use(errorHandler)


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
        app.listen(4000)
    }catch (e){
        console.log(e)
    }
}

start()
