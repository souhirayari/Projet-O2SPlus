const nodemailer = require('nodemailer')


const user = "souhirayari31@gmail.com"; // hedhi t7ot feha l email 
const pass = "ahab kqsc fmiv niwz"; // houni lazmek ta3mel generation lel code hedha gmail apps 

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});
//fonction te5ou 3 parametres
module.exports.sendConfirmationEmail = (
  name,
  login,
  email,
  confirmationCode,
  password
) => {
  // transport houwa jesr from chkoun to amal  html body message chnouwa f wostou
  transport
  .sendMail({
    from: user,
    to: email,
    subject: "Confirmation de votre compte",
    html: `
      <div>
        <h1>Activation du compte</h1>
        <h2>Bonjour ${name}</h2>
        <p>Veuillez confirmer votre email en cliquant sur le lien suivant :</p>
        <a href="http://localhost:5173/confirm/${confirmationCode}">Cliquez ici</a>
        <ul>
          <li>Votre nom d'utilisateur : ${name}</li>
          <li>Votre login d'utilisateur : ${login}</li>
          <li>Votre mot de passe : ${password}</li>
        </ul>
      </div>`,
  })
  .then((info) => {
    console.log("Email sent: " + info.response);
  })
  .catch((err) => {
    console.error("Error sending email:", err);
  });

};