configuracion = {
    user: "juanpa",
    password: "juanpa",
    connectString: "juanpa/juanpa@//localhost:1521/ORCLCDB.localdomain",
};

const oracledb = require('oracledb');

// On Windows and macOS, you can specify the directory containing the Oracle
// Client Libraries at runtime, or before Node.js starts.  On other platforms
// the system library search path must always be set before Node.js is started.
// See the node-oracledb installation documentation.
// If the search path is not correct, you will get a DPI-1047 error.
if (process.platform === 'win32') { // Windows
    oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_19_11' });
} else if (process.platform === 'darwin') { // macOS
    oracledb.initOracleClient({ libDir: process.env.HOME + '/Downloads/instantclient_19_8' });
}

async function run() {

    let connection;

    try {
        // Get a non-pooled connection
        connection = await oracledb.getConnection(configuracion);

        console.log('Connection was successful!');

    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

run();