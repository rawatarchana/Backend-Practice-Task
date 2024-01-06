const express = require('express');
const taskController = require('../Controllers/taskController')
const router = express.Router();



router.get('/task/get/premium' , taskController.getAllPremiumTaskUser);
router.get('/task/get/basic' , taskController.getAllBasicTaskUser);
router.get('/task/get' , taskController.getUsersByTaskId);
router.post('/task/create' , taskController.createTaskUser);
router.post('/task/update/subtask' , taskController.updateSubTask);
router.delete('/task/delete' , taskController.deleteOnlyNonPremiumTaskUser);


module.exports = router;