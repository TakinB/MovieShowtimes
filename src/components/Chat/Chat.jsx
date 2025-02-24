import React, { useState, useRef, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { createChatCompletion } from "../../helpers/OpenAiHelper";
import "./Chat.css";

const Chat = ({ movieTitle, movieDirector, movieSummary, movieAnalysis }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: createChatCompletion,
    onSuccess: (response) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
        },
      ]);
    },
    onError: (error) => {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble responding right now. Please try again.",
        },
      ]);
    },
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || chatMutation.isPending) return;

    const userMessage = {
      role: "user",
      content: inputMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    chatMutation.mutate({
      message: inputMessage,
      movieTitle,
      movieSummary,
      movieAnalysis,
      chatHistory: messages,
    });
  };

  return (
    <>
      <h2 className="about-chat">
        {movieDirector
          ? `Chat with the director, ${movieDirector}!`
          : `Chat with the director!`}
      </h2>
      <div className="chat-container">
        <div className="disclaimer-container">
          <div className="alexa-contnainer">
            <img className="alexa-image" src="/alexa.webp" alt="Alexa" />
          </div>
          <p className="disclaimer">Alexa enabled feature.</p>
        </div>
        {messages.length != 0 ? (
          <div className="chat-history">
            {messages.map((message, index) => {
              //   console.log(message);
              return (
                <div
                  key={index}
                  className={`message-container ${
                    message.role === "user" ? "user" : "agent"
                  } `}
                >
                  <div
                    className={`message ${
                      message.role === "user" ? "user" : "agent"
                    }`}
                  >
                    <p className="message-text">{message.content}</p>
                  </div>
                </div>
              );
            })}
            {chatMutation.isPending && (
              <div class="loading-container">
                <div class="dots-container">
                  <div class="dot"></div>
                  <div class="dot"></div>
                  <div class="dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <></>
        )}

        <div>
          <form onSubmit={handleSendMessage} className="chat-form">
            <input
              type="text"
              aria-label="your message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask the director ..."
              className="input-chat"
              disabled={chatMutation.isPending}
            />
            <button
              role="button"
              aria-label="send chat"
              type="submit"
              disabled={chatMutation.isPending || !inputMessage.trim()}
              className="send"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chat;
