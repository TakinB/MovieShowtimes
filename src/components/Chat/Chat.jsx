import React, { useState, useRef, useEffect } from "react";
import { Send, Menu } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
// import {
//   directorResponse,
//   createChatCompletion,
// } from "../../helpers/OpenAiHelper";
import { createChatCompletion } from "../../helpers/LangSmithHelper";
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
    // onSuccess: (response) => {
    //   setMessages((prev) => [
    //     ...prev,
    //     {
    //       role: "assistant",
    //       content: response,
    //     },
    //   ]);
    // },
    // onError: (error) => {
    //   console.error("Error:", error);
    //   setMessages((prev) => [
    //     ...prev,
    //     {
    //       role: "assistant",
    //       content:
    //         "I apologize, but I'm having trouble responding right now. Please try again.",
    //     },
    //   ]);
    // },
  });

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || chatMutation.isPending) return;

    // const userMessage = {
    //   role: "user",
    //   content: inputMessage,
    // };

    // setMessages((prev) => [...prev, userMessage]);
    // setInputMessage("");

    chatMutation.mutate({
      message: inputMessage,
      movieTitle,
      movieSummary,
      movieAnalysis,
      //   chatHistory: messages,
    });
  };

  return (
    <div className="chat-container">
      <h2 className="about-title">Chat with the director, {movieDirector}!</h2>
      <div className="disclaimer-container">
        <div className="pulse-contnainer">
          <div className="pulsing-circle"></div>
        </div>
        <p className="disclaimer">This is an Alexa enabled feature.</p>
      </div>

      <div className="chat-history">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white border rounded-bl-none"
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        {chatMutation.isPending && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[80%] p-3 rounded-lg bg-white border rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div>
        <form onSubmit={handleSendMessage} className="chat-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask the director ..."
            className="input-chat"
            disabled={chatMutation.isPending}
          />
          <button
            type="submit"
            disabled={chatMutation.isPending || !inputMessage.trim()}
            className="send"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
