const {
    Router
} = require("express");
const express = require("express");
const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingletTask,
    updateTask,
    deleteTask
} = require("../controllers/tasks");

// ROUTES
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getSingletTask).patch(updateTask).delete(deleteTask);





module.exports = router;