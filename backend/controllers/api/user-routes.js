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
        let newUser = await User.create(req.body)
        res.json(newUser)
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
    console.log(req)
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
      
          if (!dbUserData) {
            res
              .status(400)
              .json({ message: "Incorrect email or password. Please try again!" });
            return;
          }
    //   TODO - validate password not working (checkPassword)
        //   const validPassword = dbUserDataWithPassword.checkPassword(
        //     req.body.password
        //   );

        //   if (!validPassword) {
        //     res
        //       .status(400)
        //       .json({ message: "Incorrect email or password, please try again" });
        //     return;
        //   }
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;