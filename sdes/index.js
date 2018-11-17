import sdes, { keyGen } from "./sdes.mjs"

const mkey = [0, 0, 0, 1, 0, 0, 1, 1, 0, 1]
const plainText = [0, 0, 1, 1, 1, 0, 0, 0]

const { k1, k2 } = keyGen(mkey)

console.log("\nk1", k1)
console.log("k2", k2)

console.log("chiperText", sdes(plainText, k1, k2))