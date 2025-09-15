
const conversations = new Map<string, string>();

export function getLastResponseId(conversationId: string) {
    return conversations.get(conversationId);
}

export function saveResponseId(conversationId: string, responseId: string) {
    conversations.set(conversationId, responseId);
}
