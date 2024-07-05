import React,{useState,useEffect} from 'react';
import "./app.css"
const App = () => {
    const [text, setText] = useState("")
    const [result, setResult] = useState(null)
    const [showBtn, setshowBtn] = useState(false)
    const worker = new Worker(new URL("./worker.js", import.meta.url) ,{
        type:"module"
    })
    worker.onmessage = (event) =>{
        const {data} = event
        setResult(data)
    }
    const callWorker = () => {
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
                {result && <p>{result}</p>}
              </span>
           </div>
            {showBtn && <button className='btn' onClick={callWorker}>Send</button>}
        </div>
    );
};

export default App;
