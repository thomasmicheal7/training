class Fizzbuzz{
    constructor(){}
    public fizbuz=(num:number)=>{
        if (num%3==0 && num%5==0){
            return "FizzBuzz";
        }
        if(num%3==0){
            return "Fizz";
        }
        if(num%5==0){
            return "Buzz";
        }
        else{
            return num;
        }

    }
};

export default Fizzbuzz;

// const f=new Fizzbuzz();
// for (let i=1;i<=100;i++){
//     console.log(f.fizbuz(i));
// }

// return Fizzbuzz;