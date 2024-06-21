# BlogsHub

## Express API for Blogs App

This Express API serves as the backend for a blogs application, providing endpoints for managing blog posts, users, authentication, and more. It utilizes TypeScript for type safety, Mongoose as an ORM for MongoDB database management, Zod for input validation, Multer for file uploads, Nodemailer and MailerSend for password reset functionality with rate limiting, and JWT with refresh tokens for authentication, including roles-based authorization. In development mode, it uses Nodemon for automatic server restarts.

## Features

- **User Authentication and Management**:
  - Users can sign up and sign in.
  - Users can reset passwords.
  - Users can **follow** other users.
- **Blog Post Management**:
  - Each user can add, edit, and delete their own blog posts.
  - Each blog post has a cover image, likes, and comments.
  - Users can comment on any blog post.
  - Users can **like/unlike** blogs.
- **Comments with Replies**:
  - Comments can have **Replies** (nested comments).
- **Authorization and Roles**:
  - JWT with refresh tokens is used for authentication.
  - Roles-based authorization is implemented, with admin privileges to delete any blog, comment, or user.
- **File Uploads**:
  - Users can upload profile images for their profiles using Multer.
  - Users can upload cover images for their blog posts using Multer.
- **Email Functionality**:
  - Nodemailer and MailerSend are used for password reset functionality with **rate limiting**.

## Technologies Used

- **Docker**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Tokens)**
- **Zod**
- **Multer**
- **Nodemailer**
- **Rate Limiting**
- **Nodemon**
- **MailerSend**
- **Uploadcare**

## Configuration

Add `.env` file and fill in the necessary environment variables.

```
ENVIRONMENT =
PORT =
DATABASE_URI =

ACCESS_TOKEN_SECRET =
REFRESH_TOKEN_SECRET =

EMAIL_HOST =
EMAIL_PORT =
EMAIL_USERNAME =
EMAIL_PASSWORD =
EMAIL_FROM =

UPLOADCARE_SECRET =
```

## Installation & Usage

1. Clone the repository:

   ```
   git clone https://github.com/JooZef315/BlogsHub-API
   ```

2. Navigate to the project directory:

   ```
   cd <project-directory>
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. To start the server in development mode with nodemon, run:

   ```
   npm run dev
   ```

### Or using Docker

To start the server in development mode with Docker, run:

```
docker build -t blogshub-image .
```

```
docker run -d --name blogshub-container -v ${PWD}:/app -p <PORT_NUM>:<PORT_NUM> --env-file .env blogshub-image
```

## API Endpoints

Detailed documentation for API endpoints can be found in the [API Documentation](#api-documentation) section below.

## API Documentation

### Authentication

1. **Register a new user**

   - **Description**: Register a new user.
   - **Method**: POST
   - **Route**: /api/v1/users/
   - **Access**: Public
   - **Output**: Success message

2. **Authenticate a user**

   - **Description**: Authenticate a user and get JWT token.
   - **Method**: POST
   - **Route**: /api/v1/auth/login
   - **Access**: Public
   - **Output**: JWT token

3. **Logout a user**

   - **Description**: Logout a user.
   - **Method**: POST
   - **Route**: /api/v1/auth/logout
   - **Access**: Private
   - **Output**: Success message

4. **Refresh the access token**

   - **Description**: Refresh the access token.
   - **Method**: GET
   - **Route**: /api/v1/auth/refresh
   - **Access**: Private
   - **Output**: Access token

5. **Send an email to reset password**

   - **Description**: Send an email to reset password.
   - **Method**: GET
   - **Route**: /api/v1/auth/forget-password
   - **Access**: Public
   - **Query Parameters**:
   - email (string): User email
   - **Output**: Success message

6. **Reset password**

   - **Description**: Reset password.
   - **Method**: PUT
   - **Route**: /api/v1/auth/reset-password
   - **Access**: Public

### Users

1. **Get all Users**

   - **Description**: get all users.
   - **Method**: GET
   - **Route**: /api/v1/users
   - **Access**: Private (admins)
   - **Output**: users

2. **Get a user**

   - **Description**: get a user.
   - **Method**: GET
   - **Route**: /api/v1/users/:id
   - **Access**: Private
   - **Parameters**:
     - id (string): User ID.
   - **Query Parameters**:
     - full (boolean): Optional. to fully populate the user.
   - **Output**: user

3. **Update a user**

   - **Description**: get a user.
   - **Method**: PUT
   - **Route**: /api/v1/users/:id
   - **Access**: Private
   - **Parameters**:
     - id (string): User ID.
   - **Output**: Success message

4. **Delete a user**

   - **Description**: Delete a user.
   - **Method**: DELETE
   - **Route**: /api/v1/users/:id
   - **Access**: Private
   - **Parameters**:
     - id (string): User ID.
   - **Output**: Success message

5. **Follow/unfollow a user**

   - **Description**: Follow/unfollow a user.
   - **Method**: POST
   - **Route**: /api/v1/users/:id/follow
   - **Access**: Private
   - **Parameters**:
     - id (string): User ID.
   - **Output**: Success message

6. **Change user/ admin roles**

   - **Description**: change user/ admin roles.
   - **Method**: PUT
   - **Route**: /api/v1/users/:id/admin
   - **Access**: Private (admins)
   - **Parameters**:
     - id (string): User ID.
   - **Output**: Success message

### Blogs

1. **Get all Blogs**

   - **Description**: get all blogs.
   - **Method**: GET
   - **Route**: /api/v1/blogs
   - **Access**: Public
   - **Query Parameters**:
     - authorid (string): Optional. to filter by the user.
     - tag (boolean): Optional. to filter by tags.
     - page (number): Optional. for pagination.
   - **Output**: blogs

2. **Create new Blog**

   - **Description**: create new blog.
   - **Method**: POST
   - **Route**: /api/v1/blogs
   - **Access**: Private
   - **Output**: blog

3. **Get a Blog**

   - **Description**: get a blog.
   - **Method**: GET
   - **Route**: /api/v1/blogs/:bid
   - **Access**: Public
   - **Parameters**:
     - bid (string): Blog ID.
   - **Output**: blog

4. **Update a blog**

   - **Description**: Update a blog.
   - **Method**: PUT
   - **Route**: /api/v1/blogs/:bid
   - **Access**: Private
   - **Parameters**:
     - bid (string): Blog ID.
   - **Output**: Success message

5. **Delete a blog**

   - **Description**: Delete a blog.
   - **Method**: DELETE
   - **Route**: /api/v1/blogs/:bid
   - **Access**: Private
   - **Parameters**:
     - bid (string): Blog ID.
   - **Output**: Success message

6. **Get followed Blogs**

   - **Description**: get blogs from users you follow.
   - **Method**: GET
   - **Route**: /api/v1/blogs/followed-blogs
   - **Access**: Private
   - **Query Parameters**:
     - page (number): Optional. for pagination.
   - **Output**: blogs

7. **Like/unlike a blog**

   - **Description**: like/unlike a blog.
   - **Method**: POST
   - **Route**: /api/v1/blogs/:bid/like
   - **Access**: Private
   - **Parameters**:
     - bid (string): Blog ID.
   - **Output**: Success message

8. **Get all comments for a blog**

   - **Description**: get all comments for a blog.
   - **Method**: GET
   - **Route**: /api/v1/blogs/:bid/comments
   - **Access**: Private
   - **Parameters**:
     - bid (string): Blog ID.
   - **Query Parameters**:
     - nested (boolean): Optional. to get the comments nested.
   - **Output**: comments

9. **create new comment**

   - **Description**: create new comment.
   - **Method**: POST
   - **Route**: /api/v1/blogs/:bid/comments
   - **Access**: Private
   - **Parameters**:
     - bid (string): Blog ID.
   - **Output**: new comments

10. **get a single comment**

    - **Description**: create new comment.
    - **Method**: GET
    - **Route**: /api/v1/blogs/:bid/comments/:cid
    - **Access**: Private
    - **Parameters**:
      - bid (string): Blog ID.
      - cid (string): Comment ID.
    - **Output**: new comments

11. **updata a comment**

    - **Description**: updata a comment.
    - **Method**: PUT
    - **Route**: /api/v1/blogs/:bid/comments
    - **Access**: Private
    - **Parameters**:
      - bid (string): Blog ID.
      - cid (string): Comment ID.
    - **Output**: Success message

12. **Delete a comment**

    - **Description**: updata a comment.
    - **Method**: DELETE
    - **Route**: /api/v1/blogs/:bid/comments/:cid
    - **Access**: Private
    - **Parameters**:
      - bid (string): Blog ID.
      - cid (string): Comment ID.
    - **Output**: Success message

## License

This project is licensed under the [MIT License](LICENSE).
