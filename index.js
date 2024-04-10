require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const nodeMailer = require('nodemailer')

const express= require('express')
const path = require('path')
const app = express()

//middleware
const notFoundMiddleware = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/errorHandler')
const connectDB = require('./db/dbCon')
 
//transporter


//routes
const newletterRouter =  require('./routes/NewsRoutes')

app.use('/', express.static(path.join(__dirname,'public')))
app.use(express.json())

app.use(cors())

app.use('/absg/newsletter', newletterRouter)


//errorhandllers
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 8000
const start = async () =>{
    await connectDB(process.env.CONNECTION_STRING)
    try {
        app.listen(port, console.log(`Server is Live at port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()
