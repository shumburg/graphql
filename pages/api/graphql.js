// pages/api/graphql.ts
import { ApolloServer, gql } from 'apollo-server-micro';
import Cors from 'micro-cors';


import db from './db';


const cors = Cors({
  origin: '*',
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  allowCredentials: false,
});


// Beispiel-Schema
const typeDefs = gql`
  
  type Query {
    hello: String
  }
  
  type User {
    id: ID!
    username: String
    password: String
  }
  
  type UserLogin {
    id: ID!
    username: String
    success: Boolean
  }
  
  type UserRegister {
    id: ID!
    username: String
    password: String
    state: Int
  }
  
  type Rating {
    user_id: Int!
    level_id: Int!
    rating: Float!
  }
  
  type Level {
    id: ID!
    levelstr: String!
    bonustime: Int!
    proofed: Int!
    levelType: String!
    sort_order: Int!
    bookmarked: Boolean!
    ratings: [Rating]
    ratingAverage: Float!
  }
  
  type Highscore {
    id: ID!
    score: Int!
    user: User!
    date: String!
  }

  type Book {
    id: ID!
    title: String
    vendor: Author
  }
  
  type Author {
    id: ID!
    firstname: String
    lastname: String
  }
  
  type Answer {
    id: ID!
    answer1: String!
  }
  
  type Poi {
    title: String
    author: String
    oldField: String @deprecated(reason: "Use newField.")
    date: String
  }
  
  union SearchResult = Fruits | Vegetable
  union Grocery = Fruits | Vegetable
  
  interface Grocery {
    id: ID!
    name: String
    price: Int!
    quantity: Int
  }
  
  type Fruits implements Grocery {
    id: ID!
    name: String
    price: Int!
    quantity: Int
    averageWeight: Int
    hasEdibleSeeds: Boolean
    nutrients: [String!]
    vendor: Stall
  }
  
  type Vegetable implements Grocery {
    id: ID!
    name: String
    price: Int!
    quantity: Int
    averageWeight: Int
    nutrients: [String!]
    isPickled: Boolean
    vendor: Stall
  }
  
 
  type Stall {
    id: ID!
    name: String!
    stallNumber: String!
    availableFruits: [Fruits!]!
  }

  type Query {
    books: [Book]
    author: [Author]
    grocerys: [Grocery]
    levels: [Level]
    poi: [Poi]
    fruits: [Fruits]
    answers: [Answer]
    highscore: [Highscore]
    mostPopularFruits: [Fruits]
    stalls: [Stall!]!
    getStalls: [Stall!]!
    fruitsById(id: ID!): Fruits
    search(query: String): [SearchResult!]
    searchFruit(query: String): [Fruits!]
    userLogin(input: UserInput): UserLogin
  }
 
  
  type Mutation {
    addLevel(input:LevelInput): Level
    addStall(input:StallInput): Stall
    addBook(input: BookContent): Book
    addAnswer(input: AnswerContent): Answer
    addHighscore(input: HighscoreInput): Highscore
    updateLevel(input: LevelInput): Level
    updateLevelOrder(input: LevelListInput): [Level]
    updateRating(input: RatingInput): Rating
    registerUser(input: UserInput): UserRegister
    deleteLevel(input: LevelIdInput): Level
    deleteBook(id: ID): Book
    updateFruitPrice(input: UpdateFruitPriceInput): Fruits
  }
  
  input BookContent {
    title: String
    vendor: AuthorInput
  }
  
  input UpdateFruitPriceInput {
    id: ID!
    price: Int!
  }
  
  input AuthorInput {
    firstname: String
    lastname: String
  }
  
  input HighscoreInput {
    score: Int
    user_id: String
  }
  
  input AnswerContent {
    answer1: String
  }
  
  input UserInput {
    username: String
    password: String
  }
  
  input StallInput {
    name: String
    stallNumber: String
  }

  input RatingInput {
      user_id: Int!
      level_id: Int!
      rating: Float!
  }
  
  input LevelInput {
    id: Int
    levelstr: String
    bonustime: Int
    proofed: Int
    levelType: String
    sort_order: Int
    bookmarked: Boolean
    ratings: [RatingInput]
    ratingAverage: Float
  }
  
  input LevelListInput {
     levels : [LevelInput!]
  }
  
  input LevelIdInput {
    id: Int
  }
`;


// Beispiel-Daten
let books = [
  { id: "1", title: 'Harry Potter 2', vendorId: "1" },
  { id: "2", title: 'Herr der Ringe', vendorId: "2" }
];

const author = [
  { id: "1", firstname: 'J.K.', lastname: 'Rowling' },
  { id: "2", firstname: 'J.R.R', lastname: 'Tolkien' }
];

const poi = [
  { title: 'Harry Potter 2', author: 'J.K. Rowling', date: new Date('2024-01-01T12:00:00Z') },
  { title: 'Herr der Ringe', author: 'J.R.R. Tolkien', date: new Date('2024-01-01T12:00:00Z') }
];

const fruits = [
  { id: "1", name: 'Apple', price: 4, quantity: 3, averageWeight: 4, hasEdibleSeeds: true, nutrients: [1, 2, 3], vendorId: 1},
  { id: "2", name: 'Orange', price: 3, quantity: 2, averageWeight: 4, hasEdibleSeeds: true, nutrients: [1, 2, 3], vendorId: 1 },
  { id: "3", name: 'Banana', price: 4, quantity: 1, averageWeight: 6, hasEdibleSeeds: true, vendorId: 2 }
];


const vegetables = [
  { id: "1", name: 'Brokoli', price: 4, quantity: 3, averageWeight: 4,  nutrients: [1, 2, 3], vendorId: 1, isPickled: true},
  { id: "2", name: 'Lauch', price: 3, quantity: 2, averageWeight: 4, nutrients: [1, 2, 3], vendorId: 1, isPickled: true },
  { id: "3", name: 'Erbsen', price: 4, quantity: 1, averageWeight: 6, vendorId: 2, isPickled: false }
];

const stalls = [
  { id: "1", name: 'Stall1', stallNumber: "A4", availableFruits: [ 1 ] },
  { id: "2", name: 'Stall2', stallNumber: "F4", availableFruits: [1, 2, 3] },
];


// Resolver definieren
const resolvers = {

  Query: {
    hello: () => 'Hello von GraphQL auf Vercel!',
    answers: async (parent, args, context, info) => {
      const [rows] = await db.query('SELECT * FROM answers');
      return rows;
    },
    levels: async (parent, args, context, info) => {
      const [levels] = await db.query('SELECT * FROM level order by sort_order');
      
      // Alle Ratings auf einmal laden
      const [allRatings] = await db.query('SELECT level_id, user_id as user, rating FROM rating');

      
      // Ratings in ein Objekt gruppieren: { level_id: [ratings] }
      const ratingsMap = {};
      allRatings.forEach(rating => {
        if (!ratingsMap[rating.level_id]) {
          ratingsMap[rating.level_id] = [];
        }
        ratingsMap[rating.level_id].push({ user_id: rating.user, rating: rating.rating });
      });

      
      // Ratings zu Levels zuordnen
      levels.forEach(level => {
        level.ratings = ratingsMap[level.id] || [];
        level.ratingAverage = level.ratings.reduce((sum, rating) => sum + rating.rating, 0) / (level.ratings.length || 1);
      });
      
      return levels;
    },
    highscore: async (parent, args, context, info) => {
      const [rows] = await db.query('SELECT highscore.id, highscore.score, DATE_FORMAT(highscore.datum, \'%d-%m-%Y %H:%i\') as date, user.username FROM highscore, user WHERE highscore.user_id = user.id');
      const sorted = rows.sort((a, b) => b.score - a.score);
      return sorted.map((row) => {row.user = {username: row.username}; return row;});
    },
    userLogin: async (parent, args, context, info) => {
      const [rows] = await db.query('SELECT * FROM user WHERE username = ? AND password = ?', [args.input.username, args.input.password]);
      return {
        id: rows.length > 0 ? rows[0].id : 0,
        username: rows.length > 0 ? rows[0].username : '',
        success: rows.length > 0,
      };
    },
    getStalls: async (parent, args, context, info) => {
      const [rows] = await db.query('SELECT * FROM stall');
      //console.log(rows);
      return rows;
    },
    books: () => books,
    poi: () => poi,
    author: () => author,
    fruits: () => fruits,
    grocerys: () => [...fruits, ...vegetables],
    fruitsById: (_, { id }) => fruits.find(f => f.id === id),
    mostPopularFruits: () => fruits,
    stalls: () => stalls,
    search: (_, { query }) => {
      const resultFruits = fruits.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
      const resultVegetables = vegetables.filter(v => v.name.toLowerCase().includes(query.toLowerCase()));
      return [...resultFruits, ...resultVegetables];
    },
    searchFruit: (_, { query }) => {
      return fruits.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));
    },
  },

  SearchResult: {
    __resolveType(obj) {
      if (obj.hasEdibleSeeds !== undefined) {
        return 'Fruits';
      }
      if (obj.isPickled !== undefined) {
        return 'Vegetable';
      }
      return null; // fallback
    },
  },

  Grocery: {
    __resolveType(obj) {
      if (obj.hasEdibleSeeds !== undefined) {
        return 'Fruits';
      }
      if (obj.isPickled !== undefined) {
        return 'Vegetable';
      }
      return null; // fallback
    },
  },

  Book: {
    vendor: (book) => { return author.find(author => { return parseInt(book.vendorId) === parseInt(author.id) } ) },
  },

  Fruits: {
    vendor: (fruit) => stalls.find(stall => stall.id === fruit.vendorId),
    //name: (fruit) => fruit.name.toUpperCase(),
  },
  Stall: {
    availableFruits: (stall) => {
      return fruits.filter(fruit => stall.availableFruits.includes(fruit.id));
    }
  },
  Mutation: {
    updateLevelOrder: async (_, { input }) => {
      const { levels } = input;

      try {
        for (let i = 0; i < levels.length; i++) {
          const level = levels[i];

          await db.query(
            'UPDATE level SET sort_order = ? WHERE id = ?',
            [i, level.id]
          );
        }

        const [rows] = await db.query(
          'SELECT * FROM level ORDER BY sort_order'
        );

        return rows;
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Reihenfolge:', error);
        throw new Error('Fehler beim Aktualisieren der Reihenfolge');
      }
    },

    updateRating: async (_, { input }) => {
      const { user_id, level_id, rating } = input;

      try {
        await db.query(
          'INSERT INTO rating (user_id, level_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?',
          [user_id, level_id, rating, rating]
        );
      } catch (error) {
        console.error('Fehler beim Aktualisieren der Bewertung:', error);
        throw new Error('Fehler beim Aktualisieren der Bewertung');
      }

      return {
        user_id,
        level_id,
        rating
      };
    },

    updateLevel: async (_, { input }) => {
      const { id, ratings, ratingAverage, ...fields } = input;
      console.log(fields);

      // Wenn ratings und ratingAverage vorhanden sind, in die Tabelle rating schreiben/updaten
      // Duplikate basierend auf user_id + level_id werden aktualisiert
      if (ratings && ratingAverage !== undefined) {
        try {
          for (const rating of ratings) {
            await db.query(
              'INSERT INTO rating (user_id, level_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?',
              [rating.user, id, rating.rating, rating.rating]
            );
          }
        } catch (error) {
          console.error('Fehler beim Einfügen/Aktualisieren der Ratings:', error);
          throw new Error('Fehler beim Einfügen/Aktualisieren der Ratings');
        }
      }

      if (Object.keys(fields).length === 0) {
        throw new Error('Keine Felder zum Aktualisieren übergeben.');
      }

      const sqlParts = [];
      const values = [];

      for (const key in fields) {
        sqlParts.push(`${key} = ?`);
        values.push(fields[key]);
      }


      const sql = `UPDATE level SET ${sqlParts.join(', ')} WHERE id = ?`;
      values.push(id);

      try {
        const [result] = await db.query(sql,
          values
        );
        const [rows] = await db.query('SELECT * FROM level WHERE id = ?', [id]);
        return rows[0];
      } catch (error) {
        console.error('Fehler beim Ändern des Levels:', error);
        throw new Error('Fehler beim Ändern des Levels');
      }
    },

    addStall: async (_, { input }) => {
      const { name, stallNumber } = input;
      try {
        const [result] = await db.query('INSERT INTO stall (name, stallNumber) VALUES (?, ?)', [name, stallNumber]);
        return {
          id: result.insertId,
          name: name,
          stallNumber: stallNumber
        }
      } catch (error) {
        console.error("Failed to add Stall");
        throw new Error('Failed to add Stall');
      }
    },

    addLevel: async (_, { input }) => {
      const { levelstr, bonustime, proofed, levelType, bookmarked } = input;


      try {
        const [res] = await db.query('SELECT COALESCE(MAX(sort_order), 0) + 1 AS next_sort_order FROM level');
        const [result] = await db.query(
          'INSERT INTO level (levelstr, bonustime, proofed, levelType, sort_order, bookmarked) VALUES (?, ?, ?, ?, ?, ?)',
          [levelstr, bonustime, proofed, levelType, res[0].next_sort_order, bookmarked]
        );

        return {
          id: result.insertId,
          levelstr: levelstr,
          bonustime: bonustime,
          proofed: proofed,
          levelType: levelType,
          sort_order: res[0].next_sort_order,
          bookmarked: bookmarked
        };
      } catch (error) {
        console.error('Fehler beim Einfügen des Levels:', error);
        throw new Error('Fehler beim Hinzufügen des Levels');
      }
    },

    updateFruitPrice: async (_, { input }) => {
      fruits.map((f)=> { if(f.id === input.id){f.price = input.price;} return f; });
      const fruit = fruits.filter(fruit => fruit.id !== input.id);
      console.log(fruits);
      return {
        id: input.id,
        name: fruit[0].name,
        price: input.price,
      }
    },

    deleteLevel: async (_, { input }) => {
      const { id } = input;

      try {
        const [result] = await db.query(
          'DELETE FROM level WHERE id=?',
          [id]
        );
        return {
          id: id,
        };
      } catch (error) {
        console.error('Fehler beim Löschen des Levels:', error);
        throw new Error('Fehler beim Löschen des Levels');
      }
    },

    deleteBook: async (_, { id }) => {
      books = books.filter(book => { console.log(id, book.id); return book.id !== id} );

      return {
        id: id
      }
    },

    addHighscore: async (_, { input }) => {
      const { score, user_id } = input;

      const now = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

      const query =
        'INSERT INTO highscore (score, user_id, datum) VALUES (?, ?, ?)';

      const query_user =
        'SELECT id, username FROM user WHERE id = ?';

      const [result_user] = await db.query(query_user, [user_id]);

      if (result_user.length === 0) {
        throw new Error('User nicht gefunden');
      }

      try {
        const [result] = await db.query(query, [
          score,
          user_id,
          now,
        ]);

        return {
          id: result.insertId,
          score,
          user: {
            id: result_user[0].id,
            username: result_user[0].username,
          },
          datum: now,
        };
      } catch (error) {
        throw new Error(
          'Fehler beim Eintragen des Highscores: ' + error
        );
      }
    },

    addBook: async (_, { input }) => {
      const { title, vendor } = input;
      const { firstname, lastname } = vendor;
      const nextId = (author.length > 0
        ? Math.max(...author.map(a => parseInt(a.id))) + 1
        : 1).toString();

      // Vendor hinzufügen
      author.push({ id: nextId, firstname, lastname });

      // Buch hinzufügen mit Vendor-Referenz
      const newBook = {
        title,
        vendorId: nextId
      };
      books.push(newBook);

      return newBook;

      /*return {
        title,
        vendor: {
          firstname,
          lastname
        }
      };*/
    },
    registerUser: async (_,{input} ) => {
      const {username, password} = input;
      try {
        const [rows] = await db.query(
          'SELECT * FROM user WHERE username = ?',
          [username]
        );
        if (rows.length > 0) {
          return {
            id: rows[0].id,
            username,
            state: 0, // 0 = existiert bereits
          };
        }

        // Benutzer einfügen
        const [result] = await db.query(
          'INSERT INTO user (username, password) VALUES (?, ?)',
          [username, password]
        );

        return {
          id: result.insertId,
          username,
          state: 1, // 1 = erfolgreich registriert
        };

      } catch (error) {
        console.error('Fehler beim Einfügen der Users:', error);
        throw new Error('Fehler beim Hinzufügen der Users');
      }
    },
    addAnswer: async (_,{input} ) => {
      const {answer1} = input;
      try {
        const [result] = await db.query(
          'INSERT INTO answers (answer1) VALUES (?)',
          [answer1]
        );
        // Rückgabe des eingefügten Werts (du kannst auch andere Felder zurückgeben, wenn du sie benötigst)
        return {
          id: result.insertId,
          answer1: answer1// Rückgabe des eingefügten Werts
        };
      } catch (error) {
        console.error('Fehler beim Einfügen der Antwort:', error);
        throw new Error('Fehler beim Hinzufügen der Antwort');
      }
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end(); // schnell auf preflight reagieren
    return;
  }

  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};

export default cors(handler);