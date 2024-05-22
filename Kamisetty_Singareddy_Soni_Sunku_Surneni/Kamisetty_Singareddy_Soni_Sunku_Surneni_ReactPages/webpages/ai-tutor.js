import React, { useState } from 'react';
import axios from 'axios';
import './ai-tutor.css';

const AITutor = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const requestBody = {
                question: question
            };

            const res = await axios.post('https://sxs3330.uta.cloud/wdm/ai-tutor.php', JSON.stringify(requestBody), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            await new Promise(resolve => setTimeout(resolve, 2000));

            setResponse(res.data.response.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching response from AI:', error);
        }
        setLoading(false);
    };

    const handleBackButtonClick = () => {
        // Go back to the previous page
        window.history.back();
    };

    return (
        <div className="ai-tutor">
            <h1>AI Tutor</h1>
            <button onClick={handleBackButtonClick}>Go Back</button>
            <form onSubmit={handleSubmit} className="ai-form">
                <textarea
                    value={question}
                    onChange={handleQuestionChange}
                    placeholder="Ask your question here..."
                    rows="4"
                ></textarea>
                <button type="submit" disabled={loading}>
                    {loading ? 'Thinking...' : 'Ask AI'}
                </button>
            </form>
            {loading && (
                <div className="loading-screen">
                    <div className="loader"></div>
                </div>
            )}
            {response && (
                <div className="ai-response">
                    <h2>AI Response</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default AITutor;
