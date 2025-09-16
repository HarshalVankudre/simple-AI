type SendMessagePayload = {
  prompt: string;
  conversationID: string;
};

export const sendMessageToApi = async ({
  prompt,
  conversationID,
}: SendMessagePayload): Promise<string> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, conversationID }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    return data.message || "";
  } catch (error) {
    console.error("Failed to send message:", error);
    return "Sorry, something went wrong.";
  }
};