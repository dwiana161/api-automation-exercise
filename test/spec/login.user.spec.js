const request = require("supertest");
const config = require('../../data/config.json');

async function loginUser(payload){
    const response = await request(config.baseUrl)
    .post("/authentications")
    .send(payload)
    return response
}

module.exports = {loginUser}