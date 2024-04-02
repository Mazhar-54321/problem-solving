// factorial
function factorial(num){

    return num===0?1: num* factorial(num-1);
}
function fibonacci(n,num1=0,num2=1){
    return n-2==0?num2:fibonacci(num2,num1+num2,n-1);
}
function sumOfDigits(n,sum=0){
    return n==0?sum:sumOfDigits(parseInt(n/10),sum+parseInt(n%10))
}
function palindrome(s=''){
    return s.length<=1 || (s[0]===s[s.length-1] && palindrome(s.slice(1,s.length-1)))
}
function power(base,component,res=1){
    return component===0?res:power(base,component-1,res*base);
}
// 10,15
function GCD(num1,num2){
    
    return parseInt(num1%num2)===0?num2:(num1<num2?GCD(num2,num1):GCD(num2,parseInt(num1%num2)));
}
function towerOfHanoi(n,s,a,d){
    if(n==1){
        console.log(`Move disk 1 from rod ${s} to rod ${d}`);
        return;
    }
    towerOfHanoi(n-1,s,d,a);
    console.log(`Move disk ${n} from rod ${s} to rod ${d}`);
    towerOfHanoi(n-1,a,s,d);

}
console.log(factorial(5))
console.log(fibonacci(5))
console.log(sumOfDigits(123))
console.log(palindrome('abca'))
console.log(power(2,3));
console.log(GCD(15,10));
towerOfHanoi(3,3,2,1)

