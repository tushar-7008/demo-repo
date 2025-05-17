input  = [1,2,3,4,0];
ans = input.map((i)=>{
    return i*2;
})
console.log(ans);

newAns = input.filter((i)=>{
    return i%2==0 ? true : false;
})

console.log(newAns)