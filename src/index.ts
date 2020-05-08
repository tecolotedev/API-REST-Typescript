import app from './app';
import auth from './routes/auth';
import mongoose from 'mongoose';

import './config';


//Routes
app.use('/api/auth',auth);

//database
mongoose.connect(process.env.URI_MONGODB || 'mongodb://localhost/crudusuarios', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
},()=>{console.log('server online')});

app.listen(3000,()=>{
    console.log('server on port 3000');
});