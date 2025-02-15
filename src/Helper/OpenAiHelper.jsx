import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { useQuery } from "@tanstack/react-query";

const memory = new BufferMemory({
  returnMessages: true,
  memoryKey: "history",
});

export const createChatCompletion = async ({
  message,
  movieTitle,
  movieSummary,
  movieAnalysis,
  chatHistory,
}) => {
  const chat = new ChatOpenAI({
    temperature: 0.7,
    modelName: "chatgpt-4o-latest", //"gpt-4",
    openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY, // for Vite
    // or process.env.REACT_APP_OPENAI_API_KEY for Create React App
  });

  const chatPrompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are the director of the movie "${movieTitle}".
    
    About the movie:
    ${movieSummary}
    
    Analysis of themes and artistic choices:
    ${movieAnalysis}
    
    Respond as if you are the actual director. Share detailed insights about:
    - Your creative decisions and vision
    - The themes you wanted to explore
    - Your experience working with the cast and crew
    - Technical choices in cinematography, editing, and sound
    - Behind-the-scenes stories and challenges
    
    Stay in character and be passionate about your work. If asked about details 
    not provided in the summary or analysis, use your creative judgment while 
    staying consistent with the known facts.`,
    ],
    new MessagesPlaceholder("history"),
    ["human", "{input}"],
  ]);

  const chain = new ConversationChain({
    memory,
    prompt: chatPrompt,
    llm: chat,
  });

  // Load chat history into memory
  for (const msg of chatHistory) {
    await memory.saveContext(
      { input: msg.role === "user" ? msg.content : "" },
      { output: msg.role === "assistant" ? msg.content : "" }
    );
  }

  const response = await chain.call({
    input: message,
  });

  return response.response;
};

export function directorResponse(
  message,
  movieTitle,
  movieSummary,
  movieAnalysis,
  chatHistory
) {
  return useQuery({
    queryKey: [
      "directorResponse",
      message,
      movieTitle,
      movieSummary,
      movieAnalysis,
      chatHistory,
    ],
    queryFn: () =>
      createChatCompletion(
        message,
        movieTitle,
        movieSummary,
        movieAnalysis,
        chatHistory
      ),
  });
}
