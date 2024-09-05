import dotenv from 'dotenv'
dotenv.config()

export default {
    development: {
        username: process.env.PG_AUTH_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE,
        host: process.env.PG_HOST,
        dialect: process.env.PG_DIALECT
    },
    test: {
        username: process.env.PG_AUTH_USER,
        password: process.env.PG_PASSWORD,
        database: process.env.PG_DATABASE_TEST,
        host: process.env.PG_HOST,
        dialect: process.env.PG_DIALECT
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.PG_DATABASE_PRODUCTION,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
}