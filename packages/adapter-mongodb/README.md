<p align="center">
   <br/>
   <a href="https://authjs.dev" target="_blank"><img height="64px" src="https://authjs.dev/img/logo/logo-sm.png" /></a>&nbsp;&nbsp;&nbsp;&nbsp;<img height="64px" src="./logo.svg" />
   <h3 align="center"><b>MongoDB Adapter</b> - NextAuth.js</h3>
   <p align="center">
   Open Source. Full Stack. Own Your Data.
   </p>
   <p align="center" style="align: center;">
      <img src="https://github.com/nextauthjs/next-auth/actions/workflows/release.yml/badge.svg?branch=main" alt="CI Test" />
      <a href="https://www.npmjs.com/package/@next-auth/mongodb-adapter" target="_blank"><img src="https://img.shields.io/bundlephobia/minzip/@next-auth/mongodb-adapter" alt="Bundle Size"/></a>
      <a href="https://www.npmjs.com/package/@next-auth/mongodb-adapter" target="_blank"><img src="https://img.shields.io/npm/v/@next-auth/mongodb-adapter" alt="@next-auth/mongodb-adapter Version" /></a>
   </p>
</p>

## Overview

This is the MongoDB Adapter for [`auth.js`](https://authjs.dev). This package can only be used in conjunction with the primary `auth.js` package. It is not a standalone package.

## Getting Started

1. Install `mongodb`, `next-auth` and `@next-auth/mongodb-adapter`

```js
npm install mongodb next-auth @next-auth/mongodb-adapter@next
```

2. Add `lib/mongodb.js`

```js
// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local")
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
```

3. Add this adapter to your `pages/api/[...nextauth].js` next-auth configuration object.

```js
import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "lib/mongodb"

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/configuration/auth-options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: 'my-data-base-name'
  }),
  ...
})
```

## Contributing

We're open to all community contributions! If you'd like to contribute in any way, please read our [Contributing Guide](https://github.com/nextauthjs/next-auth/blob/main/CONTRIBUTING.md).

## License

ISC
