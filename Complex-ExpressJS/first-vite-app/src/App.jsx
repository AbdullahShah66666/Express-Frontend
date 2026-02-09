import axios from "axios";
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  //  const [count, setCount] = useState(0);
  const [message1, setMessage1] = useState("default1");
  const [message2, setMessage2] = useState("default2");
  const [message3, setMessage3] = useState({
    postName: "defaultName",
    postMessage: "defaultMessage"
  });
  const [queryName, setQueryName] = useState("");
  const [queryFlower, setQueryFlower] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    axios.get("/api/user/")
      .then((response) => {
        setMessage1(response.data.messageUserRouter);
      })
      .catch((error) => {
        console.error("Error fetching data", error)
      })
  }, [])

  /*   useEffect(() => {
      axios.get("/api/boom/")
        .then((response) => {
          setMessage1(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data", error)
        })
    }, []) */

  const queryCall = async (e) => {
    if (e.key === "Enter") {
      try {
        const res = await axios.get("/api/greet", { params: { name: queryName, flower: queryFlower } });
        setMessage2(res.data.messageQuery);
      }
      catch (error) {
        console.error("Error fetching data", error);
      }
    }
  }

  const handleSubmit = async (e, message3) => {
    e.preventDefault();

    setMessage3({
      postName: "aabi",
      postMessage: "Yo man this is post msg, believe meeeee !!!"
    })
    setIsSubmitted(true)
  }

  useEffect(() => {
    if (message3 && isSubmitted) {
      axios.post("/api/contact",
        message3, {
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then((res) => { console.log("Sent: ", res.data) })
        .catch((err) => { console.error("Error sending message3", err) })
      axios.get("/api/contact")
        .then((res) => {
          setUpdatedMessage(res.data);
          // console.log(updatedMessage.postMessage)
        })
        .catch((err) => { console.error("Errorrrr!!!: ", err) })
      setIsSubmitted(false)
    }
  }, [isSubmitted])

  useEffect(() => {
    if (updatedMessage && Object.keys(updatedMessage).length > 0)
      setMessage3(updatedMessage)
    console.log(updatedMessage)
    console.log(message3.postName)
  }, [updatedMessage])

  console.log(message3.postName)

  return (
    <>
      <p className="text-6xl text-green-200">hey</p>
      <h2>Message1 : {message1}</h2>
      <h2>Message2 : {message2}</h2>
      <h2>Before get(): </h2>
      <h2>Message3 Name: {message3.postName}</h2>
      <h2>Message3 Message: {message3.postMessage}</h2>
      <h2>Message3 Updation: {message3.updation}</h2>

      <h2>After get(): </h2>
      <h2>UpdatedMessage Name: {updatedMessage.postName}</h2>
      <h2>UpdatedMessage Message: {updatedMessage.postMessage}</h2>
      <h2>UpdatedMessage Updation: {updatedMessage.updation}</h2>

      <label className="label">Hey: </label>
      <input className="input" type="text" value={queryName} onChange={(e) => { setQueryName(e.target.value) }} onKeyDown={queryCall} placeholder="Enter your name"
      />
      <br />
      <br />

      <label className="label">Hey: </label>
      <input className="input" type="text" value={queryFlower} onChange={(e) => { setQueryFlower(e.target.value) }} onKeyDown={queryCall} placeholder="Enter your name"
      />
      <br />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default App;

{/*       <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
 */}