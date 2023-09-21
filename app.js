const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
/*Son requeridos para la creacion del bot*/
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

/*flow princiapl, cuando das algun saludo al bot*/
const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenas']).addAnswer(['🙌 Hola bienvenido al chat de la Clínica San Juan bautista', '¿Como te puedo ayudar el día de hoy?'])

/*flow de las citas y costos de los servicios*/
const flowappointment = addKeyword(['cita', 'costos de citas', 'precios de citas','costos', 'precios'])
                        .addAnswer('Para citas y costos, favor de marcar a los numeros 287 875 20 24 y 287 875 4145')
/*flow de los servicios*/
const flowgynecology = addKeyword(['ginecologo','ginecólogo', 'papanicola', 'ginecología']).addAnswer('Para citas y precios, favor de marcar al numero 287 164 1976')
const flowpediatrics = addKeyword(['pediatría','pediatria', 'pediatra', 'ninos']).addAnswer('Para citas y precios, favor de marcar al numero 287 877 8783')

/*flow de despedida*/
const flowsecundary = addKeyword('gracias').addAnswer('De nada!')

/*flow donde se pregunta si el usuario esta interesado en algun servicio*/
const flowAfirm = addKeyword(['si'],['s'],['sip']).addAnswer('¿En que servicio estas interesado?', null, null,[flowgynecology,flowpediatrics])
const flowNegat = addKeyword(['no'],['n'],['nop']).addAnswer('¿Que otra cosa puedo hacer por ti?', null, flowPrincipal)

const flowservices = addKeyword(['servicios', 'que servicios tienen', 'cuales son tus servicios', 'dame los servicios'])
                    .addAnswer('Nuestros servicios son los siguientes:', null, (ctx,{flowDynamic}) => {

                        flowDynamic([{body:'• Medicina general'}, {body:'• Papanicolao '}])
                         
                    }).addAnswer('¿Te interesa alguno de nuestros servicios?', {delay:1500}, null, [flowAfirm,flowNegat])
                    
                  
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowsecundary, flowservices, flowappointment,flowgynecology,flowpediatrics])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
