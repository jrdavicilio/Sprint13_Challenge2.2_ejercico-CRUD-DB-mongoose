const express = require ('express')
const router = express.Router()
const Task = require ('../models/Task')
const { error } = require('console')

router.post ('/create', async (req, res) => {
    try {
        const newTask = await Task.create(req.body)
        res.status(201).send(newTask)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to create the task'})
    }
})

router.get ('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).send(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).send ({message: 'There was a problem trying to get all the tasks'})
    }
})

router.get ('/id/:id', async (req, res) => {
    try {
        const idTask = await Task.findById(req.params.id)
        if (!idTask) {
            return res.status(404).send({message: 'Task not found'})
        }
        res.status(200).send(idTask)
    } catch (error) {
        console.error(error)
        res.status(500).send ({message: 'There was a problem trying to get this specific task'})
    }
})

router.put ('/markAsCompleted/:id', async (req, res) => {
    try {
        const completedTask = await Task.findByIdAndUpdate(req.params.id, {completed: true}, {new: true})
        if(!completedTask) {
            return res.status(404).send({message: 'Task not found'})
        }
        res.status(200).send(completedTask)
    } catch (error) {
        console.error (error)
        res.status(500).send({message: 'There was a problem trying to mark this task as completed'})
    }
})

router.put ('/id/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, {title: req.body.title}, {new: true})
        if(!updatedTask) {
            return res.status(404).send({message: 'Task not found'})
        }
        res.status(200).send(updatedTask)
    } catch (error) {
        console.error (error)
        res.status(500).send({message: 'There was a problem trying to update the title of this task'})
    }
})

router.delete ('/id/:id', async (req,res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        if(!deletedTask) {
            return res.status(404).send({message: 'Task not found'})
        }
        res.status(200).send(deletedTask)
    } catch (error) {
        console.error (error)
        res.status(500).send({message: 'There was a problem trying to delete this task'})
    }
})

module.exports = router