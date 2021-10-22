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
exports.Mail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class Mail {
    constructor(nombre, apellido, correo) {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: "proyectoarchivos37@gmail.com",
                pass: "holabuenas",
            },
        });
        this.generateRandomString = (num) => {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let result1 = "";
            const charactersLength = characters.length;
            for (let i = 0; i < num; i++) {
                result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result1;
        };
        this.apellido = apellido;
        this.nombre = nombre;
        this.correo = correo;
    }
    sendMail() {
        return __awaiter(this, void 0, void 0, function* () {
            var contra = this.generateRandomString(10);
            var mensaje = "hola tu usuario es " +
                this.nombre +
                this.apellido +
                " y tu contrasena es " +
                contra +
                "\n esperamos sea util";
            var mailOptions = {
                from: "proyectoarchivos37@gmail.com",
                to: this.correo,
                subject: "prueba de correo",
                text: mensaje,
            };
            yield this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log("email enviado: ", info.response);
                }
            });
            return contra;
        });
    }
}
exports.Mail = Mail;
