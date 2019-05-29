const express = require('express')
const app = express()
const createTicket = require('../modules/usecases/createTicket')
const getTickets = require('../modules/usecases/getTickets')

app.use(express.json())
app.use(express.static('../public'));

app.get('/api/tickets', async (req, res) => {
    const error = null;

    const result =
       await
            getTickets
                .execute()
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

app.post('/api/tickets', async (req, res) => {
    const error = null;

    const ticket = {
        description: req.body.description
    }

    const result =
       await
            createTicket
                .execute(ticket)
                .catch(e => error = e)

    if (error) res.send(error)
    else res.send(result)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
