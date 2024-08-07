const request = require('supertest');
const app = require('../app');
const { sequelize, User, Post } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const queryInterface = sequelize.queryInterface;
const { getFSToken, getRecipes } = require('../controllers/FatSecretController')
const { Recipe } = require('../models');

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
let paramId = 1;

let access_token_registered_user = ""
let access_token_registered_user2 = ""



describe("Test Endpoint Recipe", () => {
    describe("GET /recipes", () => {
        describe("Success", () => {
            test("should successs get all data recipes from db", async () => {
                let { status, body } = await request(app)
                    .get("/recipes")
                    .set("Authorization", "Bearer " + access_token_registered_user)

                // console.log(body)
                expect(status).toBe(200);
                expect.any(Array);
            }, 10_000)
        });

        describe("Failed", () => {
            test("should failed get all data recipes, because not login yet", async () => {
                let { status, body } = await request(app)
                    .get("/recipes")

                // console.log(body)
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid Token");
            }, 10_000)

            test("should failed get all data recipes, because given invalid token ", async () => {
                let { status, body } = await request(app)
                    .get("/recipes")
                    .set("Authorization", "Bearer " + "TokenTesting")

                // console.log(body)
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid Token");
            }, 10_000)
        });
    });

    describe("GET /recipes/:id", () => {
        describe("Success", () => {
            test("should successs get data recipe from db", async () => {
                let { status, body } = await request(app)
                    .get(`/recipes/${paramId}`)
                    .set("Authorization", "Bearer " + access_token_registered_user)

                // console.log(body)
                expect(status).toBe(200);
                expect.any(Array);
            }, 10_000)
        });

        describe("Failed", () => {
            test("should failed get data recipe, because not login yet", async () => {
                let { status, body } = await request(app)
                    .get(`/recipes/${paramId}`)

                // console.log(body)
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid Token");
            }, 10_000)

            test("should failed get data recipe, because given invalid token ", async () => {
                let { status, body } = await request(app)
                    .get(`/recipes/${paramId}`)
                    .set("Authorization", "Bearer " + "TokenTesting")

                // console.log(body)
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid Token");
            }, 10_000)

            test("should failed get data recipe, because recipe id is unavailable on db", async () => {
                let { status, body } = await request(app)
                    .get(`/recipes/10000`)
                    .set("Authorization-AccessToken", "Bearer " + access_token_registered_user)

                // console.log(body)
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Recipe not found");
            })
        });
    });
});


beforeAll(async () => {
    const fs_token = await getFSToken()
    console.log(fs_token.data.access_token, 'fs_token.access_token===>>>')

    let number = 1;
    let newFact = [];
    let newDataRecipe = [];

    try {
        for (let i = 1; i < 20; i++) {
            const recipe_id = Math.ceil(Math.random() * 1_00 + 12)

            const dataRecipe = await getRecipes(fs_token.data.access_token, recipe_id)

            if (dataRecipe) {

                newDataRecipe.push({
                    "title": dataRecipe.recipe.recipe_name,
                    "grams_per_portion": dataRecipe.recipe.grams_per_portion,
                    "number_of_servings": dataRecipe.recipe.number_of_servings,
                    "ingredient": dataRecipe.recipe.ingredients.ingredient,
                    "direction": dataRecipe.recipe.directions.direction,
                    "imgUrl": "https://wallpaperaccess.com/full/767042.jpg",
                    "category": dataRecipe.recipe.recipe_categories.recipe_category[0].recipe_category_name,
                    "type": dataRecipe.recipe.recipe_types.recipe_type[0],
                    "factId": number,
                    "createdAt": new Date(),
                    "updatedAt": new Date()
                })
                newFact.push({
                    ...dataRecipe.recipe.serving_sizes.serving,
                    id: number,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                number++;
            }
        }
        //console.dir({ newFact }, { depth: 4 })
        // console.dir({ newDataRecipe }, { depth: 4 })
        await queryInterface.bulkInsert('Facts', newFact)
        await Recipe.bulkCreate(newDataRecipe)
        // await queryInterface.bulkInsert('Recipes', newDataRecipe, {}, {
        //     ingredient: { type: new Sequelize.JSON() },
        //     direction: { type: new Sequelize.JSON() }
        // });
    } catch (error) {
        console.log(error.message)
        console.log(error);
    }

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

    console.log('Success seeding data user, facts, and recipe')
}, 100_000)

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        restartIdentity: true,
        truncate: true,
        cascade: true
    });

    await queryInterface.bulkDelete('Facts', null, {
        restartIdentity: true,
        truncate: true,
        cascade: true
    });

    await queryInterface.bulkDelete('Recipes', null, {
        restartIdentity: true,
        truncate: true,
        cascade: true
    });
    console.log('Drop seeding data post and user')
})

