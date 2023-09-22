const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
/*Son requeridos para la creacion del bot*/
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

//flow principal, cuando das algun saludo al bot
const flowwelcome = addKeyword(['hola', 'ole', 'alo', 'buenas','buenos']).addAnswer(['🙌 Hola bienvenido a la Clínica San Juan bautista, estos son algunos de nuestros servicios:', 
                '\n1. - Medicina General 2.- Papanicolaou',
                '3.- Tomografía Computarizada',
                '4.- Ginecología y Obstetricia',
                '5.- Pedriatría 6.- Colposcopia',
                '7.- Mastografia 8.- Densitometría',
                '9.- Hospitalización 10.- Rayos X',
                '11.- Cirugía laparoscopica', 
                '12.- Ultrasonidos',
                '13.- Biopsias guíadas por ultrasonido',
                '14.- Estudios Especiales contrastados',
                '15.- Electrocardiogramas',       
                '16.- Consulta externa y ugencias',
                '17.- Servicios de transfusión sanguinea',
                '18.- Laboratorio clinico',

                '\nTeclea el numero del servicio que te interesa'])

//ejemplo de buttons
/*const X = addKeyword('botones').addAnswer("Como puedo ayudarte?", {
    delay: 5000,
    buttons: [
      { body: "😎 Cursos" },
      { body: "👉 Youtube" },
      { body: "😁 Telegram" },
    ],
  })*/

/*flow de costos o precios de intenciones de los servicios*/
const flowpapcost = addKeyword(['costo','precio','precio papanicolao', 'costo del papanicolao']).addAnswer('Para costo del papanicolaou, comunicate al numero 287 164 1976')

                      
/*flow de los servicios*/
const flowgenmed = addKeyword(['1','medicina general','general','medicina', 'med gen', 'mdicina','gral']).addAnswer('Para citas y precios en los estudios de tomografía, favor de marcar a los numeros 287 875 20 24 y 287 875 4145')
const flowpap = addKeyword(['2','papanicolao','papanicola','hacen papanicolaou','realizan papanicolaou', 'hace papanicolaou','hac papanicolaou','hce papanicolaou', 'ace papanicolaou', 'hacen papanicolao','realizan papanicolao', 'hace papanicolao','hac papanicolao','hce papanicolao', 'ace papanicolao'])
               .addAnswer('En clínica San Juan Bautista ofrecemos el servicio de Papanicolau, estamos comprometidos con la salud y el bienestar de nuestras pacientes',{delay:1500}, null, flowpapcost)
const flowtomography = addKeyword(['3','tomografía','tomografia','tomo']).addAnswer('Para citas y precios en los estudios de tomografía, favor de marcar a los numeros 287 875 20 24 y 287 875 4145')
const flowgynecology = addKeyword(['4','ginecologo','ginecólogo','ginecología', 'ginecologia', 'gine']).addAnswer('Para citas y precios del servicio de ginecología, favor de marcar al numero 287 164 1976')
const flowpediatrics = addKeyword(['5','pediatría','pediatria', 'pediatra', 'niños']).addAnswer('Para citas y precios del servicio de pediatría, favor de marcar al numero 287 877 8783')
const flowultrasound = addKeyword(['12','ultra', 'ultrasonido','ultrasonidos']).addAnswer('Para citas y precios para el servicio de ultrasonido, favor de marcar al numero 287 124 2117')

/*flow de las citas y costos de los servicios en general*/
const flowappointment = addKeyword(['cita', 'costos de citas', 'precios de citas','costos', 'precios'])
                        .addAnswer('Para citas y costos, favor de marcar a los numeros 287 875 20 24 y 287 875 4145')

/*flow de despedida*/
const flowsecundary = addKeyword('gracias').addAnswer('De nada!, fue un gusto atenderte, excelente resto del día')
const flowNone = addKeyword(['nada','nda','nad']).addAnswer('Que tengas un excelente resto del día')

/*flow donde se pregunta si el usuario esta interesado en algun servicio
const flowAfirm = addKeyword(['si','s','sip']).addAnswer('¿En que servicio estas interesado?', null, null,[flowgynecology,flowpediatrics,flowtomography])
const flowNegat = addKeyword(['no','n','nop']).addAnswer('¿Que otra cosa puedo hacer por ti?',{delay:1500}, null, flowNone)*/
                  
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowwelcome , flowsecundary, flowappointment,flowgynecology,flowpediatrics,flowultrasound, flowpap, flowNone ])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
