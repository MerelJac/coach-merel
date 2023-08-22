const sequelize = require('../config/connection')

const { User } = require('../models')

const userData = [{
    first_name: 'Merel',
    email: "mimibanini@gmail.com",
    password: "gymBro",
}
]


async function seedDatabase() {
    try {
        await sequelize.sync({ force: true })

        await User.bulkCreate(userData)

    } catch (err) {
        console.error(err)
    }
}

seedDatabase();