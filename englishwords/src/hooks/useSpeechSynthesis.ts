export const useSpeechSynthesis = () => { 
  const warmUp = () => {
    const dummy = new SpeechSynthesisUtterance(" ")
    dummy.volume = 0
    speechSynthesis.speak(dummy)
  }
  
  const speak = (text: string) => { 
    const voices = window.speechSynthesis.getVoices() 

    if (voices.length === 0 || !voices ) {
      setTimeout(() => speak(text),300)
      console.log("잠시후 시도")
      return
    }

    const utterance = new SpeechSynthesisUtterance(text) 
    utterance.voice = 
       voices.find(v => v.name === "Google US English") || 
       voices.find(v => v.lang === "en-US") ||                
       voices.find(v => v.lang.includes("en")) ||
       voices[0]

    if (!speechSynthesis.speaking && !speechSynthesis.pending) {
      warmUp();
      setTimeout(() => speak(text), 200);
      return
    }
    
    utterance.lang = utterance.voice.lang
    utterance.rate = 0.9
    utterance.pitch = 0.9
    utterance.volume = 1

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  } 
    
    return {speak} 
  }