/*arr=[1,2,3,4]
const pushorPop = (opt,num) => {
    if (opt == 1)
        arr.push(num)
    else if (opt ==2)
        arr.pop()
    sum=0
    arr.forEach(item=>{sum+=item}) 
    return sum
}

console.log(pushorPop(2,5))
console.log(arr)*/

/*person ={name:"thomas",age:22, dob:2002
}

Object.freeze(person)
 const changeName = (name) =>{
    newPerson={...person}
    newPerson.name=name
    return newPerson
 
}
 console.log(changeName("micheal"))
console.log(person)*/

/*const createCounter = (incr) => {
    count = 0
    return function () {
        count += incr
        console.log(count)
    } 
}
X = createCounter(3)
X()
X()
X()
X()*/

const wakeUp=(callback)=>{
    setTimeout(()=>{
        console.log("Woke Up")
        callback()
    },2000)
}

const brushTeeth=(callback)=>{
    setTimeout(()=>{
        console.log("Brushed Teeth")
        callback()
    },2000)    
}

const wenttoOffice=(callback)=>{
    setTimeout(()=>{
        console.log("Went To Office")
        callback()
    },2000)
}

const returnHome=()=>{
    setTimeout(()=>{
        console.log("Returned Home")
    },2000)
}

wakeUp(
    ()=>brushTeeth(
        ()=>wenttoOffice(
            ()=>returnHome()
        )
    )
)