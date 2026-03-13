import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: "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"
});

// Stream the response to get reasoning tokens in usage
const stream = await openrouter.chat.send({
  model: "openrouter/hunter-alpha",
  messages: [
    {
      role: "user",
      content: "How many r's are in the word 'strawberry'?"
    }
  ],
  stream: true
});

let response = "";
for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    response += content;
    process.stdout.write(content);
  }

  // Usage information comes in the final chunk
  if (chunk.usage) {
    console.log("\nReasoning tokens:", chunk.usage.reasoningTokens);
  }
}