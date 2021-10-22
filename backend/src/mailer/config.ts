import nodemailer from "nodemailer";

export class Mail {
  apellido: string;
  nombre: string;
  correo: string;
  constructor(nombre: string, apellido: string, correo: string) {
    this.apellido = apellido;
    this.nombre = nombre;
    this.correo = correo;
  }
  transporter: any = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: "proyectoarchivos37@gmail.com",
      pass: "holabuenas",
    },
  });

  generateRandomString = (num: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result1 = "";
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result1 += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    return result1;
  };

  async sendMail() {
    var contra: string = this.generateRandomString(10);
    var mensaje =
      "hola tu usuario es " +
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
    await this.transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email enviado: ", info.response);
      }
    });
    return contra;
  }
}
