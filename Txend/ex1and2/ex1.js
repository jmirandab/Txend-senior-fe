function maxArray(arr) {
    let sum = arr[0];
    let newSum = 0;

   // console.log( arr)
    for(let i = 1; i < arr.length; i++) {
        newSum = Math.max( arr[i], newSum + arr[i]);
        sum =  Math.max(sum , newSum); 
    }
    return sum;

}

console.log(maxArray([-2,1,-3,4,-1,2,1,-5,4]))