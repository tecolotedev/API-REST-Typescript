import app from './app';
import auth from './routes/auth';


//Routes
app.use('/api/auth',auth);

//db
import myConnection from 'express-myconnection';
import mysql from 'mysql';
const optionsDB = {
  host     : 'localhost',
  user     : 'Manuel',
  password : 'Spartan11713',
  database : 'prueba1'
}
app.use(myConnection(mysql,optionsDB,'single'));
 




app.listen(3000,()=>{
    console.log('server on port 3000');
})