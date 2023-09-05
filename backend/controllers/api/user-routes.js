const router = require('express').Router();
// goes to folder / index file, not direct path
const { User } = require('../../models')

// GET ALL users
router.get('/', async (req, res) => {
    const allUsers = await User.findAll()
    res.json(allUsers)
})

// CREATE new user
router.post('/', async (req, res) => {
    try {
        let newUser = await User.create(req.body);
        console.log(newUser)
        console.log('new user was created: ' + newUser)
        console.log(newUser.id)

        //save session
          req.session.save(() => {
          req.session.loggedIn = true;
          req.session.user = newUser;
          console.log(req.session)

        res.status(200).json({ message: "You are now logged in!"})
        })
    } catch (error) {
        if (error.name == 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Email address must be unique.' });
          }

          console.error(error);
          return res.status(500).json({ error: 'An error occurred while creating the user.' });
            }
        }
    )

// Login / Set Session
router.post('/login', async (req, res) => {
  try {
    // includes password validation
    let userData = await User.findOne( {
      where: {
        email: req.body.email,
        password: req.body.password
      }, 
      attributes: {exclude: ["password"]}
    } 
    );
    console.log(userData)
    console.log('new user was created: ' + userData)
    console.log(userData.id)

    //save session
      req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = userData;
      console.log(req.session.loggedIn, req.session.user)
      console.log(req.session)

    res.status(200).json({ message: "You are now logged in!", userData})
    })
} catch (error) {
  // TODO create unique error handling
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while creating the user.' });
        } 
  }
)

// Validate logged In User 
router.get('/me', (req, res) => {
  console.log("peanut butter")
  console.log("WE ARE HERE WE AREW HERE", req.session)
  // TODO req.session isnt persisting?
  try {
    let user = req.session.user;
    console.log('User: ', user);
    res.status(200).json(user)
  } catch(err) {
    console.error(err)
    res.sendStatus(err)
  }
})

module.exports = router;