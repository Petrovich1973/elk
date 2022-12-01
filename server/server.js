const jsonServer = require('json-server')
const server = jsonServer.create()
const db = require('./db.json')
const axios = require('axios')
const bodyParser = require('body-parser')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(bodyParser.json())

const PORT = 3001

const DB_ADDRESS = 'http://localhost'
const DB_PORT = 3002
const DB_URL = `${DB_ADDRESS}:${DB_PORT}`

server.post('/journal', async (req, res) => {
    // console.log(req.params)
    // console.log(req.body)
    // console.log(req.query)

    const response = {
        "pageable": {
            "sort": {
                "sorted": false,
                "unsorted": true,
                "empty": true
            },
            "pageNumber": 0,
            "pageSize": 2,
            "offset": 0,
            "paged": true,
            "unpaged": false
        },
        "totalPages": 3,
        "totalElements": 6,
        "last": false,
        "numberOfElements": 2,
        "number": 0,
        "sort": {
            "sorted": false,
            "unsorted": true,
            "empty": true
        },
        "first": true,
        "size": 2,
        "empty": false
    }

    const {data} = await axios.get(`${DB_URL}/journal`)

    res.send({...response, content: data})
})

server.listen(PORT, () => {
    console.log(`Сервер стартовал по адресу http://localhost:${PORT}`)
})