const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

const userRoute = require(newFunction())
const userActivity = require('./routes/activity')


app.use(bodyParser.json())

app.use('/user', userRoute);
app.use('/activity', userActivity);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function newFunction() {
  return './routes/user';
}