# Hack Healthy API Documentation

## Models :
User
```json
- username: string
- email: string, required, unique
- password: string, required
- phoneNumber: string
- address: string
- isSubscribed: boolean,
- bodyweight: integer
- height: integer
- preference: string
```

Recipe
```json
- title: string, required,
- grams_per_portion: string,
- number_of_servings: integer,
- ingredient: JSON,
- direction: JSON,
- imgUrl: string,
- category: string,
- type: string,
- factId: integer
```

Fact
```json
- calcium: string,
- calories: string,
- carbohydrate:string,
- cholesterol: string,
- fat: string,
- fiber: string,
- iron: string,
- monounsaturated_fat: string,
- polyunsaturated_fat: string,
- potassium: string,
- protein: string,
- saturated_fat: string,
- serving_size: string,
- sodium: string,
- sugar:string,
- trans_fat: string,
- vitamin_a: string,
- vitamin_c: string,
```

MySavedRecipe
```json
- userId : integer, required
- recipeId: integer, required
```

## Endpoints
List of available endpoints:
- POST /login
- GET pub/recipes
- POST /google-login
- POST /register

Routes below need authentication:
- GET /get-user
- GET /recipes
- GET /recipes/:id
- GET /my-saved-recipes
- POST /my-saved-recipes/:recipeId
- GET /recipe-recommendation
- GET /connection-midtrans/get-token
- PATCH /connection-midtrans//user-update

Routes below need authorization:
- PUT /user/edit-profile/:id
- DELETE /my-saved-recipes/:id
- PATCH /recipes/:id/img

## Relationship :
One-to-Many (MySavedRecipe - Recipe)
One-to=One (Recipe - Fact)

## 1. POST /login
Description:

- Login into the system and validate user

Request:
- body:
```json
{
    "email": "string",
    "password": "string",
}
```

Response (200 - OK)
```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)
```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)
```json
{
  "message": "Invalid email or password"
}
```

Response (500 - Internal Server Error)
```json
{
  "message": "Internal Server Error"
}
```

## 2. GET pub/recipes
Description:

- Get all recipes from db for public site
- Return list of recipes

Request:
- params:
```json
{
  "id": "integer (required)"
}
```

Response (200 - OK)

```json
[
 {
    "id": "number",
    "title": "string",
    "grams_per_portion": "string",
    "number_of_servings":"integer",
    "ingredient": JSON,
    "direction": JSON,
    "imgUrl": "string",
    "category": "string",
    "type": "string",
    "factId": "integer"
  },
  ....,
]
```

Response (500 - Internal Server Error)
```json
{
  "message": "Internal Server Error"
}
```

