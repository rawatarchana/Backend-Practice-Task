const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskUserSchema = new Schema({
    taskId : {
        type : String
    },
    taskName : {
        type : String
    },
    taskDetails : {
        type : String 
    },
    taskLevel : {
        type : String ,
       
    },
    subTask : {
        theory : {
            name : {
                type : String
            },
            difficultyLevel : {
                type : String
            },
            labels :[
                {
                    type : String
                }
            ],
            taskDocumentation : {
                type : [
                    {
                        videoName :{
                            type : String
                        },
                        videoDuration : {
                            type : Number
                        }
                    }
                ]
            }
        } ,
        practical : {
            name : {
                type : String
            },
            difficultyLevel : {
                type : String
            },
            labels :[
                {
                    type : String
                }
            ],
            taskDocumentation : {
                type : [
                    {
                        videoName :{
                            type : String
                        },
                        videoDuration : {
                            type : Number
                        }
                    }
                ]
            }
        }
    },

    isPremium : {
        type : Boolean,
        
    },
    
});

taskUserSchema.index({ taskId: 'unique' });

const user = mongoose.model('taskUser', taskUserSchema);
module.exports = user