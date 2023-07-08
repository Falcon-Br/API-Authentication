import express from 'express'
import connectDB from './models/ConnectDB'

//Routes
import Welcome from './routes/Welcome'
import Login from './routes/Login'
import Register from './routes/Register'
import PrivateRouter from './routes/PrivateRouter'

const app: express = express()
app.use(express.json())

app.use('/', Welcome)
app.use('/auth/login', Login)
app.use('/auth/register', Register)
app.use('/user/:id', PrivateRouter)

connectDB()

app.listen(3000, ()=>{
    console.log("Servidor Rodando!")
})