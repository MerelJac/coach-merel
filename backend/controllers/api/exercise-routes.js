const router = require('express').Router();
const { Exercise } = require('../../models')


// TODO - add user foreign keys

// get all 
router.get('/', async (req, res) => {
    try {
        const posts = await Exercise.find({})
        console.log(posts);
        res.status(200).send(posts)
    } catch (err) {
        console.error(err)
        res.json({ message: 'An error has occured' })
    }
})

//create exercise 
router.post('/', async (req, res) => {
    console.log('here')
    let body = req.body;
    console.log(body)
    try {
        const newExercise = await Exercise.create(body)
        res.json(newExercise)
    } catch (err) {
        console.error({message: `you have an error: ${err}`})
        throw err
    }
})

module.exports = router;