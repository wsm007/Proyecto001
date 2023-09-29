import bcrypt from 'bcryptjs';

async function verifyPassword(password) {
  const myPassword = 'admin 1212';
  const hash = 'admin 1212';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
