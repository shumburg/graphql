module.exports = {

"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/apollo-server-micro [external] (apollo-server-micro, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("apollo-server-micro", () => require("apollo-server-micro"));

module.exports = mod;
}}),
"[externals]/micro-cors [external] (micro-cors, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("micro-cors", () => require("micro-cors"));

module.exports = mod;
}}),
"[project]/pages/api/graphql.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// pages/api/graphql.ts
__turbopack_context__.s({
    "config": ()=>config,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$apollo$2d$server$2d$micro__$5b$external$5d$__$28$apollo$2d$server$2d$micro$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/apollo-server-micro [external] (apollo-server-micro, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$micro$2d$cors__$5b$external$5d$__$28$micro$2d$cors$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/micro-cors [external] (micro-cors, cjs)");
;
;
const cors = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$micro$2d$cors__$5b$external$5d$__$28$micro$2d$cors$2c$__cjs$29$__["default"])({
    origin: '*',
    allowMethods: [
        'POST',
        'GET',
        'OPTIONS'
    ],
    allowHeaders: [
        'Content-Type'
    ],
    allowCredentials: true
});
// Beispiel-Schema
const typeDefs = __TURBOPACK__imported__module__$5b$externals$5d2f$apollo$2d$server$2d$micro__$5b$external$5d$__$28$apollo$2d$server$2d$micro$2c$__cjs$29$__["gql"]`
  
  type Query {
    hello: String
  }
  
  type User {
    id: ID!
    name: String
    email: String
  }
  
  type Level {
    id: ID!
    levelstr: String!
    bonustime: Int!
    proofed: Int!
    levelType: String!
  }

  type Book {
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
    mostPopularFruits: [Fruits]
    stalls: [Stall!]!
    fruitsById(id: ID!): Fruits
    search(query: String): [SearchResult!]
  }
 
  
  type Mutation {
    addLevel(input:LevelInput): Level
    addBook(input: BookContent): Book
    addAnswer(input: AnswerContent): Answer
    updateLevel(input: LevelInput): Level
    deleteLevel(input: LevelIdInput): Level
  }
  
  input BookContent {
    title: String
    vendor: AuthorInput
  }
  
  input AuthorInput {
    firstname: String
    lastname: String
  }
  
  input AnswerContent {
    answer1: String
  }
  
  input LevelInput {
    id: Int
    levelstr: String
    bonustime: Int
    proofed: Int
    levelType: String
  }
  
  input LevelIdInput {
    id: Int
  }
`;
// Beispiel-Daten
const books = [
    {
        title: 'Harry Potter 2',
        vendorId: "1"
    },
    {
        title: 'Herr der Ringe',
        vendorId: "2"
    }
];
const author = [
    {
        id: "1",
        firstname: 'J.K.',
        lastname: 'Rowling'
    },
    {
        id: "2",
        firstname: 'J.R.R',
        lastname: 'Tolkien'
    }
];
const poi = [
    {
        title: 'Harry Potter 2',
        author: 'J.K. Rowling',
        date: new Date('2024-01-01T12:00:00Z')
    },
    {
        title: 'Herr der Ringe',
        author: 'J.R.R. Tolkien',
        date: new Date('2024-01-01T12:00:00Z')
    }
];
const fruits = [
    {
        id: "1",
        name: 'Apple',
        price: 4,
        quantity: 3,
        averageWeight: 4,
        hasEdibleSeeds: true,
        nutrients: [
            1,
            2,
            3
        ],
        vendorId: 1
    },
    {
        id: "2",
        name: 'Orange',
        price: 3,
        quantity: 2,
        averageWeight: 4,
        hasEdibleSeeds: true,
        nutrients: [
            1,
            2,
            3
        ],
        vendorId: 1
    },
    {
        id: "3",
        name: 'Banana',
        price: 4,
        quantity: 1,
        averageWeight: 6,
        hasEdibleSeeds: false,
        vendorId: 2
    }
];
const vegetables = [
    {
        id: "1",
        name: 'Brokoli',
        price: 4,
        quantity: 3,
        averageWeight: 4,
        hasEdibleSeeds: true,
        nutrients: [
            1,
            2,
            3
        ],
        vendorId: 1,
        isPickled: true
    },
    {
        id: "2",
        name: 'Lauch',
        price: 3,
        quantity: 2,
        averageWeight: 4,
        hasEdibleSeeds: true,
        nutrients: [
            1,
            2,
            3
        ],
        vendorId: 1,
        isPickled: true
    },
    {
        id: "3",
        name: 'Erbsen',
        price: 4,
        quantity: 1,
        averageWeight: 6,
        hasEdibleSeeds: false,
        vendorId: 2,
        isPickled: false
    }
];
const stalls = [
    {
        id: "1",
        name: 'Stall1',
        stallNumber: "A4",
        availableFruits: [
            1
        ]
    },
    {
        id: "2",
        name: 'Stall2',
        stallNumber: "F4",
        availableFruits: [
            1,
            2,
            3
        ]
    }
];
// Resolver definieren
const resolvers = {
    Query: {
        hello: ()=>'Hello von GraphQL auf Vercel!',
        answers: async (parent, args, context, info)=>{
            const [rows] = await db.query('SELECT * FROM answers');
            return rows;
        },
        levels: async (parent, args, context, info)=>{
            const [rows] = await db.query('SELECT * FROM level');
            return rows;
        },
        books: ()=>books,
        poi: ()=>poi,
        author: ()=>author,
        fruits: ()=>fruits,
        grocerys: ()=>[
                ...fruits,
                ...vegetables
            ],
        fruitsById: (_, { id })=>fruits.find((f)=>f.id === id),
        mostPopularFruits: ()=>fruits,
        stalls: ()=>stalls,
        search: (_, { query })=>{
            const resultFruits = fruits.filter((f)=>f.name.toLowerCase().includes(query.toLowerCase()));
            const resultVegetables = vegetables.filter((v)=>v.name.toLowerCase().includes(query.toLowerCase()));
            return [
                ...resultFruits,
                ...resultVegetables
            ];
        }
    },
    SearchResult: {
        __resolveType (obj) {
            if (obj.hasEdibleSeeds !== undefined) {
                return 'Fruits';
            }
            if (obj.isPickled !== undefined) {
                return 'Vegetable';
            }
            return null; // fallback
        }
    },
    Grocery: {
        __resolveType (obj) {
            if (obj.hasEdibleSeeds !== undefined) {
                return 'Fruits';
            }
            if (obj.isPickled !== undefined) {
                return 'Vegetable';
            }
            return null; // fallback
        }
    },
    Book: {
        vendor: (book)=>author.find((author)=>book.vendorId === author.id)
    },
    Fruits: {
        vendor: (fruit)=>stalls.find((stall)=>stall.id === fruit.vendorId)
    },
    Stall: {
        availableFruits: (stall)=>{
            return fruits.filter((fruit)=>stall.availableFruits.includes(fruit.id));
        }
    },
    Mutation: {
        updateLevel: async (_, { input })=>{
            const { id, ...fields } = input;
            if (Object.keys(fields).length === 0) {
                throw new Error('Keine Felder zum Aktualisieren übergeben.');
            }
            const sqlParts = [];
            const values = [];
            for(const key in fields){
                sqlParts.push(`${key} = ?`);
                values.push(fields[key]);
            }
            const sql = `UPDATE level SET ${sqlParts.join(', ')} WHERE id = ?`;
            values.push(id);
            try {
                const [result] = await db.query(sql, values);
                const [rows] = await db.query('SELECT * FROM level WHERE id = ?', [
                    id
                ]);
                return rows[0];
            } catch (error) {
                console.error('Fehler beim Ändern des Levels:', error);
                throw new Error('Fehler beim Ändern des Levels');
            }
        },
        addLevel: async (_, { input })=>{
            const { levelstr, bonustime, proofed, levelType } = input;
            try {
                const [result] = await db.query('INSERT INTO level (levelstr, bonustime, proofed, levelType) VALUES (?, ?, ?, ?)', [
                    levelstr,
                    bonustime,
                    proofed,
                    levelType
                ]);
                return {
                    id: result.insertId,
                    levelstr: levelstr,
                    bonustime: bonustime,
                    proofed: proofed,
                    levelType: levelType
                };
            } catch (error) {
                console.error('Fehler beim Einfügen des Levels:', error);
                throw new Error('Fehler beim Hinzufügen des Levels');
            }
        },
        deleteLevel: async (_, { input })=>{
            const { id } = input;
            try {
                const [result] = await db.query('DELETE FROM LEVEL WHERE id=?', [
                    id
                ]);
                return {
                    id: id
                };
            } catch (error) {
                console.error('Fehler beim Löschen des Levels:', error);
                throw new Error('Fehler beim Löschen des Levels');
            }
        },
        addBook: async (_, { input })=>{
            const { title, vendor } = input;
            const { firstname, lastname } = vendor;
            const nextId = (author.length > 0 ? Math.max(...author.map((a)=>parseInt(a.id))) + 1 : 1).toString();
            // Vendor hinzufügen
            author.push({
                id: nextId,
                firstname,
                lastname
            });
            // Buch hinzufügen mit Vendor-Referenz
            const newBook = {
                title,
                vendorId: nextId
            };
            books.push(newBook);
            return {
                title,
                vendor: {
                    firstname,
                    lastname
                }
            };
        },
        addAnswer: async (_, { input })=>{
            const { answer1 } = input;
            try {
                const [result] = await db.query('INSERT INTO answers (answer1) VALUES (?)', [
                    answer1
                ]);
                // Rückgabe des eingefügten Werts (du kannst auch andere Felder zurückgeben, wenn du sie benötigst)
                return {
                    id: result.insertId,
                    answer1: answer1 // Rückgabe des eingefügten Werts
                };
            } catch (error) {
                console.error('Fehler beim Einfügen der Antwort:', error);
                throw new Error('Fehler beim Hinzufügen der Antwort');
            }
        }
    }
};
const apolloServer = new __TURBOPACK__imported__module__$5b$externals$5d2f$apollo$2d$server$2d$micro__$5b$external$5d$__$28$apollo$2d$server$2d$micro$2c$__cjs$29$__["ApolloServer"]({
    typeDefs,
    resolvers
});
const startServer = apolloServer.start();
const config = {
    api: {
        bodyParser: false
    }
};
const handler = async (req, res)=>{
    if (req.method === 'OPTIONS') {
        res.end(); // schnell auf preflight reagieren
        return;
    }
    await startServer;
    await apolloServer.createHandler({
        path: '/api/graphql'
    })(req, res);
};
const __TURBOPACK__default__export__ = cors(handler);
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__98828ef2._.js.map