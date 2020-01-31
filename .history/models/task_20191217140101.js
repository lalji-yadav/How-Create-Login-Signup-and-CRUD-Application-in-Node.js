const mongoose = require("mongoose");

const Task = mongoose.model('Task', {
   name: {
       type: String,
       required: true,
       trim: true
   },
   email: {
       type: String,
       required: true,
       trim: true
   },
   password: {
       type: String,
       required: true,
       trim: true
   }
})

module.exports = Task
