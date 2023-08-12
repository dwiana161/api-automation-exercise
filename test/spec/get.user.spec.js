const request = require("supertest");
const config = require('../../data/config.json')

async function getUser(userId, token){
    const response = await request(config.baseUrl)
    .get('/users/' + userId)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = {getUser}