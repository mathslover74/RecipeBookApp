# JIAKSIMI?

## About the app

JiakSimi is a chinese dialect which means What to eat?
Have you ever wonder how to cook a certain dish or have not idea what to cook for a meal?
Have you ever want to share your amazing recipes and photo of your dish to the comunity?
This might just be the App for you

The Aim of this:

- Allow users to share their home cook recipes with photo
- Allow users to have inspiration on what to cook for a meal

[Application Link](https://jiaksime.herokuapp.com/signin)

## Installation

Run these commands:

- `git clone git@github.com:mathslover74/RecipeBookApp.git`
- `npm install`
- `nodemon`
- `open another terminal`
- `cd client`
- `npm install`
- `npm start`

Create .env file and include your own DB and Firebase:

- PORT
- SECRET
- MONGODB_URI
- SESOPM_MAX_AGE

Below is for fire base DataBase

- API
- ApiKey
- AuthDomain
- ProjectId
- StorageBucket
- MessagingSenderId
- AppId
- MeasurementId

## Technologies

- MongoDB/Mongoose (Database)
- Firebase (Img Storage)
- Express.js
- Node.js
- React
  -React Router
- Material UI (CSS)
- Bcrypt

## CRUD Routes

| No. | Route   | URL                           | HTTP Verb | Description             |
| --- | ------- | ----------------------------- | --------- | ----------------------- |
| 1.  | Create  | /users/signup                 | POST      | Create New user name    |
|     |         | /recipes/create               | POST      | Create New recipe       |
| 2.  | Read    | /recipes/:id                  | GET       | Displays recipe details |
|     |         | /recipes/userRecipe/:username | GET       | get only user recipe    |
|     |         | /recipes                      | GET       | View all Recipes        |
| 3.  | Update  | /recipes/:id                  | PUT       | Updates recipe details  |
| 4.  | Destroy | /recipes/:id                  | DELETE    | Delete Recipe           |

## Project Management & Wireframe

- [GitHub Project](https://github.com/mathslover74/RecipeBookApp/projects/1)
- [ScreenShots](https://docs.google.com/presentation/d/1WkhuI7H2MIaM8eTzAeKbCWWp5a7EncAU9F4yJOyrXXk/edit?usp=sharing)

## Future Developments

- Add rating
- Add comment section
