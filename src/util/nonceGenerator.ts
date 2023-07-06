export function nonceGenerator(length: number) {
  let nonce = "";
  const allowed =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    nonce = nonce.concat(
      allowed.charAt(Math.floor(Math.random() * allowed.length))
    );
  }
  return nonce;
}
