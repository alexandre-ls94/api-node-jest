import knex from "knex";
import knexConfig from "../../knexfile";

const knexConfigFinal = process.env.NODE_ENV == "test" ? knexConfig.test : knexConfig.development

const connection = knex(knexConfigFinal);

export default connection;
