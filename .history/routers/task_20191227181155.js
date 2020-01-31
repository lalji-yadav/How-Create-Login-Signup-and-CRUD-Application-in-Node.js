const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
// var cors = require('cors')


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
      res.status(400).send(e)  
    }
})


router.get('/tasks', async (req, res ) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', async (req, res) => {
  
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

router.patch('/tasks/:id', async (req, res) => {
    const update = Object.keys(req.body)
    const allowedUpdates = ['taskName', '_id']
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

router.delete('/tasks/:id', async (req, res) => {

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

router.delete('/tasks', async (req, res ) => {
    try {
        const task = await Task.deleteMany(req.body)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
      return res.status(500).send()  
    }
})

module.exports = router
