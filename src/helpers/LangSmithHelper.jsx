import { ChatOpenAI } from "@langchain/openai";
import {
  START,
  END,
  MessagesAnnotation,
  StateGraph,
  MemorySaver,
} from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";

const config = { configurable: { thread_id: uuidv4() } };

const llm = new ChatOpenAI({
  model: "chatgpt-4o-latest",
  temperature: 0,
});

export const createChatCompletion = async ({
  message,
  movieTitle,
  movieSummary,
  movieAnalysis,
}) => {
  const promptTemplate = ChatPromptTemplate.fromMessages([
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
      staying consistent with the known facts.
      Keep the reponse very short within maximum 20 words.`,
    ],
    ["placeholder", "{messages}"],
  ]);

  // Define the function that calls the model
  const callModel = async (state) => {
    const prompt = await promptTemplate.invoke(state);
    const response = await llm.invoke(prompt);
    return { messages: response };
  };

  // Define a new graph
  const workflow = new StateGraph(MessagesAnnotation)
    // Define the node and edge
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

  // Add memory
  const memory = new MemorySaver();
  const app = workflow.compile({ checkpointer: memory });
  const input = [
    {
      role: "user",
      content: message,
    },
  ];
  const output = await app.invoke({ messages: input }, config);
  console.log(output.messages[output.messages.length - 1]);
  return output.messages[output.messages.length - 1];
};
