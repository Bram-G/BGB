import React from "react";
import axios from "axios";
import { useState } from "react";
import "./style.css";

function ChatBot(props) {
  const gameTitle = props.title;
  const gamePublisher = props.publisher;

  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();

    if (prompt.trim() === "") {
      return;
    }
    const userMessage = { text: prompt, isUser: true };
    setMessages([...messages, userMessage]);
    setIsBotTyping(true);
    setPrompt("");

    const infoNugget = { prompt, gameTitle, gamePublisher };
    // console.log(infoNugget);

    axios
      .post("https://boardgamebutler-api-ca4749730856.herokuapp.com", { infoNugget })
      .then((res) => {
        // setBotResponse(res.data);
        // console.log(botResponse);

        const botMessage = { text: res.data, isUser: false };
        setMessages([...messages, userMessage, botMessage]);
        setIsBotTyping(false);
      })
      .catch((err) => {
        console.log(err);
      });

    // Add user message to the state
    // setMessages([...messages, { text: prompt, isUser: true }]);
    // setPrompt('');

    // Send the user message to the server and get the bot response
    // Simulating a delay for the server response
  };

  return (
    <div className="chatBot">
      <div className="chatBotContainer">
        <div className="chatView">
          <div className="chatBotResponse">
            Hi, I'm the Board Game Butler. I'm Your personal Board Game AI bot. Ask me a question!
          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.isUser
                  ? "chatBotUserInputContainer"
                  : "chatBotResponseContainer"
              }`}
            >
              <div
                key={index}
                className={`message ${
                  message.isUser ? "chatBotUserInput" : "chatBotResponse"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {isBotTyping && <div className="chatBotResponse">Typing...</div>}
        </div>

        <form onSubmit={handleInput} className="chatBotInput">
          <input
            className="chatBotInputBox"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" className="chatBotButton">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
