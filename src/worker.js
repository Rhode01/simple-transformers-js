import { env, pipeline } from "@xenova/transformers";

env.allowLocalModels = false;
env.useBrowserCache = false;

class SentimentAnalysis {

  static sentimentPipeline = null
  static async loadPipeline() {
    if (!this.sentimentPipeline) {
      try {
        console.log("model initialization ....");
        this.sentimentPipeline = await pipeline("sentiment-analysis", 'Xenova/bert-base-multilingual-uncased-sentiment');
      } catch (error) {
        return { error: error.message };
      }
    }
    return this.sentimentPipeline;
  }

  static async analyseText(text) {
    const modelPipeline = await this.loadPipeline();
    try {
      const result = await modelPipeline(text);
      return result;
    } catch (error) {
      return { error: "Failed to analyze text" };
    }
  }
}
onmessage = async function(message){
  const text = message.data;
  const response = await SentimentAnalysis.analyseText(text);
  postMessage(response)
};





