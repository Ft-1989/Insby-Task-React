const express = require("express");
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;


const username = "hQtwpolwKTjUkNAkZGeSiOkhp2OP8UA6TAPyA7bOWLFXTPPJOMzQUOOhLg43uXoFIuA5T4yKySJnHZhhVNWBqfNLcaKBfrAx";
const password = "lolci3wdjsHDhFsQOnubYma5Zl33BPwE4NA5wftU9qxJnmIkP3ju8qw0F6ECjF4kvmp3SwNuLZrEMQezkFHqOMYjCBVJJzxv";
const base64Credentials = btoa(`${username}:${password}`)

const postData = {
  uuid: uuidv4(),
  uuidOS: 'Windows',
}

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  console.log("Hello")
});


app.post('/api/token', async (req, res) => {
  try {
    const response = await axios.post(`https://dev-mrp.insby.tech/api/v2/init/app`, 
      JSON.stringify(postData),{
        headers: {
          "Authorization" : `Basic ${base64Credentials}`,
          'Content-Type': 'application/json'
        },
      }     
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.get('/api/products', async (req, res) => {
  try {
    const token = req.headers.token
    const response = await axios.get(`https://dev-mrp.insby.tech/api/v2/session/product`, 
      {
        headers: {
          "Authorization" : `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }     
    );
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


app.post('/api/sign-up', async(req, res) => {
  try{
    
    const { token } = req.headers
    const formData = req.body

    const response = await axios.post('https://dev-mrp.insby.tech/api/session/customer-sign-in',
      JSON.stringify(formData), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    )
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})


app.post('/api/log-in', async(req, res) => {
  try{

    const { token } = req.headers
    const formData = req.body

    const response = await axios.post('https://dev-mrp.insby.tech/api/session/customer-sign-in',
      JSON.stringify(formData), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    )

    const data = response.data;

    res.status(200).send({ data});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
})