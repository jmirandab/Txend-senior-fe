function countStr(str) {
    let result = "";
    for(let i = 1; i < str.length; i++){
        let count = 1;
        let newStr = "";
         
            while(str[i] === str[i-1]) {
                i++;
                count++;
                newStr = str[i-1]+count;
            }
            if(newStr != ""){
                result += newStr
            }
            else {
                result += str[i-1]+ "1";
            }
    }
    return result;
}

function countStr2(str) {
    let result = "";
    let count = 1;
    for(let i = 1; i < str.length; i++){        
            if(str[i] === str[i-1]) {
                count++;
            }
            else {
                result +=  str[i-1]+count;
                count = 1;
            }
    }
    return result +=  str[str.length-1] + count;
}

console.log(countStr2("aabcccccaaa"));
console.log(countStr2("aaabbcccc"));