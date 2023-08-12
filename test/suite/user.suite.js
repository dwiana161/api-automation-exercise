const { expect } = require("chai");
const { loginUser } = require("../spec/login.user.spec");
const { createUser } = require("../spec/create.user.spec");
const userData = require("../../data/user.data.json");
const { getUser } = require("../spec/get.user.spec");
const { updateUser } = require("../spec/update.user.spec");
const { deleteUser } = require("../spec/delete.user.spec");

describe('Login Feature', () => {
    it('Success Login', async () => {
        const payload = userData;

        const response = await loginUser(payload)
        // console.log((await response).status);
        // console.log((await response).body);

        // ASSERTION
        expect((await response).status).to.equal(201);
        expect((await response).body.data.user.name).to.equal("FashionShop");
    })
    it('Failed Login', async () => {
        const payload = { //PAYLOAD
            "email": "kelly@gmail.com",
            "password": "FASHION1012345",
        }

        const response = await loginUser(payload)
        // console.log((await response).status);
        // console.log((await response).body);

        //ASSERTION
        expect((await response).status).to.equal(401);
        expect((await response).body.status).to.equal('fail');
    })
})


describe('Create User', () => {
    it('Success create a new user', async () => {
        //Get Token
        const token = await loginUser(userData)
        //Create User
        const payload = {
            "name": "kelly",
            "email": "user@example.com",
            "password": "kelly123"
         }
         
        const response = await createUser(payload,token.body.data.accessToken)
        // console.log((await response).status);
        // console.log((await response).body);

        // //Assert
        expect((await response).status).to.equal(201);
        expect((await response).body.data.name).to.equal(payload.name); 
    })
    it('Failed create a new user', async () => {
        //Get Token
        const token = await loginUser(userData)
        //Create User
        const payload = {
            "email": "user@example.com",
            "password": "kelly123"
         }
         
        const response = await createUser(payload,token.body.data.accessToken)
        // console.log((await response).status);
        // console.log((await response).body);

        // //Assert
        expect((await response).status).to.equal(400);
        expect((await response).body.message).to.equal('"name" is required'); 
    })
})

describe('Get User Detail', () => {
    it('Success get user detail', async () => {
        //Get Token
        const user = await loginUser(userData)
        let userId = user.body.data.user.id
         
        const response = await getUser(userId,user.body.data.accessToken)

        //Assert
        expect((await response).status).to.equal(200);
        expect((await response).body.data.user.email).to.equal('fashionshop@gmail.com'); 
    })
    it('Failed get user detail', async () => {
        //Get Token
        const token = await loginUser(userData)
        let userId = '1234567'
         
        const response = await getUser(userId,token.body.data.accessToken)
        // console.log((await response).status);
        // console.log((await response).body);

        // //Assert
        expect((await response).status).to.equal(404);
        expect((await response).body.message).to.equal('id tidak valid'); 
    })
})

describe('Update User', () => {
    it('Success update user', async () => {
        //Get Token
        const user = await loginUser(userData)
        let userId = user.body.data.user.id
        //Update User
        const payload = {
            "name": "FashionShop",
            "email": "fashionshop@gmail.com",
         }
         
        const response = await updateUser(userId, payload, user.body.data.accessToken)
        // console.log((await response).status);
        // console.log((await response).body);

        //Assert
        expect((await response).status).to.equal(200);
        expect((await response).body.data.name).to.equal('FashionShop'); 
    })
    it('Failed update user', async () => {
        //Get Token
        const token = await loginUser(userData)
        let userId = '1234567'

        const payload = {
            "name": "FashionShop",
            "email": "fashionshop@gmail.com",
         }
         
        const response = await updateUser(userId, payload, token.body.data.accessToken)
        // console.log((await response).status);
        // console.log((await response).body);

        // //Assert
        expect((await response).status).to.equal(404);
        expect((await response).body.message).to.equal('id tidak valid'); 
    })
})

describe('Delete User', () => {
    it('Success delete user', async () => {
        //Get Token
        const user = await loginUser(userData)
        let userId = 'deb17b6a-d401-4c1d-b30e-d593e8384dc0'
         
        const response = await deleteUser(userId, user.body.data.accessToken)
        // console.log((await response).status);
        // console.log((await response).body);

        //Assert
        expect((await response).status).to.equal(200);
        expect((await response).body.message).to.equal('User berhasil dihapus'); 
    })
    it('Failed delete user', async () => {
        //Get Token
        const token = await loginUser(userData)
        let userId = '1234567'

        const response = await deleteUser(userId, token.body.data.accessToken)
        // console.log((await response).status);
        // console.log((await response).body);

        // //Assert
        expect((await response).status).to.equal(404);
        expect((await response).body.message).to.equal('id tidak valid'); 
    })
})