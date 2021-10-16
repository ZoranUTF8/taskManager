const getAllTasks = (req, res) => {
    res.send("all all tasks")
}

const createTask = (req, res) => {
    res.json(req.body)
}

const getSingletTask = (req, res) => {
    res.json({
        id: req.params.id
    })
}

const updateTask = (req, res) => {
    res.send("update task")
}

const deleteTask = (req, res) => {
    res.send("delete task")
}




module.exports = {
    getAllTasks,
    createTask,
    getSingletTask,
    updateTask,
    deleteTask
}