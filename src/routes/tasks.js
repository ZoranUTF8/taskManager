const {
    Router
} = require("express");
const express = require("express");
const router = express.Router();

const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
 
} = require("../controllers/tasks");

// ROUTES
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(deleteTask);





module.exports = router;