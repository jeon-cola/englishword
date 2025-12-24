export const useSpeechSynthesis = () => { 
  const speak = (text: string) => { 
    const utterance = new SpeechSynthesisUtterance(text) 

    utterance.lang = "en-US" 
    utterance.rate = 0.9
    utterance.pitch = 0.9
    utterance.volume = 1
    const voices = window.speechSynthesis.getVoices() 
    utterance.voice = voices.find(v => v.name === "Google US English") || null 
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance) 

  } 
    
    return {speak} 
  }