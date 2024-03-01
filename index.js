require("dotenv").config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const QUICKNODE_RPC_URL = process.env.QUICKNODE_RPC_URL;

const app = express();

const PORT="3000";
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

//https://docs.misttrack.io/openapi/quicknode-add-on-docs
app.post('/api/analyzeRisk', async (req, res) => {
  try {
    let { address=null, chain = null } = req.body; 
    let params=[{
      address:address,
      chain:chain
    }];

    const response = await axios.post(
        QUICKNODE_RPC_URL, 
        {
          id: 1,
          jsonrpc: '2.0',
          method: 'mt_addressRiskScore',
          params: params
        }, 
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      res.status(200).json(response.data);
  
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'An error occurred while fetching data' });
  }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});