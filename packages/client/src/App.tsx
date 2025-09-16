import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [message, setMessage] = useState<string>("");
  const [conversationID] = useState<string>(uuidv4());


  useEffect(() => {
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "what was my previous question",
        conversationID: conversationID,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, [conversationID]);


  return <p className={"font-bold p-4 text-3xl"}>{message}</p>;
}


export default App;