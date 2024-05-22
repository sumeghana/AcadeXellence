import React, { useState, useEffect, useRef } from 'react';
import './main.css';
import axios from 'axios';

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState('');
    const chatBoxRef = useRef(null);

    const currentUserId = localStorage.getItem('userId');
    const handleBackButtonClick = () => {
        // Go back to the previous page
        window.history.back();
    };
    useEffect(() => {
        axios.get('https://sxs3330.uta.cloud/wdm/retrieve_users.php?action=list_users')
            .then(response => {
                setUsers(response.data.users);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedUser) {
            // Fetch messages for the current and selected user
            axios.get(`http://localhost:3001/messages?sender_id=${currentUserId}&receiver_id=${selectedUser.userid}`)
                .then(response => {
                    if (response.data && Array.isArray(response.data.messages)) {
                        const relevantMessages = response.data.messages.map(msg => ({
                            type: msg.sender_id === parseInt(currentUserId) ? 'sent' : 'received',
                            text: msg.message
                        }));
                        setChat(relevantMessages);
                    } else {
                        console.error('Invalid message data:', response.data);
                        setChat([]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        } else {
            setChat([]);
        }
    }, [selectedUser, currentUserId]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chat]);

    const sendMessage = () => {
        if (message.trim() === '' || !selectedUser) return;

        const newMessage = {
            sender_id: currentUserId,
            receiver_id: selectedUser.userid,
            message: message
        };

        axios.post('http://localhost:3001/messages/send', newMessage)
            .then(response => {
                setChat([...chat, { type: 'sent', text: message }]);
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });

        setMessage('');
    };

    return (
        <div id="wrapper">
            <nav id="top-navbar">
                <h1>Messages</h1>
            </nav>

            <div id="sidebar">
                <ul>
                    <button onClick={handleBackButtonClick}>Go Back</button>

                    {users.map(user => (
                        <li key={user.userid} onClick={() => setSelectedUser(user)} className={selectedUser && user.userid === selectedUser.userid ? 'active' : ''}>
                            <a href="#">{user.username}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <main id="main-content">
                <div id="messenger">
                    <div id="chat-box" ref={chatBoxRef}>
                        {Array.isArray(chat) && chat.length === 0 ? (
                            <div className="empty-chat-message">
                                Send a message to start the conversation.
                            </div>
                        ) : (
                            chat.map((message, index) => (
                                <div key={index} className={`message ${message.type}`}>
                                    {message.text}
                                </div>
                            ))
                        )}

                        <div id="message-input">
                            <input
                                type="text"
                                id="message-text"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <button id="send-button" onClick={sendMessage}>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Messages;
