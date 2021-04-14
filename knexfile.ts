// Update with your config settings.
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env"
});

export = {
  development: {
    client: process.env.DB_TYPE,
    connection: {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA,
    },
    migrations: {
      tableName: "migrations",
      directory: "src/database/migrations/",
    },
    useNullAsDefault: true,
  },
  test: {
    client: process.env.DB_TYPE,
    connection: {
      filename: process.env.DB_SCHEMA,
    },
    migrations: {
      tableName: "migrations",
      directory: "src/database/migrations/",
    },
    useNullAsDefault: true,
  },
  production: {},
};