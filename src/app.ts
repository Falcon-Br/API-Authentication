import express from 'express'
import connectDB from './models/ConnectDB'
import cors from 'cors'

//Routes
import Welcome from './routes/Welcome'
import Login from './routes/Login'
import Logout from './routes/Logout'
import Register from './routes/Register'
import PrivateRouterUser from './routes/PrivateRouterUser'
import Photo from './routes/photo'

const app: express = express()
app.use(express.json())
app.use(cors())

app.use('/', Welcome)
app.use('/auth/login', Login)
app.use('/auth/logout', Logout)
app.use('/auth/register', Register)
app.use('/private/', PrivateRouterUser)
app.use('/photo', Photo)

connectDB()

app.listen(3000, ()=>{
    console.log("Servidor Rodando!")
})