const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const user = new User(req.body)
     
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

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
app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
       res.status(500).send() 
    }
})

/* ---------------------------Read user collection Data using id------------------------------------ */

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

/* ---------------------------patch or update user collection Data using id------------------------------------ */

app.patch('/users/:id', async (req, res) => {
     const update = Object.keys(req.body)
     const allowedUpdates = ['name', 'age', 'email', 'password']
     const isValidOperation = update.every((update) => {
         return allowedUpdates.includes(update)
     })
     
     if(!isValidOperation) {
         return res.status(400).send({ error: 'Invalid Operation'})
     }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!user) {
           return res.status(404).send() 
        }
        res.send(user)  
    } catch (e) {
        res.status(400).send(e)
    }
})

/*-----------------------------------------Delete User model data----------------------------- */

app.delete('/users/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})
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