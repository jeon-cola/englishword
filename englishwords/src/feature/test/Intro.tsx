export const renderIntro = (part: string) => {
        switch (part) {
            case "1" :
                return (
                    <div className="text-xl px-3">
                        <p>In this part of test, you will read aloud the text on the screen.</p>
                        <p>You will have 45 seconds to prepare.</p>
                        <p>Then you will have 45 seconds to read the text aloud</p>
                    </div>
            )
            case "2" :
                return (<div className="text-xl px-3">
                        <p>In this part of the test, you will describe the picture on your screen in as much detail as you can.</p>
                        <p>You will have 45 seconds to prepare your response.</p>
                        <p>Then you will have 30 seconds to speak about the picture.</p>
                    </div>)
            case "3" : return (<div className="text-xl px-3">
                        <p>In this part of the test, you will answer three questions.</p>
                        <p>You will have three seconds to prepare after you hear each question.</p>
                        <p>You will have 15 seconds to response to Question 1 and 2, and 30 seconds to respond to Question3</p>
                    </div>)
            case "4" : return(<div className="text-xl px-3">
                        <p>In this part of the test, you will answer three questions based on the information provided.</p>
                        <p>You will have 45 seconds to read the information before the questions begin.</p>
                        <p>You will have three seconds to prepare and 15 seconds to respond to Questions 1 and 2.</p>
                        <p>You will hear Question 3 two times.</p>
                        <p>You will have three seconds to prepare and 30 seconds to respond to Question 3.</p>
                    </div>)
            case "5" : return(<div className="text-xl px-3">
                        <p>In this part of the test, you will give your opinion about a specific topic.</p>
                        <p>Be sure to say as much as you can in the time allowed.</p>
                        <p>You will have 45 seconds to prepare.</p>
                        <p>Then you will have 60 seconds to speak.</p>
                    </div>)
            default: 
                return null
        }
    }

export const introTextMap: Record<string, string[]> = {
  "1":  [
    "In this part of the test, you will read aloud the text on the screen.",
    "You will have 45 seconds to prepare.",
    "Then you will have 45 seconds to read the text aloud."
  ],
  "2": [
    "In this part of the test, you will describe the picture on your screen.",
    "You will have 45 seconds to prepare your response.",
    "Then you will have 30 seconds to speak about the picture."
  ],
  "3": [
    "In this part of the test, you will answer three questions.",
    "You will have three seconds to prepare after you hear each question.",
    "You will have 15 seconds to respond to Questions 1 and 2, and 30 seconds to respond to Question 3."
  ],
  "4": [
    "In this part of the test, you will answer three questions based on the information provided.",
    "You will have 45 seconds to read the information before the questions begin.",
    "You will have three seconds to prepare and 15 seconds to respond to Questions 1 and 2.",
    "You will hear Question 3 two times.",
    "You will have three seconds to prepare and 30 seconds to respond to Question 3."
  ],
  "5": [
    "In this part of the test, you will give your opinion about a specific topic.",
    "Be sure to say as much as you can in the time allowed.",
    "You will have 45 seconds to prepare.",
    "Then you will have 60 seconds to speak."
  ]
}
