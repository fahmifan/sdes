// constant
const P10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6]
const P8 = [6, 3, 7, 4, 8, 5, 10, 9]

// permutate a key to perm
const permut = (key, perm) => {
    if(key.length <= 0) return []
    if(perm.length <= 0) return []
    let newKey = []

    // create a new key with P10 value as key[value]
    perm.forEach(el => {
        newKey.push(key[el-1])
    });

    return newKey
}

const ls1 = (keys) => {
    if(keys.length <= 0) return []

    let newKey = []
    
    keys.forEach((key, i, arr) => {        
        if(i === arr.length-1) newKey.push(arr[0])
        else newKey.push(arr[i+1])
    })

    return newKey
}

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

// generate [k1, k2]
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

    return {"k1": k1, "k2": k2}
}

