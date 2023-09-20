const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas']).addAnswer(['🙌 Hola bienvenido al chat de la Clínica San Juan bautista', '¿Como te puedo ayudar el día de hoy?'])

const flowappointment = addKeyword(['cita', 'costos de citas', 'precios de citas','costos', 'precios'])
                        .addAnswer('Para citas y costos, favor de marcar a los numeros 287 875 20 24 y 287 875 4145')

const flowgynecology = addKeyword(['ginecologo','ginecólogo', 'papanicola', 'ginecología']).addAnswer('Para citas y precios, favor de marcar al numero 287 164 1976')
const flowpediatrics = addKeyword(['pediatría','pediatria', 'pediatra', 'niños']).addAnswer('Para citas y precios, favor de marcar al numero 287 877 8783')

const flowsecundary = addKeyword('gracias').addAnswer('De nada!')

const flowinterest = addKeyword(['si', 'correcto']).addAnswer('¿En que servicio estas interesado?', null, null,[flowgynecology,flowpediatrics])

const flowservices = addKeyword(['servicios', 'que servicios tienen', 'cuales son tus servicios', 'dame los servicios'])
                    .addAnswer('Nuestros servicios son los siguientes:', null, (ctx,{flowDynamic}) => {

                        flowDynamic([{body:'• Medicina general'}, {body:'• Papanicolao '}])
                        


                    })/* Fin de flowservices */

                    .addAnswer('¿Te interesa alguno de nuestros servicios?', {delay:1500}, null, [flowinterest])

               

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowsecundary, flowservices, flowappointment, flowgynecology, flowpediatrics])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
