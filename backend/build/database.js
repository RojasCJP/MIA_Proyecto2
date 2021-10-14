"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oracledb_1 = __importDefault(require("oracledb"));
const keys_1 = __importDefault(require("./keys"));
function runTest() {
    return __awaiter(this, void 0, void 0, function* () {
        let conn;
        try {
            conn = yield oracledb_1.default.getConnection(keys_1.default.database);
            const result = yield conn.execute("select * from usuario;");
            console.log(result);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            if (conn) {
                try {
                    yield conn.close();
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
        return conn;
    });
}
const connection = runTest();
exports.default = connection;
