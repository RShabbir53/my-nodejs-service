const bodyParser = require('body-parser');
const path = require('path'); 
const express =  require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const courses = [
  {id: 1, name: "maths"},
  {id: 2, name: "english"},
  {id: 3, name: "physics"},
  {id: 4, name: "chemistry"},
  {id: 5, name: "biology"},
];


app.get('/', (req, res) => {
	res.send('API -> /api/courses/:id');
});


app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) 
    res.status(404).send('The course with the given ID was not found');
  else
    res.send(course);
});

app.post('/api/courses', (req, res) => {

  console.log(req.body);
  if(!req.body.name || req.body.name.length < 3){
    //400 bad request
    res.status(400).send('Name is required and should be min 3 characters');
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name       
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) 
    res.status(404).send('The course with the given ID was not found');
  else{
    course.name = req.body.name;
    res.send(course);
  }    
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) 
    res.status(404).send('The course with the given ID was not found');
  else{
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
  }    
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});

