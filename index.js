require( "dotenv").config();

const express = require('express')
const mongoose =  require('mongoose')
const app = express()
const port = 3000
// Require pug template engine
const ejs = require("ejs");

const path = require('path')

app.use('/public', express.static(path.join(__dirname, 'public')))
// app.use(express.static('files'))
 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 

// Database Connection 
mongoose.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
}
) .then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

// Create schema
const feedSchema = mongoose.Schema({
  name: String,
  email: String,
  feed: String
});

// Making a modal on our already
// defined schema
const feedModal = mongoose
  .model('feeds', feedSchema);

// Handling get request
app.get('/', function (req, res) {
  // Rendering your form
  res.render('feedback');
});

// Handling data after submission of form
app.post("/feedback_form", function (req, res) {
  const feedData = new feedModal({
      name: req.body.name,
      email: req.body.email,
      feed: req.body.feedback
  });
  feedData.save()
      .then(data => {
          res.render('feedback_form',
{ msg: "Your feedback successfully saved." });
      })
      .catch(err => {
          res.render('feedback_form', 
              { msg: "Check Details." });
      });
})


// app.delete('/', (req,res)=>{
//   res.send('delete form')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})