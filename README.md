# Vintage Keepers

Vintage Keepers is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce web application designed for buying and selling vintage and antique collectibles. The platform provides a seamless shopping experience with product browsing, category management, cart functionality, and secure user authentication.

## Features

### Authentication

* User Sign Up
* User Sign In
* User Sign Out
* Protected Routes

### Product Management

* Add Products
* Update Products
* Delete Products
* Product Listing
* Product Details View

### Categories

* Create Categories
* Browse Products by Category
* Category-Based Filtering

### Search & Filter

* Search Products by Name
* Filter Products by Categories
* Enhanced Product Discovery

### Shopping Cart

* Add to Cart
* Remove from Cart
* Quantity Management
* Cart Total Calculation

### Checkout

* Order Summary
* Checkout Functionality

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)

## Project Structure

```bash
Vintage-Keepers/
│
├── client/          # React Frontend
├── server/          # Node & Express Backend
├── models/          # Database Models
├── routes/          # API Routes
├── controllers/     # Business Logic
├── middleware/      # Authentication & Validation
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/ZainabRupawala2805/Vintage-Keepers-mern.git
cd Vintage-Keepers-mern
```

### Install Dependencies

Backend:

```bash
npm install
```

Frontend:

```bash
cd client
npm install
```

### Configure Environment Variables

Create a `.env` file in the server directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the Application

Backend:

```bash
npm run server
```

Frontend:

```bash
cd client
npm start
```

## Future Enhancements

* Online Payment Gateway Integration
* Wishlist Functionality
* Order History
* Product Reviews & Ratings
* Admin Dashboard
* Image Upload & Management

## Author

**Zainab Rupawala**

Passionate Full Stack Developer specializing in MERN Stack development and modern web applications.

