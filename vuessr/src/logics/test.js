import mysql from "mysql";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "exert",
  password: "password",
  database: "exert",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function getTests() {
  return new Promise((resolve, reject) => {
    pool.getConnection((e, conn) => {
      if (e) reject(e);
      else {
        conn.query("SELECT * FROM test", (e, r, f) => {
          if (e) reject(e);
          else {
            conn.release();
            resolve(r);
          }
        });
      }
    });
  });
}

export async function getTest(id) {
  return new Promise((resolve, reject) => {
    pool.getConnection((e, conn) => {
      if (e) reject(e);
      else {
        conn.query(`SELECT * FROM test WHERE id=${id}`, (e, r, f) => {
          if (e) reject(e);
          else {
            conn.release();
            resolve(r);
          }
        });
      }
    });
  });
}
