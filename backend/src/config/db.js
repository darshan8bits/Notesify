import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "notes_app",
    password: "2412011",
    port: 5432,
});

export default pool;