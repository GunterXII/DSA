function reverse(str){
    return str.split("").reverse().join("")
}
function isPalindrome(stringa){
   if (stringa==reverse(stringa))return true
   else return false
}
console.log(isPalindrome("cddc"));
