const express = require('express')
require('./db/mongoose')
var cors = require('cors') 

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000
app.use(cors())

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const bcrypt = require('bcryptjs')

const myFunction = async () => {
   const password = "Lal12345";
   const hashedPassword = await bcrypt.hash(password, 8)

   console.log(password);
   console.log(hashedPassword)
}

myFunction();