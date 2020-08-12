const express=require('express');
const app =express();
const connectDb=require('./config/db');
const connectDB = require('./config/db');

// Connect Database
connectDB();

// Init Middleware

app.use(express.json({extended:false})); 

app.get('/',(req,res)=>{
    res.json({statusCode:200,msg:"Welcome to contact keeper API ..."});
});


app.use('/api/users',require('./routes/users'));
app.use('/api/contacts',require('./routes/contacts'));
app.use('/api/auth',require('./routes/auth'));


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`server started on port ${PORT} in ${process.env.NODE_ENV}`));