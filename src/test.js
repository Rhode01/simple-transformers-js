import { pipeline } from '@xenova/transformers';
import { env } from '@xenova/transformers';

env.allowLocalModels =  false
env.useBrowserCache = false;
// Allocate a pipeline for sentiment-analysis
export async function executePipe(message){
    console.log("Initializing the pipeline...");
    const pipe = await pipeline('sentiment-analysis','Xenova/bert-base-multilingual-uncased-sentiment');
    const result = await pipe(message);
    console.log(result);
    
    console.log("Finish!");
    return result
}

// executePipe()
// .catch((error) => {
//     console.log(error.message);
// })

onmessage = async function(message){
    const text = message.text
    console.log("calling...");
    const response = executePipe(text)
}

// Initializing the pipeline...
// App.jsx?t=1720082659962:28 Unexpected token '<', "<!doctype "... is not valid JSON