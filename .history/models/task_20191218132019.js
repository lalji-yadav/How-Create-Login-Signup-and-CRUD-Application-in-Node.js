const mongoose = require("mongoose");

const Task = mongoose.model('Task', {
   isCompleted: {
       type: Boolean,
       required: true,
       trim: true
   }
})

module.exports = Task
