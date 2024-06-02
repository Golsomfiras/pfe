let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let path = require('path')
let mongoose = require ('mongoose')
const AdminModel = require('./models/Admin')
let UserModel = require('./models/User')
let cors = require('cors')

const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require('jsonwebtoken')

let answersRouter = require('./routes/answer');
let surveyRouter = require('./routes/survey');
let mapsRouter = require('./routes/maps');
// Import maps route

let app = express();
app.use(cors());
app.use(cookieParser())

const JWT_SECRET="mySuperSecretKey123"

mongoose.connect('mongodb+srv://yasmine:azertyui@cluster0.ozx3fre.mongodb.net/?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const verifyAdmin =(req,res,next) =>{
  const token =req.cookies.token;
  console.log("token admin", token);
  if(!token){
    return res.json("ta9t ta3rif")
  }else{
    jwt.verify(token, JWT_SECRET, (err,decoded)=>{
      if(err){
        return res.json("Token is wrong")
      }
      next()
    })
  }
}

const verifyUser = (req,res,next)=>{
  const token = req.cookies.token_user;
  console.log("token l user: ", token);
  if(!token){
    return res.json("ta9t ta3rif yal user :D")
  }else{
    jwt.verify(token, JWT_SECRET, (err, decoded)=>{
      if(err){
        return res.json('user token is wrong')
      }
      next();
    })
  }
}

const logoutAdmin =(req,res,next) =>{
  const token =req.cookies.token;
  res.clearCookie('token');
  return res.json('LOGOUT');
}

app.get('/api/survey/user', verifyUser, (req,res)=>{
  return (res.json("Success"));
})



app.get("/api/logout", logoutAdmin, (req,res)=>{
  return(res.json("LOGOUT"));
})

app.get("/create-new",verifyAdmin, (req,res)=>{
  return res.json("Success")
})

app.get("/data-analysis",verifyAdmin, (req,res)=>{
  return res.json("Success")
})

app.get("/existing-surveys",verifyAdmin, (req,res)=>{
  return res.json("Success")
})

app.get("/profile",verifyAdmin, (req,res)=>{
  return res.json("Success")
})

//admin login
app.post("/", async (req, res) => {
  const { password } = req.body;
  const id= req.params._id;
  try {
    const admin = await AdminModel.findOne({id: id});
    if (admin) {
      const isPasswordMatch = await bcrypt.compare(password, admin.password);
      if (isPasswordMatch) {
        console.log("connected:: ",admin.id)
        const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        res.cookie("token", token);
        res.json("Success");
      } else {
        console.log('The password is incorrect')
        res.json("The password is incorrect");
      }
    } else {
      console.log("No record existing");
      res.json("No record existing");
    }
  } catch (err) {
    console.error("Error finding user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
})

//user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try{
    const user = await UserModel.findOne({email: email});
    if(user){
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if(isPasswordMatch){
        console.log('user connected :', user.id)
        const token_user = jwt.sign({id : user.id}, JWT_SECRET,{expiresIn:'1d'});
        res.cookie("token_user", token_user);
        res.json("Success")
      }else{
        console.log('The password is incorrect');
        res.json("The password is incorrect")
      }
    }else{
      console.log("No record existing")
      res.json("No record existing")
    }
  }catch(err){
    console.log("Error finding user: ",err);
    res.status(500).json({message: "Internal Server error"});
  }
})

//modifier mot de passe
app.post('/api/update-password', async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  try {
      const user = await AdminModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordMatch) {
          return res.status(400).json({ message: 'Incorrect old password' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.json({ message: 'Password updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
});

//register a user
app.post('/signin', async (req, res) => {
  try{
    const {name, email,password,dob} = req.body;
    const hashedPassword= await bcrypt.hash(password,10);
    const user = await UserModel.create({name, email, password: hashedPassword,dob});
    res.status(200).json({message : "User created successfully! ",user});
  }catch(err){
    res.status(404).json({error: 'Error creating useer',err})
  }
})

app.use('/api/answer', answersRouter);
app.use('/api/survey/admin', surveyRouter);
app.use('/api/survey/user', surveyRouter);
app.use('/api/maps', mapsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.get("/api/images/:id", (req, res) => {
app.get("/api/survey/user/images/:name", (req, res) => {
	console.log("find me here!", req.params)
	// res.sendFile("/uploads/"+req.params.id)
	console.log('file from backend', res);
	res.sendFile(`/uploads/${req.params.name}`)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
});

module.exports = app;
