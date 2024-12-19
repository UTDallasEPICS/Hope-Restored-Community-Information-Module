# Hope-Restored-Community-Information-Module

## Project Overview

Hope Restored Missions is a nonprofit organization dedicated to serving the homeless and impoverished in Collin County and North Texas. It provides essential support to vulnerable individuals by helping them secure housing, access medical and mental healthcare, develop job skills, and achieve long-term stability. The organization is staffed by volunteers who need a database to consolidate all available resources for easy reference. The Community Resource Viewer will enable volunteers to quickly find and locate appropriate community resources.

Currently, the resources are provided as a mix of unstructured data from various PDF files, images, and Excel worksheets. A centralized database is needed to consolidate these disparate resources. The database will be accessed via a WordPress front-end, allowing volunteers to search and query the information. Additionally, a separate web application will be developed to enable the organization to perform CRUD operations on the database. Thus, both a WordPress component and a full-stack web application are required for this project.

## Functional Requirements

### Community Resources

- A community resource shall have name and description
- A community resource shall have external contacts such as emails, links, phone numbers
- A community resource shall have tags to be search and filter
- A community resource shall have eligibility requirements
- A community resource shall have demographic constraint
- A community resource shall have cost information

### Application

- The application shall have two views, denoted public view and internal view
- The application shall have one user type: admin and client
- The internal view shall only be accessible by the admin
- The public view shall be accessible to admin and client
- The authentication system shall be integrated with Volgistic
- The authentication system shall be integrated with Google
- The authentication system shall be integrated with internal database

### Public View

- The public view shall follows the color scheme of Hope Restored Mission website
- The public view shall be integrated to the Wordpress website
- The public view shall contain a map of resources
- The client shall be able to search resources
- The client shall be able to filter resources
- The client shall be able to request an update to a resources
- The client shall be able to select multiple resources to a cart
- The client shall be able to view all resources in a cart in one place
- The client shall be able to view all resources in a map
- The client shall be able to select a current location
- The client shall be able to view all resources around the current location
- The client shall be able to chat with a virtual assistance
- The public view shall conformed to accessibility standards

### Private View

- The private view shall follows the color scheme of Hope Restored Mission website
- The private view shall be a standalone website
- The admin shall be able to search resources
- The admin shall be able to filter resources
- The admin shall be able to see requests on a resources
- The admin shall be able to update any information on a resources
- The admin shall be able to delete a resource
- The admin shall be able to add a resource

## Third-Party Services

### Auth0

Auth0 provides authentication and authorization services for the application. It allows users to log in using their Google account or a custom username and password. Auth0 also provides user management and security features. This service is used in private view.

## Tech Stack

- Public Front-End: Vue, Vite, Tailwind CSS, Heroicons
- Admin Front-End: Nuxt.js, Tailwind CSS, Heroicons
- Admin Back-End: Nuxt.js, Prisma
- Database: PostgreSQL, ParadaDB
- DevOps: Docker
- Recommended Tools to use: Postman or any other API testing platform

## Folder Structures

```
nuxt-app/
│
├── assets/                # Uncompiled assets like Sass, images, fonts
├── components/            # Vue.js components
├── pages/                 # Pages (Vue components)
├── static/                # Static files (e.g., images and resources data)
├── utils/                 # General utility functions
├── server/
│   ├── api/               # Server-side API handling
│   ├── db/                # Database models or utilities
│   ├── middleware/        # API middleware
│   ├── usage/             # Prisma functions

|   --- PRIVATE VIEW ----
├── nuxt.config.js              # Nuxt.js configuration file
├── app.vue                     # Main app component
|   --- PUBLIC VIEW ----
├── vite.config.wordpress.js    # Vite configuration file for Wordpress
├── wordpress.js                # Main entry point
├── index.html                  # Main HTML file
|   --- GENERAL ----
├── docker-compose.yml     # Docker Compose configuration file
├── tailwind.config.js     # Tailwind CSS configuration file
├── tsconfig.json          # TypeScript configuration file
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
# Serve with hot reload at localhost:3000 for the private application
npm run dev
# Serve with hot reload at localhost:4000 for the public application
# Note: The private application need to finish running first before the
# public frontend since the data is being fetched from the private backend
# Just refresh the public frontend page if you see connection error
npm run dev-vue
```
