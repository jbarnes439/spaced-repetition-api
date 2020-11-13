# Spanglish server: A spaced repetition API!

## Links
   Live: 
   Client-code: https://github.com/jbarnes439/spaced-repetition.git
## Stack
Create-react-app was used to create the front end. The app utilizes a RESTful API pattern created with Postgresql, ExpressJS and NodeJS
## Endpoints
### POST /api/auth/login
   // req.body
   {
      username: string,
      password: string
   }

   // res.body
   {
      authToken: string
      user: string
   }

### GET /api/language
   // protected endpoint
   // res.body
   {
      language: {
         head: integer
         id: integer
         name: string
         total_score: integer
         user_id: integer
      },
      words: [
         integer(id): {
            correct_count: integer
            id: integer
            incorrect_count: integer
            language_id: integer
            memory_value: integer
            next: integer
            original: string
            translation: string
         },
      ]
   }

### GET /api/language/head
      // protected endpoint
      // res.body
      {
         nextWord: string,
         totalScore: integer,
         wordCorrectCount: integer,
         wordIncorrectCount: integer
      }

### POST /api/language/guess
      // protected endpoint
      // req.body
      {
         guess: string
      }

      // res.body
      {
         answer: string,
         isCorrect: boolean,
         nextWord: string,
         wordCorrectCount: integer,
         wordIncorrectCount: integer,
         totalScore: integer
      }


## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`
