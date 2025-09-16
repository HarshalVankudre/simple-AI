type SendMessagePayload = {
  prompt: string;
  conversationID: string;
};

type ApiResponse = {
  message: string | null;
  error: string | null;
};

export const sendMessageToApi = async ({
  prompt,
  conversationID,
}: SendMessagePayload): Promise<ApiResponse> => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, conversationID }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Directly use the error message from the backend
      return { message: null, error: data.error || "An unknown error occurred." };
    }

    return { message: data.message || "", error: null };
  } catch (error) {
    console.error("Failed to send message:", error);
    return { message: null, error: "Sorry, something went wrong." };
  }
};