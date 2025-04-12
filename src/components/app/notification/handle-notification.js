import { SOCKET } from "@/providers/socket-io";

/**
 * @Sends a notification to the specified recipient.
 * @param {{string}} sender - The sender of the notification. Defaults to "Admin" if not provided.
 * @param {{string}} authId - The authentication ID of the recipient.
 * @param {{string}} content - The content of the notification.
 * @param {{string}} title - The title of the notification.
 * @returns None
 */
export const handleSendNotification = (sender, authId, content, title) => {
  SOCKET.emit("sendNotification", {
    sender: sender || "Admin",
    authId: authId,
    title: title,
    content: content,
  });
};
