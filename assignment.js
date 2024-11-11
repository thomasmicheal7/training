/*function createSequentialIdGenerator(baseValue) {
    intialValue=baseValue
    return()=>
    {
        intialValue++
        return intialValue
    }
  }
  const generateUniqueId = createSequentialIdGenerator(999);
  console.log(generateUniqueId()); // Expected output: 1000
  console.log(generateUniqueId()); // Expected output: 1001
  console.log(generateUniqueId()); // Expected output: 1002*/


 /* function swapKeyAndValues(obj) {

    Object.keys(obj).forEach((key)=>{
        obj[obj[key]]=key
        delete obj[key]

    })
    

  }
  
  const sampleObject = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
  };
  
  swapKeyAndValues(sampleObject);
  console.log(sampleObject);
  
 */

const add = (num1)=> {
    curriedAdd=(num2)=>{
        if (num2!=undefined)
            return add(num1+num2)
        else
            return num1 
    }
    return curriedAdd
  }
const result=add(1)(2)(3)(4)()
console.log(result)