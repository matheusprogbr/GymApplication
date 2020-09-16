const fs = require('fs');
const data = require('./data.json');
const {age, gender, birth} = require('./utils');

// VALIDAÇÃO e CRIAÇÃO
exports.post = (req,res) => {
  const keys = Object.keys(req.body);
  for(key of keys){
    if(req.body[key]==='')
      return res.send('Preencha todos os campos!');
  };

  let {avatar_url,birth,name,services,gender} = req.body; // destructuring the object into variables

  birth = Date.parse(req.body.birth);
  const created_at = Date.now(); //get actual time of the app
  const id = Number(data.instructors.length+1);

  data.instructors.push({
    id,
    name,
    gender,
    birth,
    services,
    avatar_url,
    created_at
  });

  fs.writeFile('data.json', JSON.stringify(data,null, 2), (err) => {
    if(err) return res.send('Write file error!');

    return res.redirect(`/instructors/${id}`);
  });

}

// SHOW
exports.show = (req,res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if(!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor, // get all the properties of the object and copy to instructor, but i will rewrite some of the values
    gender:gender(foundInstructor.gender),
    age:age(foundInstructor.birth),             
    services:foundInstructor.services.split(','),        // rewrite the value of services
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),      // rewrite the value of created_at
  };

  return res.render('instructors/show',{ instructor });
}

// EDIT
exports.edit =  (req,res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if(!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor,
    birth:birth(foundInstructor.birth)
  };

  return res.render('instructors/edit', { instructor });
}

// PUT
exports.put = (req,res) => {
  const { id } = req.body;

  const keys = Object.keys(req.body);
  for(key of keys){
    if(req.body[key] == '') return res.send('Preencha todos os campos');
  }

  const foundInstructor = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if(!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth)
  };

  data.instructors[id - 1] = instructor;

  fs.writeFile('data.json', JSON.stringify(data, null , 2) , (err) => {
    if(err) return res.send('An error ocurred in the file system!');

    return res.redirect(`/instructors/${id}`);
  });

}
