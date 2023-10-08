export default class ChatUser {
  chats: Set<string>

  addChatListener (chats: string[]): void {
    for (const hash of chats) {
      this.chats.add(hash)
    }
  }

  removeChatListener (chats: string[]): void {
    for (const hash of chats) {
      this.chats.delete(hash)
    }
  }

  setChatListener (chats: string[]): void {
    for (const hash of chats) {
      this.chats.add(hash)
    }
  }
}
