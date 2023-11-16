const asyncHandler = require('express-async-handler')
const { Resend } = require('resend')
const User = require('../models/userModel.js')

const sendEmail = asyncHandler(async (req, res) => {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { method } = req;

    const { email, title, message } = req.body;

    if (!email || !title || !message) {
        res.status(400)
        throw new Error('Preencha todos os campos')
    }

    switch (method) {
        case "POST": {
            const data = await resend.sendEmail({
                from: 'Acecap <contato.produtor@igcafe.shop>',
                to: `${email}`, // TODO: change to `email
                subject: `${title}`, // TODO: change to `title
                html: `
                <h4>Atenção Associado, </h4>
                <p>${message}</p> <br>
                <p>Atenciosamente, </p>

                <p>Direção Acecap</p>                 
                `
            });

            return res.status(200).send(data);
        }
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Método ${method} Não é permitido`);
    }
})

const senConvocationEmail = asyncHandler(async (req, res) => {

    const { typeReunion, title } = req.body

    let roles = []

    if (typeReunion.administrativa) {
        roles.push('presidente', 'secretario', 'admin', 'tesoureiro')
    }

    if (typeReunion.assembleia_ordinaria) {
        roles.push('presidente', 'secretario', 'admin', 'tesoureiro', 'produtor')
    }

    if (typeReunion.assembleia_extraordinaria) {
        roles.push('presidente', 'secretario', 'admin', 'tesoureiro', 'produtor')
    }

    const usersAssociates = await User.find({ role: { $in: roles } })

    const emails = usersAssociates.map(user => (user.email))

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { method } = req;

    const { message, date } = req.body;

    if (!date || !message) {
        res.status(400)
        throw new Error('Preencha todos os campos')
    }

    switch (method) {
        case "POST": {
            const data = await resend.sendEmail({
                from: 'Acecap <reuniao.associados@igcafe.shop>',
                to: emails, // TODO: change to `email
                subject: title, // TODO: change to `title
                html:
                    `
                <h4>Atenção Associado, </h4>
                <p>${message}</p> <br> 
                <h4>Data: ${date}</h4>
                <p>Atenciosamente, </p>
                
                <p>Direção Acecap</p>      
            `
            });

            return res.status(200).send(data);

        } default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Método ${method} Não é permitido`);
    }
})

const sendRelatoryEmail = asyncHandler(async (req, res) => {

    const { type, email, result } = req.body

    let title = ''

    if (type === 'analise_pedido') {
        title = 'Análise de Pedido'
    }

    if (type === 'vistoria') {
        title = 'Vistoria'
    }

    if (type === 'analise_laboratorial') {
        title = 'Análise Laboratorial'
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    if (!email || !type) {
        res.status(400)
        throw new Error('Preencha todos os campos')
    }

    try {
        const data = await resend.sendEmail({
            from: 'Acecap <credencial.produtor@igcafe.shop>',
            to: `${email}`, // TODO: change to `email
            subject: title, // TODO: change to `title
            html: `<h4>Atenção Produtor, </h4>

                <p>Seu relatório de ${title} foi <h4>${result}</h4></p> 
                
                <p>Para mais informações, entre em contato com a associação. Ou acesse o site <a href="www.igcafe.shop">Acecap</a>.</p> 
                
                <p>Atenciosamente, </p>

                <h4>Direção Acecap</h4>

                `
        });

        return res.status(200).send(data);

    } catch (error) {
        console.log(error)

    }
})

const sendProductRelatoryEmail = asyncHandler(async (req, res) => {

    const { type, email, result, produto } = req.body

    let title = ''
    let typeEmail = ''

    if (type === 'analise_pedido') {
        title = `Análise de Pedido - ${produto}`
        typeEmail = "Análise de Pedido"
    }

    if (type === 'vistoria') {
        title = `Vistoria - ${produto}`
        typeEmail = 'Vistoria'
    }

    if (type === 'analise_laboratorial') {
        title = `Análise Laboratorial - ${produto}`
        typeEmail = "Análise Laboratorial"
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    if (!email || !type) {
        res.status(400)
        throw new Error('Preencha todos os campos')
    }

    try {
        const data = await resend.sendEmail({
            from: 'Acecap <produto.analise@igcafe.shop>',
            to: `${email}`, // TODO: change to `email
            subject: title, // TODO: change to `title
            html: `<h4>Atenção Produtor, </h4>

                <p>O relatório do produto ${produto} na ${typeEmail} foi <h4>${result}</h4></p> 
                
                <p>Para mais informações, entre em contato com a associação. Ou acesse o site <a href="www.igcafe.shop">Acecap</a>.</p> 
                
                <p>Atenciosamente, </p>

                <h4>Direção Acecap</h4>

                `
        });

        return res.status(200).send(data);

    } catch (error) {
        console.log(error)

    }
})

const sendRecursoEmail = asyncHandler(async (req, res) => {

    const { email, result } = req.body


    const resend = new Resend(process.env.RESEND_API_KEY)

    if (!email || !result) {
        res.status(400)
        throw new Error('Preencha todos os campos')
    }

    try {
        const data = await resend.sendEmail({
            from: 'Acecap <recurso.produtor@igcafe.shop>',
            to: `${email}`, // TODO: change to `email
            subject: 'Análise do Recurso', // TODO: change to `title
            html: `<h4>Atenção Produtor, </h4>

                <p>Seu recurso da Análise do pedido foi <h4>${result}</h4></p> 
                
                <p>Para mais informações, entre em contato com a associação. Ou acesse o site <a href="www.igcafe.shop">Acecap</a>.</p> 
                
                <p>Atenciosamente, </p>

                <h4>Direção Acecap</h4>

                `
        });

        return res.status(200).send(data);

    } catch (error) {
        console.log(error)

    }
})


// codigo de reset de senha

const sendResetEmail = asyncHandler(async (req, res) => {

    const { email } = req.body
    const emailExists = await User.findOne({ "dados_pessoais.email": email })

    const token = genterateResetCode()

    const resend = new Resend(process.env.RESEND_API_KEY)

    if (!email) {
        res.status(400)
        throw new Error('Insira seu email')
    }

    if (!emailExists) {
        res.status(400)
        throw new Error('Email não encontrado')
    }

    if (!token) {
        res.status(400)
        throw new Error('Erro ao gerar código de validação')
    }

    try {
        const data = await resend.sendEmail({
            from: 'Acecap <redifinir.senha@igcafe.shop>',
            to: `${email}`, // TODO: change to `email
            subject: 'Redefinição de Senha', // TODO: change to `title
            html: `<p>Atenção Produtor, </p>

                <p>Para redefinir sua senha, insira o seguinte código de validação.</p> 
                
                <h4>${token}</h4> 
                
                <p>Atenciosamente, </p>

                <p>Direção Acecap</p>

                `
        });

        return res.status(200).json(token);

    } catch (error) {
        console.log(error)

    }
})

// gerar código de reset de senha
const genterateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000)
}

module.exports = { sendEmail, senConvocationEmail, sendRelatoryEmail, sendRecursoEmail, sendProductRelatoryEmail, sendResetEmail }