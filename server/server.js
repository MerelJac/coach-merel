const express = require('express');
// const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth.js');

const { typeDefs, resolvers } = require('./schemas');

//import mongo
const db = require('./config/mongo.config');
// import routes

// const routes = require('./controllers')
// const cookieParser = require('cookie-parser')

// create backend server
const app = express();
const PORT = process.env.PORT || 3002;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//middleware
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: "GET, PUT, POST, DELETE",
//     credentials: true
// }));
app.use(express.json())
// app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
// routes middleware must be last
// app.use(routes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
// connect mongoDB and start server
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`listening on port http://localhost:${PORT}`)
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
})
})
};

startApolloServer();