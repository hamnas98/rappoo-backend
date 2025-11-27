Rappoo Backend - Bckend API - Express.js backend with MongoDB

Features
--------

RESTful API with Express.js
MongoDB database with Mongoose
JWT authentication
Admin panel API
CORS enabled
Landing Page Content management (Hero, About, Testimonials, FAQ)

Requirment
-----------

Node.js (v18 or higher)
MongoDB Atlas account
npm

Installation
---------------

Clone the repository :-

git clone <your-repo-url>
cd rappoo-backend

Install dependencies

npm install

Create .env file

Update .env with your values

//generating strong jwt secrect

jwt node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

// env examples
----------------

envPORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your secret key
JWT_EXPIRE=24h
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@rappoo.com
ADMIN_PASSWORD=Admin@123
ADMIN_NAME=Reppoo Admin

Seed the database - create admin and initail dynamic contents for frontend landing pages 
----------------- 

go to 
cd src/seeds/

node seedContent
node createAdmin

Start development server

npm run dev
Server will run on http://localhost:5000


API Endpoints
---------------

Public Endpoints :-

GET /api/hero - Get hero section content
GET /api/about - Get about section content
GET /api/testimonials - Get all testimonials
GET /api/faqs - Get all FAQs

Admin / Protected Endpoints (Require JWT) :-

POST /api/auth/login - Admin login
POST /api/auth/verify - Verify JWT token
PUT /api/hero - Update hero content
PUT /api/about - Update about content
POST /api/testimonials - Create testimonial
PUT /api/testimonials/:id - Update testimonial
DELETE /api/testimonials/:id - Delete testimonial
POST /api/faqs - Create FAQ
PUT /api/faqs/:id - Update FAQ
DELETE /api/faqs/:id - Delete FAQ


Project folder Structure
---------------------

rappoo-backend/
├── src/
│   ├── config/
│   │   ├── db.js           # Database connection
│   │   └── env.js          # Environment variables
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── seeds/              # Database seeders
│   └── server.js           # Express app setup
├── .env                           
├── .gitignore
├── package.json
└── README.md

Commands
-----------
npm run dev          # Start development server with nodemon
npm start            # Start production server
node run seedContent       # Seed content data
node run createAdmin # Create admin user
```````````````````````````````````````````````````````````````````
````````````````````````````````````````````````````````````````
`````````````````````````````````````````````````````````


.env.example for Backend
-------------------------
# server port adn dev/prod
PORT=5000
NODE_ENV=development // for logger

# mongodb URI
MONGODB_URI=mongodb+srv://hamnascp98_db_user:reppoo4913@cluster0.sblit7a.mongodb.net/


# jwt 
JWT_SECRET=6637f3d6848a722809ed4516b7c74f7b530433eece6a7f0565c03972e81e6cdaee8be2df0018ae26e1afb0d2e97131084f92b410c518bc851ebc0060f09bb6a3
JWT_EXPIRE=24h

# frontend URL 
FRONTEND_URL=http://localhost:3000

# Admin Credentials for adding 
ADMIN_EMAIL=admin@rappoo.com
ADMIN_PASSWORD=Admin@123
ADMIN_NAME =Reppoo Admin 1



