// implement your API here
const express = require('express');

const DataBase = require('./data/db')

const server = express();

server.use(express.json());

//Check to see if DB is setup properly
server.get('/', (req, res) => {
  res.json({ iAmWorking: "Hey I'm wokring!!"})
})

//Add a user
server.post('/api/users', (req,res) => {
  const {name, bio} = req.body
  const user = ({name: name, bio: bio})

  console.log(name, bio)
  if(name && bio){
    console.log("It passed")
    DataBase.insert(user)
    .then(hub => {
      res.status(201).json(user)
    }).catch(err => {
      res.status(500).json({errorMessage: "We messed up try again!"})
    })
  } else {
    console.log("It didn't pass")
    res.status(401).json({errorMessage: "Please enter both a username and password"})
  }
})

//Get a list of users
server.get('/api/users', (req, res) => {
  DataBase.find().then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(500).json({errorMessage: "Oops our bad!"})
  })
})

//Get a user by ID
server.get('/api/users/:id', (req, res) => {
  DataBase.findById(req.params.id)
  .then(user => {
    if(user){
    res.status(200).json(user)
    } else {
      res.status(404).json({errorMessage: "User not found"})
    }
  }).catch(err => {
    res.status(500).json({errorMessage: "Server error"})
  })
})

//Delete a user by ID
server.delete('/api/users/:id', (req, res) => {
  DataBase.remove(req.params.id)
  .then(user => {
    if(user){
    res.status(200).json({errorMessage: `Succesfully deleted user`})
    } else {
      res.status(404).json({errorMessage: "User not found"})
    }
  }).catch(err => {
    res.status(500).json({errorMessage: "Server error"})
  })
})

server.put('/api/users/:id', (req, res) => {
  DataBase.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(`Succefully editted!`)
  }).catch(err => {
    res.status(500).json({errorMessage: "Editting failed! :("})
  })
})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));

