# My Web Application
## Project Setup
To get started with the project, follow these steps:
1. **Clone the Repository:**
   ```sh
   git clone <https://github.com/bubbly1234566789/recipe_guide_application>
   cd my-web-application!


## Project Overview
RecipeGuide is a Recipe Management Application that simplifies recipe management for users.
Endpoints for user authentication, recipe creation, retrieval, updating, and deletion are provided by the backend RESTful API. To provide service to the frontend application and persist data, the API communicates with a PouchDB database.
### User Endpoints
### User Endpoints

#### Sign Up
- **HTTP Method:** POST
- **Endpoint URL:** `/api/signup`
- **Request:**
  - **Headers:** `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "username": "exampleuser",
      "email": "example@example.com",
      "password": "examplepassword"
    }
    ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "ok": true,
      "id": "user_id",
      "rev": "revision_id"
    }
    ```
  - **500 Internal Server Error:**
    ```json
    {
      "error": "Error message"
    }
    ```

#### Log In
- **HTTP Method:** POST
- **Endpoint URL:** `/api/login`
- **Request:**
  - **Headers:** `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "email": "example@example.com",
      "password": "examplepassword"
    }
    ```
- **Response:**
  - **200 OK:**
    ```json
    {
      "ok": true,
      "id": "user_id",
      "username": "exampleuser",
      "email": "example@example.com"
    }
    ```
  - **400 Bad Request:**
    ```json
    {
      "error": "User not found" | "Invalid password"
    }
    ```

### Recipe Endpoints

#### Get Recipes
- **HTTP Method:** GET
- **Endpoint URL:** `/api/recipes`
- **Request:**
  - **Query Parameters:** `user=<user_id>`
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "_id": "recipe_id",
        "title": "Example Recipe",
        "ingredients": "Ingredients list",
        "instructions": "Cooking instructions",
        "image": "Image URL",
        "user": "user_id"
      }
    ]
    ```
  - **500 Internal Server Error:**
    ```json
    {
      "error": "Error message"
    }
    ```

#### Create Recipe
- **HTTP Method:** POST
- **Endpoint URL:** `/api/recipes`
- **Request:**
  - **Headers:** `Content-Type: application/json`
  - **Body:**
    ```json
    {
      "title": "Example Recipe",
      "ingredients": "Ingredients list",
      "instructions": "Cooking instructions",
      "image": "Image URL",
      "user": "user_id"
    }
    ```
- **Response:**
  - **201 Created:**
    ```json
    {
      "ok": true,
      "id": "recipe_id",
      "rev": "revision_id"
    }
    ```
  - **500 Internal Server Error:**
    ```json
    {
      "error": "Error message"
    }
    ```

#### Get Recipe by ID
- **HTTP Method:** GET
- **Endpoint URL:** `/api/recipes/:id`
- **Request:**
  - **URL Parameters:** `id=<recipe_id>`
- **Response:**
  - **200 OK:**
    ```json
    {
      "_id": "recipe_id",
      "title": "Example Recipe",
      "ingredients": "Ingredients list",
      "instructions": "Cooking instructions",
      "image": "Image URL",
      "user": "user_id"
    }
    ```
  - **500 Internal Server Error:**
    ```json
    {
      "error": "Error message"
    }
    ```

#### Update Recipe
- **HTTP Method:** PUT
- **Endpoint URL:** `/api/recipes/:id`
- **Request:**
  - **Headers:** `Content-Type: application/json`
  - **URL Parameters:** `id=<recipe_id>`
  - **Body:**
    ```json
    {
      "title": "Updated Recipe",
      "ingredients": "Updated ingredients",
      "instructions": "Updated instructions",
      "image": "Updated image URL"
    }
    ```
- **Response:**
  - **200 OK:**
    ```json
    {
      "ok": true,
      "id": "recipe_id",
      "rev": "new_revision_id"
    }
    ```
  - **500 Internal Server Error:**
    ```json
    {
      "error": "Error message"
    }
    ```

#### Delete Recipe
- **HTTP Method:** DELETE
- **Endpoint URL:** `/api/recipes/:id`
- **Request:**
  - **URL Parameters:** `id=<recipe_id>`
- **Response:**
  - **200 OK:**
    ```json
    {
      "ok": true,
      "id": "recipe_id",
      "rev": "deleted_revision_id"
    }
    ```
  - **500 Internal Server Error:**
    ```json
    {
      "error": "Error message"
    }
    ```

#### Search Recipes
- **HTTP Method:** GET
- **Endpoint URL:** `/api/recipes/search`
- **Request:**
  - **Query Parameters:** `ingredients=<ingredient>`
- **Response:**
  - **200 OK:**
    ```json
    [
      {
        "_id": "recipe_id",
        "title": "Recipe matching ingredient",
        "ingredients": "Ingredients list",
        "instructions": "Cooking instructions",
        "image": "Image URL",
        "user": "user_id"
      }
    ]
    ```
  - **500 Internal Server Error:**
    ```json
    {
      "error": "Error message"
    }
    ```

## Installation & Usage Instructions

- Node.js (version 14 or higher)
- npm (Node Package Manager)

1. Clone the repository:
   ```bash
   git clone https://github.com/bubbly1234566789/recipe_guide_application
   cd recipe_guide_application

2. npm install 
3. node src/backend/Express.js  ()

## Contact information
Name: Gelila Getachew
Email: ggetachew@umass.edu