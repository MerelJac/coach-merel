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

// Login / Set Session
router.post('/login', async (req, res) => {
  try {
    // includes password validation
    let user = await User.findOne( {
      where: {
        email: req.body.email,
        password: req.body.password
      }, 
      attributes: {exclude: ["password"]}
    } 
    );
    console.log(user)
    console.log('new user was created: ' + user)
    console.log(user.id)

    //save session
      req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = user;
      console.log(req.session)

    res.status(200).json({ message: "You are now logged in!", user})
    })
} catch (error) {
  // TODO create unique error handling
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while creating the user.' });
        } 
  }
)

// OLD LOG IN

// // LOGIN 
// router.post('/auth', async (req, res) => {
//   let body = req.body;
//   console.log(body.email)
//     try {
//         const dbUserDataWithPassword = await User.findOne({
//             where: {
//               email: body.email,
//             },
//           });

//           console.log(dbUserDataWithPassword)
//           const dbUserData = await User.findOne({
//             where: {
//               email: body.email,
//             },
//             attributes: {
//               exclude: ["password"],
//             },
//           });
//           if (!dbUserData) {
//             res
//               .status(400)
//               .json({ message: "User does not exist. Incorrect email or password. Please try again!" });
//             return;
//           }   
               
//   // TODO - add password validation 

//               // save session
//               req.session.save(() => {
//                 req.session.loggedIn = true;
//                 // save session without password
//                 req.session.user = dbUserData;
//                 console.log('Session Saved', req.session)
//           })
//               return res.status(200).json({message: 'Welcome Back. You are logged in'})
//     } catch (err) {
//         console.log(err)
//     }
// })

// Logged In User 
router.get('/me', async (req, res) => {
  try {
    const user = req.session.user;
    console.log('User: ', user);
    res.status(200).json(user)
  } catch(err) {
    console.error(err)
  }

})
module.exports = router;