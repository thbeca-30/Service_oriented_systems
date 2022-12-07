const {User, Technical} = require('../models/models')
const ApiError = require('../error/ApiError')
const bcrypt= require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

exports.registration = async (req, res, next) => {
    const {email, password, role} = req.body
    if(!email || !password){
        return next(ApiError.badRequest('Некорректный email или пароль!'))
    }

    const candidate = await User.findOne({where: {email}})
    if(candidate){
        return next(ApiError.badRequest('Пользователь с таким email уже существует!'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({email, role, password:hashPassword})
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})
}

exports.login = async (req, res, next) => {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if(!user){
        return next(ApiError.internal('Пользователь не найден!'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if(!comparePassword){
        return next(ApiError.internal('Указан неверный пароль!'))
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({token})

}

exports.check = async (req, res, next) => {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        //console.log(users)
        res.status(201).json(users)
    }
    catch (e) {
        res.status(500).json({message: "Что-то пошло не так..."})
    }

}