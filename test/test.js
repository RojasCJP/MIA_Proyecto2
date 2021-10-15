var oracledb = require("oracledb");

var connAttrs = {
    user: "juanpa",
    password: "juanpa",
    connectString: "localhost:1521/ORCL18",
};

async function connect(consulta) {
    console.log(consulta);
    let conn;

    try {
        conn = await oracledb.getConnection(connAttrs);
        let result = await conn.execute(
            consulta,
            [], // no binds
            {
                outFormat: oracledb.OBJECT,
            }
        );

        console.log(result);
        return { "status": 200, "data": result.rows };
    } catch (error) {
        console.log(error);
        return { "status": 400, "message": error.message };
    }
}
connect("select * from usuario");