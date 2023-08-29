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
          console.log(req.session.cookie)

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

// LOGIN 
router.post('/auth', async (req, res) => {
    try {
        const dbUserDataWithPassword = await User.findOne({
            where: {
              email: req.body.email,
            },
          });
      
          const dbUserData = await User.findOne({
            where: {
              email: req.body.email,
            },
            attributes: {
              exclude: ["password"],
            },
          });
          console.log(dbUserDataWithPassword)
          if (!dbUserData) {
            res
              .status(400)
              .json({ message: "Incorrect email or password. Please try again!" });
            return;
          }
    //   TODO - validate password not working (checkPassword)
const validPassword = dbUserDataWithPassword.checkPassword(req.body.password)

          if (!validPassword) {
            res
              .status(400)
              .json({ message: "Incorrect email or password, please try again" });
            return;
          } else {
            return res.status(200).json({message: 'Welcome Back. You are logged in'})
          }

        // save session
        req.session.save(() => {
          req.session.loggedIn = true;
          // save session without password
          req.session.user = dbUserData;
          console.log(req.session.cookie)

        })
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;