# Hope-Restored-Community-Information-Module

## Folder Structures

```
nuxt-app/
│
├── assets/                # Uncompiled assets like Sass, images, fonts
├── components/            # Vue.js components
├── pages/                 # Pages (Vue components)
├── static/                # Static files (e.g., images)
├── utils/                 # General utility functions
├── server/                # Custom server code if applicable
│   ├── api/               # Server-side API handling
│   ├── db/                # Database models or utilities
│   ├── middleware/        # API middleware
│
├── nuxt.config.js         # Nuxt.js configuration file
├── package.json           # NPM dependencies and scripts
└── README.md              # Project documentation
```

## Project setup

1. Set up the environment variables in the .env file

```bash
# Replace the values in the .env file with the appropriate values
cp .env.example .env
```

2. Install the dependencies

```bash
npm install
```

3. Run the following command to set up docker container

```bash
docker compose up
```

4. Run the following command to set up prisma

```bash
npx prisma migrate dev
```

Tip: You can use the Prisma Studio to view and edit the data in the database. Run the following command to start the Prisma Studio:

```bash
npx prisma studio
```

5. Run the following command to start the development server

```bash
# Serve with hot reload at localhost:3000 for the admin frontend
npm run dev
# Serve with hot reload at localhost:4000 for the user frontend
npm run dev-vue
```
## Tech Stack
    Front-End: Vue
    Back-End: Nuxt.js
    Database: PostgreSQL
    Other Packages: Prisma
    Recommended Tools to use: Postman or any other API testing platform
## Deployment notes
    Not deployed yet

## Instructions for setting up the development environment
    Initilize database: npx prisma migrate reset
    Get docker up: docker compose up
    There is not authentication yet
    Third: npm run dev

    
    

