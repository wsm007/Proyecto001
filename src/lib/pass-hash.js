import bcrypt from 'bcryptjs';

async function hashPassword(password) {
  const myPassword = 'admin 1212';
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
