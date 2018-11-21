// constant
const P10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6]
const P8 = [6, 3, 7, 4, 8, 5, 10, 9]
const P4 = [2, 4, 3, 1]
const IP = [2, 6, 3, 1, 4, 8, 5, 7]
const IPinv = [4, 1, 3, 5, 7, 2, 8, 6]
const EP = [4, 1, 2, 3, 2, 3, 4, 1]

// Array[row][column] in array
const S0 = [[1, 0, 3, 2], [3, 2, 1, 0], [0, 2, 1, 3], [3, 1, 3, 2]]
// Array[row][column] in array
const S1 = [[0, 1, 2, 3], [2, 0, 1, 3], [3, 0, 1, 0], [2, 1, 0, 3]]

// a binary xor output 0 or 1
const binXor = (a, b) =>  a !== b ? 1 : 0

// permutate a key to perm
const permut = (token, perm) => {
    if(token.length <= 0) return []
    if(perm.length <= 0) return []
    let newToken = []

    // create a new token with P10 value as token[value]
    perm.forEach(el => {
        newToken.push(token[el-1])
    });

    return newToken
}

// left shift 1 of Array
const ls1 = (keys) => {
    if(keys.length <= 0) return []

    let newKey = []
    
    keys.forEach((key, i, arr) => {        
        if(i === arr.length-1) newKey.push(arr[0])
        else newKey.push(arr[i+1])
    })

    return newKey
}

// left shift 2 of Array
const ls2 = (keys) => {
    if(keys.length <= 0) return []

    let newKey = []
    
    keys.forEach((key, i, arr) => {        
        if(i === arr.length-2) newKey.push(arr[0])
        else if(i === arr.length-1) newKey.push(arr[1])
        else newKey.push(arr[i+2])
    })

    return newKey
}

// generate array of key: [k1, k2]
export const keyGen = (key) => {
    const perm10 = permut(key, P10)
    let l0 = perm10.slice(0, 5) // left
    console.log("l0", l0)
    let r0 = perm10.slice(5, 10)
    console.log("r0", r0)

    let l1 = ls1(l0) // left
    console.log("l1", l1)
    let r1 = ls1(r0) // right
    console.log("r1", r1)

    const k1 = permut(l1.concat(r1), P8)
    console.log("k1",k1)

    let l2 = ls2(l1)
    console.log("l2", l2)
    let r2 = ls2(r1)
    console.log("r2", r2)

    const k2 = permut(l2.concat(r2), P8)
    console.log("k2", k2) 

    return {
        "k1": k1, 
        "k2": k2, 
        "p10Val": perm10, 
        "p10L": l0, 
        "p10R": r0,
    }
}

/**
 * function sbox return a sbox value from a token
 * @param token :Array
 * @param matrix :2D-Array
 */
const sbox = (token, matrix) => {
    const rn = Number.parseInt(token[0] + "" + token[3], 2) // row number
    const cn = Number.parseInt(token[1] + "" + token[2], 2) // column number

    console.log("matrix", matrix)
    console.log("cn", cn)
    console.log("rn", rn)
    
    const val = matrix[rn][cn]
    switch(val) {
        case 0: return [0, 0]
        case 1: return [0, 1]
        case 2: return [1, 0]
        case 3: return [1, 1]
    }
}

/**
 * function fk in sdes 
 * @param plainText Array
 * @param key Array
 * @returns {left: Array, right: Array}
 */
export const fk = (key, l0, r0) => {
    if(key.length <= 0) return
    else if(l0.length <= 0) return
    else if(r0.length <= 0) return
    else if(l0.length !== r0.length) return
    
    console.log("\nstart fk ============================================>\n")
    
    // this should be an array with length 8
    const c0 = permut(r0, EP)
    console.log("c0", c0)
    
    const c1 = c0.map((el, i) => binXor(el, key[i]))
    console.log("c1", c1)

    const l1 = c1.slice(0, 4)
    console.log("l1", l1)

    const l2 = sbox(l1, S0)
    console.log("l2", l2)

    const r1 = c1.slice(4, 8)
    console.log("\n\nr1", r1)
    
    const r2 = sbox(r1, S1)
    console.log("r2", r2)

    const c2 = l2.concat(r2)
    console.log("c2", c2)

    const c3 = permut(c2, P4)
    console.log("c3", c3)

    const c4 = c3.map((el, i) => binXor(el, l0[i]))
    console.log("c4", c4)

    const c5 = {"left": c4, right: r0}
    console.log("c5", c5)

    console.log("\nend fk ============================================>\n")

    return c5
}

/**
 * 
 * @param plainText :Array
 * @param k1 :Array
 * @param k2 : Array
 */
const sdes = (plainText, k1, k2) => {
    // init permutation 
    const permToken = permut(plainText, IP)

    // split  plainText into 2: left & right
    const l0 = permToken.slice(0, 4)
    console.log("l0", l0)
    
    const r0 = permToken.slice(4, 8)
    console.log("r0", r0)
    
    const { left, right } = fk(k1, l0, r0)
    // switch the l0 and r0 that pass as params
    const it2 = fk(k2, right, left)

    const c0 = it2.left.concat(it2.right)

    const cipherText = permut(c0, IPinv)
    
    return cipherText.join("")
}

export default sdes