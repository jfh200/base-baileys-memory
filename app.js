const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas']).addAnswer(['🙌 Hola bienvenido al chat de la Clínica San Juan bautista', '¿Como te puedo ayudar el día de hoy?'])

const flowsecundary = addKeyword('gracias').addAnswer('De nada!')
const flowinterest = addKeyword(['si', 'medicina general', 'papanicolao']).addAnswer('en construccion')
const flowservices = addKeyword(['servicios', 'que servicios tienen', 'cuales son tus servicios', 'dame los servicios'])
                    .addAnswer('Nuestros servicios son los siguientes:', null, (ctx,{flowDynamic}) => {

                        flowDynamic([{body:'• Medicina general'}, {body:'• Papanicolao '}])
                        


                    })/* Fin de flowservices */

                    .addAnswer('¿Te interesa alguno de nuestros servicios?', {delay:1500}, null, [flowinterest])

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowsecundary, flowservices])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
