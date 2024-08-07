const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const queryInterface = sequelize.queryInterface;

const new_user_test_1 = {
    "username": "user4",
    "email": "user4@email.com",
    "password": "12345678",
    "phoneNumber": "1234567890",
    "address": "address test1",
    "isSubscribed": false,
    "bodyweight": 60,
    "height": 180,
    "preference": "maintain bodyweight"
}

const registeredUser = {
    "username": "user1",
    "email": "user1@email.com",
    "password": "bD6#jT*n",
    "phoneNumber": "8479676697",
    "address": "21056 Ludington Crossing",
    "isSubscribed": false,
    "bodyweight": 60,
    "height": 180,
    "preference": "maintain bodyweight"
}

const registeredUser2 = {
    "username": "user2",
    "email": "user2@email.com",
    "password": "xA7='&LE|",
    "phoneNumber": "5635143444",
    "address": "252 Lake View Court",
    "isSubscribed": false,
    "bodyweight": 70,
    "height": 150,
    "preference": "lose bodyweight"
}

const dataEditProfile = {
    "bodyweight": 100,
    "height": 100,
    "preference": "lose bodyweight"
}

let access_token_registered_user = ""
let access_token_registered_user2 = ""
let paramId = 1;

describe("Test Endpoint User", () => {
    describe("POST /login", () => {
        describe("Success", () => {
            test("should successs login and send access_token", async () => {
                let { status, body } = await request(app)
                    .post("/login")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send(registeredUser);

                console.log(body)
                expect(status).toBe(200);
                expect(body).toHaveProperty("access_token", access_token_registered_user);
            })
        });

        describe("Failed", () => {
            test("should failed when email is not given or inputed", async () => {
                let { status, body } = await request(app)
                    .post("/login")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send({
                        username: registeredUser.username,
                        password: registeredUser.password,
                        phoneNumber: registeredUser.phoneNumber,
                        address: registeredUser.address
                    });

                // console.log(body,'body=====>>')
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Email is required");
            });

            test("should failed when password is not given or inputed", async () => {
                let { status, body } = await request(app)
                    .post("/login")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send({
                        username: registeredUser.username,
                        email: registeredUser.email,
                        phoneNumber: registeredUser.phoneNumber,
                        address: registeredUser.address
                    });

                // console.log(body,'body=====>>')
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Password is required");
            });

            test("should failed when email is invalid / not listed in db", async () => {
                let { status, body } = await request(app)
                    .post("/login")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send({
                        username: registeredUser.username,
                        email: "tessssemail",
                        password: registeredUser.password,
                        phoneNumber: registeredUser.phoneNumber,
                        address: registeredUser.address
                    });

                // console.log(body,'body=====>>')
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid email or password");
            });

            test("should failed when password is invalid / not match", async () => {
                let { status, body } = await request(app)
                    .post("/login")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send({
                        username: registeredUser.username,
                        email: registeredUser.email,
                        password: "passwordtesting",
                        phoneNumber: registeredUser.phoneNumber,
                        address: registeredUser.address
                    });

                // console.log(body,'body=====>>')
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid email or password");
            });

        });
    });

    describe("POST /register", () => {
        describe("Success", () => {
            test("should successs register", async () => {
                let { status, body } = await request(app)
                    .post("/register")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send(new_user_test_1);

                // console.log(body)
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("username", new_user_test_1.username);
                expect(body).toHaveProperty("email", new_user_test_1.email);
            })
        });

        describe("Failed", () => {
            test("should failed register when email is not given or inputed", async () => {
                let { status, body } = await request(app)
                    .post("/register")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send({
                        username: new_user_test_1.username,
                        password: new_user_test_1.password,
                        phoneNumber: new_user_test_1.phoneNumber,
                        address: new_user_test_1.address,
                        isSubscribed: new_user_test_1.isSubscribed,
                        bodyweight: new_user_test_1.bodyweight,
                        height: new_user_test_1.height,
                        preference: new_user_test_1.preference
                    });

                // console.log(body)
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Email is required");
            });

            test("should failed register when password is not given or inputed", async () => {
                let { status, body } = await request(app)
                    .post("/register")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send({
                        username: new_user_test_1.username,
                        email: new_user_test_1.email,
                        phoneNumber: new_user_test_1.phoneNumber,
                        address: new_user_test_1.address,
                        isSubscribed: new_user_test_1.isSubscribed,
                        bodyweight: new_user_test_1.bodyweight,
                        height: new_user_test_1.height,
                        preference: new_user_test_1.preference
                    });

                // console.log(body)
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Password is required");
            });

            test("should failed register when email given is blank", async () => {
                let { status, body } = await request(app)
                    .post("/register")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send({
                        username: new_user_test_1.username,
                        email: "",
                        password: new_user_test_1.password,
                        phoneNumber: new_user_test_1.phoneNumber,
                        address: new_user_test_1.address,
                        isSubscribed: new_user_test_1.isSubscribed,
                        bodyweight: new_user_test_1.bodyweight,
                        height: new_user_test_1.height,
                        preference: new_user_test_1.preference
                    });

                // console.log(body)
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Email is required");
            });

            test("should failed register when password given is blank", async () => {
                let { status, body } = await request(app)
                    .post("/register")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send({
                        username: new_user_test_1.username,
                        email: new_user_test_1.email,
                        password: "",
                        phoneNumber: new_user_test_1.phoneNumber,
                        address: new_user_test_1.address,
                        isSubscribed: new_user_test_1.isSubscribed,
                        bodyweight: new_user_test_1.bodyweight,
                        height: new_user_test_1.height,
                        preference: new_user_test_1.preference
                    });

                // console.log(body)
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Password is required");
            });

            test("should failed register when email is registered", async () => {
                let { status, body } = await request(app)
                    .post("/register")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send({
                        username: new_user_test_1.username,
                        email: registeredUser.email,
                        password: new_user_test_1.email,
                        phoneNumber: new_user_test_1.phoneNumber,
                        address: new_user_test_1.address,
                        isSubscribed: new_user_test_1.isSubscribed,
                        bodyweight: new_user_test_1.bodyweight,
                        height: new_user_test_1.height,
                        preference: new_user_test_1.preference
                    });

                // console.log(body)
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Email already exists");
            });

            test("should failed register when format email is invalid", async () => {
                let { status, body } = await request(app)
                    .post("/register")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send({
                        username: new_user_test_1.username,
                        email: "email_test1",
                        password: new_user_test_1.email,
                        phoneNumber: new_user_test_1.phoneNumber,
                        address: new_user_test_1.address,
                        isSubscribed: new_user_test_1.isSubscribed,
                        bodyweight: new_user_test_1.bodyweight,
                        height: new_user_test_1.height,
                        preference: new_user_test_1.preference
                    });

                // console.log(body)
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Email must be in format email");
            });



        });
    });

    describe("PUT /edit-profile/:id", () => {
        describe("Success", () => {
            test("should successs edit profile", async () => {
                let { status, body } = await request(app)
                    .put(`/edit-profile/${paramId}`)
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send(dataEditProfile);

                // console.log(body)
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number));
                expect(body).toHaveProperty("username", registeredUser.username);
                expect(body).toHaveProperty("email", registeredUser.email);
                expect(body).toHaveProperty("phoneNumber", registeredUser.phoneNumber);
                expect(body).toHaveProperty("isSubscribed", registeredUser.isSubscribed);
                expect(body).toHaveProperty("bodyweight", registeredUser.bodyweight);
                expect(body).toHaveProperty("height", registeredUser.height);
                expect(body).toHaveProperty("preference", registeredUser.preference);
            })
        });

        describe("Failed", () => {
            test("should failed update profile, because not login yet", async () => {
                let { status, body } = await request(app)
                    .put(`/edit-profile/${paramId}`)
                    .send(dataEditProfile);

                // console.log(body)
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid Token");
            })

            test("should failed update profile, because given invalid token ", async () => {
                let { status, body } = await request(app)
                    .put(`/edit-profile/${paramId}`)
                    .set("Authorization-AccessToken", "Bearer " + "TokenTesting")
                    .send(dataEditProfile);

                // console.log(body)
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid Token");
            })

            test("should failed update profile, because profile id is unavailable on db", async () => {
                let { status, body } = await request(app)
                    .put("/edit-profile/1000")
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)
                    .send(dataEditProfile);

                // console.log(body)
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "User not found");
            })

            test("should failed update profile, because profile id is not belongs to other user", async () => {
                let { status, body } = await request(app)
                    .put(`/edit-profile/${paramId}`)
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user2)
                    .send(dataEditProfile);

                // console.log(body)
                expect(status).toBe(403);
                expect(body).toHaveProperty("message", "You are not authorized");
            })
        });
    });
});

beforeAll(async () => {
    let data = require('../db/users.json').map((el) => {
        delete el.id;
        el.password = hashPassword(el.password);
        el.createdAt = el.updatedAt = new Date();
        return el
    })
    // console.log(data);
    await queryInterface.bulkInsert('Users', data)
    let user = await User.findOne({ where: { email: registeredUser.email } })
    let user2 = await User.findOne({ where: { email: registeredUser2.email } })

    access_token_registered_user = signToken({ id: user.id });
    access_token_registered_user2 = signToken({ id: user2.id });
    // console.log(access_token_registered_user, 'access_token_registered_user ===>>')
    // console.log(access_token_registered_user2, 'access_token_registered_user2 ===>>')

    console.log('Success seeding data user')
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        restartIdentity: true,
        truncate: true,
        cascade: true
    });
    console.log('Drop seeding data user')
})