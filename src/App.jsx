import React,{useState,useEffect} from 'react';
import "./app.css"
const App = () => {
    const [text, setText] = useState("")
    const [result, setResult] = useState([])
    const [showBtn, setshowBtn] = useState(false)
    const [loading, setloading] = useState(false)
    const worker = new Worker(new URL("./worker.js", import.meta.url) ,{
        type:"module"
    })
    worker.onmessage = (event) =>{
        const response = event.data
        setloading(false)
        setResult(response)
    }
    const callWorker = () => {
        setloading(true)
        worker.postMessage(text);
    };
    
    function handleInputChange(e){
        setText(e.target.value)
        if(text.trim().length >5){
            setshowBtn(true)
        }
        else{
            setshowBtn(false)
        }
    }
    return (
        <div className='container'>
            <h4>Sentiment-Analysis with React and TransformersJS</h4>
             <textarea name="text" value={text} placeholder='Type Your message here' onChange={handleInputChange} cols={5} rows={10} required>
           </textarea>
           <div className='results'>
              <span className='result'>
                {result.length > 0 && result.map((res,index)=>(
                    <span key={index}>
                        <p>label:  {res.label}</p>
                        <p> score: {res.score}</p>
                    </span>
                ))}
              </span>
           </div>
            {showBtn && loading ? ""  : <button className='btn' onClick={callWorker}>Send</button>}
        </div>
    );
};

export default App;
