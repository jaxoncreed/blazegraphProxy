import express from 'express';
import bodyParser from 'body-parser';
import request from 'superagent';

const BLAZEGRAPH_URL = 'http://o.team';

const app = express();

app.use(bodyParser.text());

app.post('/sparql', (req, res) => {
  request.post(`${BLAZEGRAPH_URL}/bigdata/sparql?query=${req.body}`)
  .set('accept', 'application/json')
  .then((result) => {
    console.log(result.body);
    res.send(result.body);
  })
  .catch((err) => {
    res.status(err.status).send(err.response.text);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});