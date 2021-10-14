import oracledb from "oracledb";
import keys from "./keys";

async function runTest() {
  let conn;

  try {
    conn = await oracledb.getConnection(keys.database);

    const result = await conn.execute("select * from usuario;");

    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
  return conn;
}

const connection = runTest();
export default connection;
