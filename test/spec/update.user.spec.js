const request = require("supertest");
const config = require('../../data/config.json')

async function updateUser(userId, payload, token){
    const response = await request(config.baseUrl)
    .put('/users/' + userId)
    .send(payload)
    .set("Authorization", `Bearer ${token}`)
    return response
}

module.exports = {updateUser}