to run the seed. ts file

npm install tsx --save-dev

"prisma": {
		"seed": "tsx prisma/seed.ts"
	},

npx prisma migrate dev --name init