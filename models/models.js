const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Discipline = sequelize.define('discipline', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    zuns: {type: DataTypes.ARRAY(DataTypes.STRING)},
    zunsOUT: {type: DataTypes.ARRAY(DataTypes.STRING)},
    hard_soft: {type: DataTypes.ARRAY(DataTypes.STRING)},
    prepod: {type: DataTypes.STRING}
})

const Technical = sequelize.define('technical', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    number: {type: DataTypes.INTEGER},
    hard_soft: {type: DataTypes.ARRAY(DataTypes.STRING)}
})

const Teacher = sequelize.define('teacher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    full_name: {type: DataTypes.STRING},
    zuns: {type: DataTypes.ARRAY(DataTypes.STRING)},
    hard_soft: {type: DataTypes.ARRAY(DataTypes.STRING)}
})

const Brick = sequelize.define('brick', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    number: {type: DataTypes.INTEGER},
    full_name: {type: DataTypes.STRING},
    zuns: {type: DataTypes.ARRAY(DataTypes.STRING)},
    zunsOUT: {type: DataTypes.ARRAY(DataTypes.STRING)},
    hard_soft: {type: DataTypes.ARRAY(DataTypes.STRING)}
})

module.exports = {
    User, Discipline, Technical, Teacher, Brick
}