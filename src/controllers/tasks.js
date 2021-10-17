const Task = require("../models/task");
const asyncWrapper = require("../middleware/async");
const {
    createCustomError
} = require("../errors/customError");


const getAllTasks = asyncWrapper(async (req, res) => {

    const tasks = await Task.find({});
    res.status(200).json({
        tasks
    });
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    
    res.status(201).json({
        task
    });
})

const getSingleTask = asyncWrapper(async (req, res, next) => {

    //get id from params
    const {
        id: taskID
    } = req.params;
    // query DB for id
    const task = await Task.findOne({
        _id: taskID
    });
    // if no task with specified id found
    if (!task) {
        return next(createCustomError(`No task with specified id found => ${taskID}`, 404))
    }
    // send the found task
    res.status(200).json({
        task
    });
})

const deleteTask = asyncWrapper(async (req, res) => {

    // get task id
    const {
        id: taskID
    } = req.params;
    // find task and delete
    const task = await Task.findOneAndDelete({
        _id: taskID
    });
    // if id does not exist
    if (!task) {
        return next(createCustomError(`No task with specified id found => ${taskID}`, 404))
    }
    res.status(200).json({
        task
    });
})

const updateTask = asyncWrapper(async (req, res) => {
    // get task id from params
    const {
        id: taskID
    } = req.params;
    // query DB for task and provide updated data
    const task = await Task.findOneAndUpdate({
        _id: taskID
    }, req.body, {
        new: true,
        runValidators: true,
    })
    // if no task fond
    if (!task) {
        return next(createCustomError(`No task with specified id found => ${taskID}`, 404))
    }
    // if task found 
    res.status(200).json({
        task
    })
})



module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,

}