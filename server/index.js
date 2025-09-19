const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const colors = require('colors');
const connectDB = require('./config/db');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();

//connect to database
connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
