const express = require('express')
const app = express()
const port = 3000

const path = require('path')

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('files'))


app.get('/', (req, res) => {
  res.send('get forms')
})
app.post('/', (req,res)=>{
  res.send('create form')
})
app.put('/', (req,res)=>{
  res.send('update form')
})
app.delete('/', (req,res)=>{
  res.send('delete form')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})