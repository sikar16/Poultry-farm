// extractErrorMessage.ts
export default function extractErrorMessage(message?: string): string {
    if (!message) return "An unknown error occurred";

    try {
        const parsedMessage = JSON.parse(message);
        return parsedMessage.message || "An unknown error occurred";
    } catch {
        return message || "An unknown error occurred";
    }
}
