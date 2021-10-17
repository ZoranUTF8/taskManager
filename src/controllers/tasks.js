const Task = require("../models/task");



const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({
            tasks
        });
    } catch (err) {
        res.status(500).json({
            msg: `Error getting all tasks => ${err}`
        })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({
            task
        });
    } catch (err) {
        res.status(500).json({
            msg: `Error saving the task => ${err}`
        })
    }

}

const getSingleTask = async (req, res) => {
    try {
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
            return res.status(404).json({
                msg: `No task with specified id found => ${taskID}`
            })
        }
        // send the found task
        res.status(200).json({
            task
        });
    } catch (err) {
        res.status(500).json({
            msg: `ERROR IN FIND ID => ${err}`
        })
    }
    res.json({
        id: req.params.id
    })
}

const deleteTask = async (req, res) => {
    try {
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
            return res.status(404).json({
                msg: `No task with id: ${taskID}`
            })
        }
        res.status(200).json({
            task
        });
    } catch (err) {
        res.status(500).json({
            msg: `ERROR IN FIND ID => ${err}`
        })
    }
}


const updateTask = async (req, res) => {
    try {
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
            return res.status(404).json({
                msg: `No task with id: ${taskID}`
            })
        }
        // if task found 
        res.status(200).json({
            task
        })

    } catch (err) {
        res.status(500).json({
            msg: `ERROR IN UPDATE TASK => ${err}`
        })
    }
}



module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,

}