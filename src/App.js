import "./index.css"
import {useState} from 'react'

function App() {
  const [calculator, setCalculator] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/','*','+','-','.'];

  const updateCalculator = value =>{
    if(
      ops.includes(value) && calculator === ''||
      ops.includes(value) && ops.includes(calculator.slice(-1))
    ) {
        return;
    }

    setCalculator(calculator + value);
      if(!ops.includes(value)){
        setResult(eval(calculator + value).toString());
      }

  }

  const allDigits = ()=>{
    const digits = [];

    for(let i=1;i<10;i++){
      digits.push(
        <button onClick={()=>updateCalculator(i.toString())} 
        key={i}> 
        {i} 
        </button>
      )
    }

    return digits;
  }

  const calculation = ()=>{
    setCalculator(eval(calculator).toString())
  }

  const deleteLastDigit = ()=>{
    if (calculator === ''){
      return;
    }
    const value = calculator.slice(0,-1);
    setCalculator(value);

    if(ops.includes(value.slice(-1))){
      setResult(eval(value.toString().slice(0,-1)));
    }
    else{
      setResult(eval(value.toString()));
    }
  }

  return (
    <div className="App">
    <div className="calc">
        <div className="display">
          {result? <span>({result})</span> : "" }
          &nbsp;&nbsp;
          {calculator || "0"}
        </div>
      <div className="arithmetic-operators">
        <button onClick={()=>updateCalculator('/')}>/</button>
        <button onClick={()=>updateCalculator('*')}>*</button>
        <button onClick={()=>updateCalculator('+')}>+</button>
        <button onClick={()=>updateCalculator('-')}>-</button>
        <button onClick={deleteLastDigit}>DEL</button>
      </div>
        <div className="digits-numbers">
          {allDigits()}
          <button onClick={()=>updateCalculator('0')}>0</button>
          <button onClick={()=>updateCalculator('.')}>.</button>
          <button onClick={calculation}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
