import bcrypt from "bcrypt"

export const confirmPasswordHash = (
  plainPassword: string,
  hashedPassword: string
) =>
  new Promise<boolean>((resolve) => {
    bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
      resolve(res)
    })
  })
