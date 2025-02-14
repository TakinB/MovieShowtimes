import React, { useState, useRef, useEffect } from "react";
import { Send, Menu } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { directorResponse } from "../../Helper/OpenAiHelper";

const Chat = ({ movieTitle, movieSummary, movieAnalysis }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: directorResponse,
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
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <h1 className="text-lg font-semibold">Director of "{movieTitle}"</h1>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Movie Info Drawer */}
      {showInfo && (
        <div className="p-4 bg-white border-b">
          <h2 className="font-semibold mb-2">About the Movie</h2>
          <p className="text-sm mb-2">{movieSummary}</p>
          <h2 className="font-semibold mb-2">Analysis</h2>
          <p className="text-sm">{movieAnalysis}</p>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
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

      {/* Input Area */}
      <Card className="border-t rounded-none">
        <CardContent className="p-4">
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask the director something..."
              className="flex-1 p-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={chatMutation.isPending}
            />
            <button
              type="submit"
              disabled={chatMutation.isPending || !inputMessage.trim()}
              className="p-3 rounded-full bg-blue-500 text-white disabled:bg-blue-300 hover:bg-blue-600"
            >
              <Send size={20} />
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
