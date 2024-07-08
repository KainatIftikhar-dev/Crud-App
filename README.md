# Crud App

This CRUD (Create, Read, Update, Delete) application is built with React.js for the frontend and Express.js with MongoDB for the backend. It allows users to manage categories by performing CRUD operations.
 
## Frontend

## Components

1. **Category List:** Displays a list of categories fetched from the backend. Each category item includes three buttons: Detail, Edit, and Delete.

  - **Detail Button:** Shows detailed information about the selected category, including its image and name.
  - **Edit Button:** Allows users to edit the name and image of the category.
  - **Delete Button:** Deletes the category from the backend data.

2. **Add New Category:** Enables users to add a new category by providing a name and image. The added category is then displayed in the Category List component.

## Technologies Used

  - **React.js:** A JavaScript library for building user interfaces.
  - **Axios: A** promise-based HTTP client for making requests to the backend API.

## Backend

## API Endpoints

  - **GET /categories:** Retrieves a list of categories from the backend.
  - **POST /categories:** Adds a new category to the backend data.
  - **PUT /categories/:id:** Updates an existing category with the specified ID.
  - **DELETE /categories/:id:** Deletes the category with the specified ID from the backend data.

## Image Storage

  - Images for categories are stored using Cloudinary, a cloud-based image management solution.

## Installation

1. Clone the repository:
   ```bash
   git clone [repository_url]
2. Install frontend dependencies:
   ```bash
   cd frontend
    npm install
3. Install backend dependencies:
   ```bash
   cd backend
    npm install
4. Set up environment variables:
Create a `.env` file in the backend directory and add the following variables:
    ```bash
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    
Replace `your_mongodb_uri`, `your_cloudinary_cloud_name`, `your_cloudinary_api_key`, and `your_cloudinary_api_secret` with your actual MongoDB URI and Cloudinary credentials.

## Usage

1. Start the backend server:
   ```bash
   cd backend
    npm start
2. Start the frontend development server:
   ```bash
   cd frontend
    npm start
3. Access the application in your browser at `http://localhost:3000`.

# Project Video

https://github.com/SyedSabee/Crud-App/assets/145167243/a2a8fac0-3ec3-44c2-870a-4f77d217701c

