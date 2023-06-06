const jsonServer = require('json-server')
const server = jsonServer.create()
const db = require('./db.json')
const axios = require('axios')
const bodyParser = require('body-parser')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(bodyParser.json())

const PORT = 4001

const DB_ADDRESS = 'http://localhost'
const DB_PORT = 4002
const DB_URL = `${DB_ADDRESS}:${DB_PORT}`

const delay = ms => new Promise(yea => setTimeout(yea, ms))

server.get('/test', async (req, res) => {
    await delay(2000)
    res.send({date: Date.now()})
})

server.post('/journal', async (req, res) => {

    const response = {
        "pageable": {
            "sort": {
                "empty": true,
                "unsorted": true,
                "sorted": false
            },
            "offset": 0,
            "pageNumber": 0,
            "pageSize": 20,
            "paged": true,
            "unpaged": false
        },
        "totalElements": 3866,
        "totalPages": 194,
        "last": false,
        "number": 0,
        "sort": {
            "empty": true,
            "unsorted": true,
            "sorted": false
        },
        "size": 20,
        "numberOfElements": 20,
        "first": true,
        "empty": false
    }

    const {data} = await axios.get(`${DB_URL}/journal`)

    res.send({...response, content: data})
    // res.status(500).send("Текст ошибки получения журнала")
})

server.get('/journal/filter', async (req, res) => {

    const {data} = await axios.get(`${DB_URL}/filter`)

    res.send(data)
    // res.status(500).send("Текст ошибки получения фильтров")
})

server.listen(PORT, () => {
    console.log(`Сервер стартовал по адресу http://localhost:${PORT}`)
})
