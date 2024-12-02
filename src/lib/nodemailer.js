// lib/nodemailer.js
import nodemailer from 'nodemailer';

export async function sendConfirmationEmail(to, name) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: "2024serviexpress@gmail.com",  
      pass: "oscs fcux uagq xtev",  
    },
  });

  const mailOptions = {
    from: "2024serviexpress@gmail.com",
    to: to,
    subject: 'Confirmación de Registro',
    text: `¡Hola ${name}! Gracias por registrarte. Por favor, confirma tu cuenta haciendo clic en el siguiente enlace:`,
    html: `
      <p>¡Hola ${name}!</p>
      <p>Gracias por registrarte. Por favor, confirma tu cuenta haciendo clic en el siguiente enlace:</p>
      <a href="http://localhost:3000/confirmar/${to}">Confirmar cuenta</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de confirmación enviado');
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw new Error('No se pudo enviar el correo de confirmación');
  }
}
