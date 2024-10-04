# Hope-Restored-Community-Information-Module

## Folder Structures

```
nuxt-app/
│
├── assets/                # Uncompiled assets like Sass, images, fonts
├── components/            # Vue.js components
├── layouts/               # Layouts for the app
├── middleware/            # Custom middlewares
├── pages/                 # Pages (Vue components)
├── plugins/               # Nuxt plugins
├── static/                # Static files (e.g., images)
├── store/                 # Vuex store for state management
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
docker compose -f "docker-compose.yml" up -d --build
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
npm run dev
```
