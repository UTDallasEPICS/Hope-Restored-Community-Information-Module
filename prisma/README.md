# to run the seed. ts file

npm install tsx --save-dev

"prisma": {
"seed": "tsx prisma/seed.ts"
},

npx prisma migrate dev --name init

# ParadeDB Search

This project is using ParadeDB full-text search functionality, located in `add_index` migration file
