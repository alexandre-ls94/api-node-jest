import argon2 from "argon2";

async function hashPassword(password: string) {
  const hashPassword = await argon2.hash(password, {
    type: argon2.argon2i,
    parallelism: 3,
  });

  return hashPassword;
}

async function verifyPassword(hash: string, password: string) {
  const response = await argon2.verify(hash, password, {
    parallelism: 3,
    type: argon2.argon2i,
  });

  return response;
}

export { hashPassword, verifyPassword };
