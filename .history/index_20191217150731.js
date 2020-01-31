const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRrouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRrouter)



app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
      res.status(400).send(e)  
    }
})

/* ---------------------------Read user collection data Data------------------------------------ */

/* ---------------------------Read Task collection Data------------------------------------ */

app.get('/tasks', async (req, res ) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})

/* ---------------------------Read Task collection Data using id------------------------------------ */

app.get('/tasks/:id', async (req, res) => {
  
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

/* ---------------------------patch or update Task collection Data using id------------------------------------ */

app.patch('/tasks/:id', async (req, res) => {
    const update = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
   const isValidOperation = update.every((update) => {
       return allowedUpdates.includes(update)
   }) 
    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Operation'})
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!task) {
           return res.status(404).send() 
        }
        res.send(task)    
    } catch (e) {
        req.status(400).send(e)
    }
})

/*-----------------------------------------Delete User model data----------------------------- */
app.delete('/tasks/:id', async (req, res) => {

    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})