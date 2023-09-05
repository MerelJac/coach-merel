const router = require('express').Router();
const { Exercise } = require('../../models')


// TODO - add user foreign keys

// get all 
router.get('/', async (req, res) => {
    console.log("tacos")
    try {
        const posts = await Exercise.find({})
        console.log(posts);
        res.status(200).send(posts)
    } catch (err) {
        console.error(err)
        res.json({message: 'An error has occured'})
    }
})

module.exports = router;