const bcrypt = require('bcrypt');

async function generarHash(password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hash para '1234':", hashedPassword);
}

generarHash('1234');
