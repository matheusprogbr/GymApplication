const fs = require('fs');
const data = require('./data.json');

// SHOW
exports.show = (req,res) => {
  let { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if(!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor, // get all the properties of the object and copy to instructor, but i will rewrite some of the values
    age:'',             
    gender:'',          // rewrite the value of gender
    services:'',        // rewrite the value of services
    created_at:'',      // rewrite the value of created_at
  };

  return res.render('instructors/show',{ instructor });
}

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

    return res.redirect("/instructors");
  });

  // return res.send(req.body);
}
