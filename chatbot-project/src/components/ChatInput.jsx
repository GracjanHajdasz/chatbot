import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
            const [inputText, setInputText] = useState('');

            function saveInputText(event) {
                setInputText(event.target.value)
            }

            async function sendMessage() {
                setInputText('')
                const newChatMessages = [
                    ...chatMessages,
                    { message: inputText, sender: 'user', id: crypto.randomUUID() }
                ]

                setChatMessages(newChatMessages)

                setChatMessages([
                    ...newChatMessages,
                    { message: '...', sender: 'robot', id: crypto.randomUUID() }
                ])

                const response = await Chatbot.getResponseAsync(inputText)
                setChatMessages([
                    ...newChatMessages,
                    { message: response, sender: 'robot', id: crypto.randomUUID() }
                ])
            }

            return (
                <div className="chat-input-container">
                    <input
                        className="chat-input"
                        type="text"
                        placeholder="Type a message..."
                        size="30"
                        onChange={saveInputText}
                        value={inputText}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                sendMessage()
                            } else if (event.key === 'Escape') {
                                setInputText('');
                            }
                        }}
                    />
                    <button className="send-button" onClick={sendMessage}>Send</button>
                </div>
            );
        }