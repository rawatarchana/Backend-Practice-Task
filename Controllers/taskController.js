const taskModel = require('../Models/taskModel');


exports.getAllPremiumTaskUser = async(req, res)=>{
    
    try {

        let data = await taskModel.find({ isPremium: true });
        if(data){
            res.status(200).json({
                message: 'Success',
                data : data
            });
        }else{
            res.status(404).json({message : 'No Premium User is found.'});
        }
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
    
}

exports.getAllBasicTaskUser = async (req, res)=>{
    try {
        
        let data = await taskModel.find({ isPremium: false });
        if(data){
            res.status(200).json({
                message: 'Success',
                data : data
            });
        }else{
            res.status(404).json({message : 'No Basic User is found.'});
        }
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.getUsersByTaskId = async (req, res)=>{
    try {
        let taskId = req.query.taskId;
        if (!taskId ) {
            res.status(400).json({
                message: 'Bad request. Mandatory parameter missing'
            });
            return;
        }
        let query = {taskId : taskId}
        let data = await taskModel.findOne(query);
        if(data){
            res.status(200).json({
                message: 'success',
                data: data
            });
        }else{
            res.status(404).json({error : 'User not found'});
        }
        
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
        
    }
}


exports.createTaskUser = async (req, res) => {
    try {
        let taskId = req.body.taskId
        let taskName = req.body.taskName
        let taskDetails = req.body.taskDetails
        let taskLevel = req.body.taskLevel
        let subTask = req.body.subTask
        let isPremium = req.body.isPremium
        if (!taskId || !taskName || !taskDetails || !taskLevel || !subTask  ) {
            res.status(400).json({
                message: 'Bad request.'
            });
            return;
        }
        

        let newTaskUser = new taskModel({
            taskId : taskId,
            taskName  : taskName,
            taskDetails : taskDetails ,
            taskLevel : taskLevel,
            subTask : subTask,
            isPremium : isPremium
        });

        let data = await newTaskUser.save();
        res.status(200).json({
            message: 'success',
            data: data
        });
        

    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}


exports.updateSubTask = async(req , res) =>{
    try {
        let taskId = req.body.taskId
        let theory = req.body.theory
        let practical = req.body.practical
        let difficultyLevel = req.body.difficultyLevel
        let videoName = req.body.videoName
        let videoDuration = req.body.videoDuration

        if (!taskId || !difficultyLevel || !videoName || !videoDuration ) {
            res.status(400).json({
                message: 'Bad request.'
            });
            return;
        }

        const query = {taskId: taskId }
        const taskUser = await taskModel.findOne(query );
        if(!taskUser){
            return res.status(404).json({ error: 'TaskId not found' });
        }
        if(taskUser.isPremium){
            return res.status(400).json({ error: 'Only Basic taskuser is allowed' });
        }

        let updateSubtask = null ;
        if(theory===true){
            updateSubtask = {
                
                "subTask.theory.difficultyLevel" : difficultyLevel,
                "subTask.theory.taskDocumentation.$[].videoName" : videoName,
                "subTask.theory.taskDocumentation.$[].videoDuration" : videoDuration
                
            }
            
        } 
        else if(practical===true){
            updateSubtask = {
                
                "subTask.practical.difficultyLevel" : difficultyLevel,
                "subTask.practical.taskDocumentation.$[].videoName" : videoName,
                "subTask.practical.taskDocumentation.$[].videoDuration" :videoDuration
            }
        }
        else{
            return res.status(400).json({ error: 'Only theory and practical is true }' });
        }

        
        let data = await taskModel.findOneAndUpdate(query , {$set : updateSubtask} , {new : true});
        if(data){
            res.status(200).json({
                message : 'Success',
                user : data
            })
        }

    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}


exports.deleteOnlyNonPremiumTaskUser = async (req, res) => {
    let taskId = req.query.taskId;
    try {
        if (!taskId ) {
            res.status(400).json({
                message: 'Bad request.'
            });
        }

        const query = { taskId : taskId}
        const taskUser = await taskModel.findOne(query);
        if (!taskUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        if(taskUser.isPremium){
            return res.status(400).json({message : 'Only Basic task is allowed to delete'});
        }
         await taskModel.findOneAndDelete(query);
        res.status(200).json({
            message: 'Document deleted successfully.',
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}