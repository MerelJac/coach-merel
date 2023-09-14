const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  first_name: { 
    type: String, required: true 
},
  email: { 
    type: String, 
    required: true,
    unique: true
},
  password: { 
    type: String, required: true },
}, {
    toJSON: {
        getters: true
    }, 
    collection: 'Users'
}); 

//initalize
const User = model('Users', userSchema);

//error handling
const handleError = (err) => console.error(err);

// seed? 
User
    .create({
        first_name: 'Merel',
        email: 'test@test.com',
        password: 'test'
}).then((result) => console.log('New User seeded: ', result))
  .catch(err => handleError(err));

  // export 
module.exports = User;
