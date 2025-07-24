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
"[project]/pages/api/graphql.ts [api] (ecmascript)": ((__turbopack_context__) => {
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
const typeDefs = __TURBOPACK__imported__module__$5b$externals$5d2f$apollo$2d$server$2d$micro__$5b$external$5d$__$28$apollo$2d$server$2d$micro$2c$__cjs$29$__["gql"]`
  type Query {
    hello: String
  }
`;
const resolvers = {
    Query: {
        hello: ()=>'Hallo von GraphQL auf Vercel!'
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

//# sourceMappingURL=%5Broot-of-the-server%5D__39b97c73._.js.map