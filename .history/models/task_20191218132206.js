const mongoose = require("mongoose");

const Task = mongoose.model('Task', {
   isCompleted: {
       type: Boolean,
       required: true
   },
   taskName: {
      type: String,
      required: true,
      
   }
})

module.exports = Task
