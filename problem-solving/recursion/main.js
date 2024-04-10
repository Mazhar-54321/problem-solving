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

function generateAllCombinations(prefix,remaining,res=[]{
    if(remaining.length===0){
        res.push(prefix);
    }
    for(let i=0;i<remaining.length;i++){
        const np = prefix+remaining[i];
        const nR = remaining.slice(0,i)+remaining.slice(i+1);
        generateAllCombinations(np,nR,res);
    }
    return res;
}
console.log(generateAllCombinations('','abc'))
console.log(factorial(5))
console.log(fibonacci(5))
console.log(sumOfDigits(123))
console.log(palindrome('abca'))
console.log(power(2,3));
console.log(GCD(15,10));
towerOfHanoi(3,3,2,1)
function minSubArraySum(arr,target){
    let end=0,start=0,sum=0,minLength=Infinity;
    while(end<arr.length){
        sum+=arr[end++];
        while(sum>=target){
            if(sum===target){
                minLength=Math.min(Infinity,end-start);   
            }
            sum-=arr[start++];
        }
    }
    return minLength;
    
}
const consecutiveOnes = (arr, k) => {
	let start = 0,
		end = 0,
		res = 0,
		flipped = 0;
	while (end < arr.length) {
		if (arr[end] === 1) {
			res = Math.max(res, end - start + 1);
		} else {
			if (arr[end] === 0 && flipped < k) {
				flipped++;
				res = Math.max(res, end - start + 1);
			} else {
				while (start < arr.length) {
					if (arr[start++] === 0) {
						break;
					}
				}
			}
		}
		if (end < arr.length) {
			end++;
		}
	}
};

const maxRectangleSum = (arr=[],k1=3) =>{
   let start=0,max=Number.NEGATIVE_INFINITY;
   let res=new Array(arr.length).fill(0)
   while(start<arr[0].length){
    let col=start;
    while(col<arr[0].length){
        let i=0,k=0;
      while(i<arr.length){
           res[k++]+=arr[i][col]
           i++;
      }
      col++;
      max=Math.max(max,getMaxSumInAColumn(res,k1))
    }
    res.fill(0)
start++;
   }
   return max;
}
const getMaxSumInAColumn=(arr=[],k)=>{
    let max_so_far = 0, max_ending_here=0;
    for(let i=0;i<arr.length;i++){
        max_ending_here=Math.max(arr[i],max_ending_here+arr[i]);
        max_so_far=Math.max(max_so_far,max_ending_here);
    }
    return max_so_far;

}

const totalSubArraysSummingToK = (arr=[],k)=>{
let res=0,start=0,end=0,sum=0,indexArray=[];
while(end<arr.length){
 sum+=arr[end];
 while(sum>=k){
    if(sum==k){
        res++;
        indexArray.push([start,end])
    }
    sum-=arr[start];
    start++;
 }
 end++;
}
console.log(indexArray)
return res;

}
const totalSubArraySummingToZero = (arr=[])=>{
    let sum=0,start=0;
    for(let i=0;i<arr.length;i++){
        sum+=arr[i];
        while(sum>0){
            sum-=arr[start];
            start++;
        }
    }
}
const woodCuttingProblem = (arr=[20,15,10,17],k=7)=>{
    let [start,end] =arr.reduce((res,curr)=>[Math.min(res[0],curr),Math.max(res[1],curr)],[arr[0],arr[1]]);
    let ans = null;
    while(start<end){
        let mid =Math.floor((start+end)/2);
        if(getChoppedWoodsSize(arr,mid,k)){
            start=mid+1;
            ans=mid
        }else{
            end=mid-1;
        }
    } 
    console.log(ans)
}
const getChoppedWoodsSize = (arr,mid,k)=>{
    let sum=0;
       for(let i=0;i<arr.length;i++){
             if(arr[i]>mid){
                sum+=(arr[i]-mid);
             }
       }
    return sum>=k;
}

const absoluteDifferenceSortedArray =(arr=[])=>{
    let left=0,right = arr.reduce((acc,cv)=>acc+cv,0),lastIndex=arr.length-1;
    let res=[]
    for(let i=0;i<arr.length;i++){
       right-=arr[i];
       res.push(right-left+arr[i]*(i-lastIndex));
       lastIndex--;
       left+=arr[i]
    }
    console.log(res)
}
const twoSum=(arr=[],target)=>{
    let map = new Map();
    for(let i=0;i<arr.length;i++){
        if(map.has(target-arr[i])){
            return [map.get(target-arr[i]),i]
        }else{
            map.set(arr[i],i);
        }
    }
}

const anagramGroups = (anagramGroups=[])=>{
    let alphabets = new Array(26).fill(0);
    let map = new Map();
    for(let i=0;i<anagramGroups.length;i++){
        alphabets = new Array(26).fill(0);
        for(let j=0;j<anagramGroups[i].length;j++){
            
            alphabets[anagramGroups[i][j].charCodeAt(0)-97]++;
        }
        const key = alphabets.reduce((acc,cu,index)=>{
            if(cu!=0){
            return acc+`${String.fromCharCode(97+index)}${cu}`
        }else{
            return acc;
        }
    },'')
if(map.has(key)){
map.set(key,[...map.get(key),...[anagramGroups[i]]])
}else{
    map.set(key,[anagramGroups[i]])
}
    }
return [...map.values()]
}
const longestSequence=(arr=[])=>{
    let map = new Map();
    arr.forEach(e=>map.set(e,1));
    map.forEach((value,key)=>{if(map.has(key-1)){
        map.set(key,0);
    }})
    let res = Number.NEGATIVE_INFINITY;
    map.forEach((value,key)=>{
        if(value===1){
            let count=1;
            
            while(true){
                if(map.has(key+1)){
                    count++;
                    key++;
                }else{
                    break;
                }
            }
            res= Math.max(res,count);
        }
    })
    console.log(res)
}
class Heap{
    #arr=[null]
    insert(data){
      this.#arr.push(data);
      if(this.#arr.length>2){
        let index = this.#arr.length-1;
        while(index>1){
            if(this.#arr[index]<this.#arr[Math.floor(index/2)]){
                //swap
                let temp = this.#arr[index];
                this.#arr[index]=this.#arr[Math.floor(index/2)]
                this.#arr[Math.floor(index/2)]=temp;
            }
            index=Math.floor(index/2);

        }
      }
    }
    print(){
        return this.#arr.slice(1);
    }
    peek(){
        return this.#arr[1];
    }
    largestElement(){
        return this.#arr.slice(1).reduce((acc,curr)=>Math.max(acc,curr),Number.NEGATIVE_INFINITY)
    }
    size(){
        return this.#arr.length-1;
    }
    remove(){
        const length=this.#arr.length;
        this.#arr[1]=this.#arr[length-1];
        this.#arr.pop();
        let startIndex = 1 ;
         while(startIndex<length){
            let leftChild = this.#arr[2*startIndex];
            let rightChild = this.#arr[2*startIndex+1]??Number.POSITIVE_INFINITY;
            if(!leftChild){
                break;
            }
            if(leftChild<rightChild){
                let element1 = this.#arr[startIndex];
                this.#arr[startIndex]=leftChild;
                this.#arr[2*startIndex]=element1;
                startIndex=2*startIndex
            }else{
                let element2 = this.#arr[startIndex];
                this.#arr[startIndex]=rightChild;
                this.#arr[2*startIndex+1]=element2;
                startIndex=2*startIndex+1
            }
         }

    }
    getElements(){
        return this.#arr.slice(1);
    }
}
const kLargestElements =(arr=[7,3,2,9,6,1,2,4,5],k=5)=>{
 let heap = new Heap();
 for(let i=0;i<arr.length;i++){
    if(heap.size()<k){
        heap.insert(arr[i])
    }else{
        if(heap.peek()<arr[i]){
            heap.insert(arr[i]);
            heap.remove();      
        }
    }
 }
return heap.largestElement();
}

const nearestSmallestToLeft = (arr=[0,10,5,8,20,5,1])=>{
    let res= [];
    let stack = [arr[0]];
    let index = 1;
    res.push(-1);
    while(index<arr.length){
        while(stack[stack.length-1]>=arr[index]){
            stack.pop();
        }
        res.push(stack[stack.length-1]??-1);
        stack.push(arr[index]);
        index++;
    }
    return res;
}
const nearestSmallestToRight = (arr=[4,10,5,8,20,5,1])=>{
    let res= [];
    let stack = [arr[arr.length-1]];
    let index = arr.length-2;
    res.push(-1);
    while(index>=0){
        while(stack[stack.length-1]>=arr[index]){
            stack.pop();
        }
        res.unshift(stack[stack.length-1]??-1);
        stack.push(arr[index]);
        index--;
    }
    return res;
}
const nearestLargestToRight = (arr=[4,10,5,8,20,5,1])=>{
    let res= [];
    let stack = [arr[arr.length-1]];
    let index = arr.length-2;
    res.push(-1);
    while(index>=0){
        while(stack[stack.length-1]<=arr[index]){
            stack.pop();
        }
        res.unshift(stack[stack.length-1]??-1);
        stack.push(arr[index]);
        index--;
    }
    return res;
}
const nearestLargestToLeft = (arr=[4,10,5,8,20,5,1])=>{
    let res= [];
    let stack = [arr[0]];
    let index = 1;
    res.push(-1);
    while(index<arr.length){
        while(stack[stack.length-1]<=arr[index]){
            stack.pop();
        }
        res.push(stack[stack.length-1]??-1);
        stack.push(arr[index]);
        index++;
    }
    return res;
}
const allocateBooks = (arr=[3,2,5,4,1,1,2,3],k=4)=>{
    const minAndMax= arr.reduce((acc,curr)=>[Math.max(curr,acc[0]),(curr+acc[1])],[Number.NEGATIVE_INFINITY,0]);
    let min=minAndMax[0],max=minAndMax[1];
    console.log(min,max)
    let ans = null;
        while(min<=max){
            let mid = Math.floor((min+max)/2);
            if(isFeasible(arr,k,mid)){
                    max=mid-1;
                    ans=mid;
            }else{
                min=mid+1;
            }

        }
        console.log('ans',ans)
}
const isFeasible=(arr=[],k,sum)=>{
    let students = 1,res=0;
    for(let i = 0 ;i<arr.length;i++){
         
         if(res+arr[i]>sum){
            res =  arr[i];
            students++;
         }else{
            res+=arr[i];
         }
    }
    //console.log(sum,k,res,students)
    return students <=k;
}
const magneticForceBetweenBalls = (arr=[5,17,100,11],m=2)=>{
    let start=100,end=arr.reduce((sum,curr)=>sum+curr,0);
    let ans=-1;
    console.log(start,end);

    while(start<end){
        let mid = start+ Math.floor((end-start)/2);
        console.log(start,end,mid)

        if(isFeasible(arr,m,mid)){
            ans=mid;
            end=mid-1;
        }else{
            start=mid+1;
            
        }
        //console.log(start,end)
    }
    console.log(ans)
    return ans;

}
const is_possible = (arr,mid,m)=>{
    let counter =0;//2
    let last_position = arr[0];
    console.log("--->",arr,mid,m);
    for(let i=1;i<arr.length-1;i++){
        last_position += arr[i]
        if(last_position >mid){
            last_position=arr[i]
            counter++;
            if(counter===m){
                //console.log(arr,mid,m);
                return true;
            }
            
        }
        
    }
    console.log(last_position,counter,false);
    return false;
}
class Node{
    constructor(data){
        this.data=data;
        this.left=null;
        this.right=null;
    }
}
class BST {
    constructor(){
        this.head=null;
    }
    insert(data){
        const newNode = new Node(data);
        if(!this.head){
            this.head=newNode;
        }else{
            let tempHead = this.head;
            let prevNode = null;
            while(true){
                if(!tempHead){
                    break;
                }
                prevNode = tempHead;
                if(data>=tempHead.data){
                   
                     tempHead=tempHead.right;

                }else{
                    tempHead=tempHead.left;
                }
            }
            if(data>prevNode.data){
                prevNode.right=newNode;
            }else{
                prevNode.left=newNode;
            }
        }
    }
    traversal(){
       console.log(this.#preorderTraversal(this.head));
    }
    #preorderTraversal(root,res=[]){
        if(!root){
            return;
        }
        res.push(root.data)
         this.#preorderTraversal(root.left,res);
         this.#preorderTraversal(root.right,res);
         return res

    }
    nextGreater(data){
        let tempHead = this.head;
        let res=Infinity;
        if(!tempHead){
            return -1;
        }
        while(true){
            if(!tempHead){
                break;
            }
            res=Math.min(res,tempHead.data>data?tempHead.data:res);
           if(data<tempHead.data){
           
             tempHead = tempHead.left;
           }else{
            tempHead=tempHead.right;
           }
        }
        return res;
    }
    prevGreater(data){
        let tempHead = this.head;
        let res=Number.NEGATIVE_INFINITY;
        if(!tempHead){
            return -1;
        }
        while(true){
            if(!tempHead){
                break;
            }
            res=Math.max(res,tempHead.data<data?tempHead.data:res);
           if(data<=tempHead.data){
           
             tempHead = tempHead.left;
           }else{
            tempHead=tempHead.right;
           }
        }
        return res;
    }

}
woodCuttingProblem()
// let tree = new BST();
// tree.insert(5);
// tree.insert(2);
// tree.insert(6);
// tree.insert(1);
// tree.insert(9);
// tree.insert(3);
// console.log(tree.prevGreater(1));
// tree.traversal()
//console.log(nearestLargestToRight())
//console.log(1>Number.NEGATIVE_INFINITY);
//console.log(kLargestElements())
// longestSequence([0,3,7,2,5,8,4,6,0,1])
// console.log(anagramGroups(["eat","tea","tan","ate","nat","bat"]))
// console.log(twoSum([3,3],6))
// absoluteDifferenceSortedArray([1,4,6,8,10])
// console.log(maxRectangleSum([
//     [2,2,-1]]))
// console.log(totalSubArraysSummingToK([1,2,4,7,5,2,7,1,6],7))
// consecutiveOnes([0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0], 3);
console.log(minSubArraySum([1,4,4],4))

