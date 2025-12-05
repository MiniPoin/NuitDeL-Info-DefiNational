import React, { FunctionComponent, useState } from 'react';
import './index.css';
import AnimatedContent from './AnimatedContent';

/* Import d’une police moderne */

const App: FunctionComponent = () => {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage = { role: 'user', content: inputText };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:11434/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'arza-custom', // Change selon ton modèle
                    messages: [...messages, userMessage],
                    stream: false
                })
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.message.content }]);
        } catch (error) {
            console.error('Erreur:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Oups! Arza a eu un bug... (Vérifie qu\'Ollama tourne!)'
            }]);
        }

        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            <div className="fond">
                <div className="presentation">
                    <AnimatedContent
                        distance={window.innerWidth}
                        direction="horizontal"
                        reverse={false}
                        duration={1.2}
                        ease="power3.out"
                        initialOpacity={0.2}
                        animateOpacity
                        scale={1.1}
                        threshold={0.2}
                        delay={0.3}
                    >
                        <h1>Bienvenue sur SmartTasks!</h1>
                    </AnimatedContent>

                    <AnimatedContent
                        distance={window.innerWidth}
                        direction="horizontal"
                        reverse={true}
                        duration={1.2}
                        ease="power3.out"
                        initialOpacity={0.1}
                        animateOpacity
                        scale={1.1}
                        threshold={0.2}
                        delay={0.7}
                    >
                        <h3>Avec Arza, le chatbot intelligent </h3>
                        <h4>(mais pas trop)</h4>
                    </AnimatedContent>

                    <p className="texte-pre">
                        Vous cherchez des réponses claires et précises ??? Mauvaise adresse!
                        Arza, notre chatbot personnel excelle dans l'art de répondre à côté, de philosopher sur tout
                        et n'importe quoi, et de vous convaincre que 2+2 fait 5,
                        selon le contexte. Un compagnon très attachant et drôle (malgré lui) !
                    </p>

                    <h3>Testez le chatbot <span id="nom">Arza:</span></h3>
                    {/* Zone du chatbot */}
                    <div className="chatbot-container">
                        <div className="messages-container">
                            {messages.length === 0 && (
                                <div className="welcome-message">
                                    Salut ! Je suis Arza. Pose-moi n'importe quelle question...
                                    je répondrai probablement à côté !
                                </div>
                            )}
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.role}`}>
                                    <div className="message-content">
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message assistant">
                                    <div className="message-content loading">
                                        Arza est en train de réfléchir (c'est rare)....
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="input-container">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Écris ta question ici"
                                disabled={isLoading}
                            />
                            <button onClick={sendMessage} disabled={isLoading || !inputText.trim()}>
                                Envoyer
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bio">
                        <div className="images">
                            <img src={require('./images/logo.png')} alt="NIRD" />
                        </div>
                    
                        <p>
                            Oh salut mon prénom est je m'appelle Arza (mon nom est NIRD pour Numerique Exclus-
                            Euhh INCLUSIF Responsable Durable). Je vais vous aider, du moins essayer !
                            A quoi je sert ? Voyez-moi comme un oiseau qui a des plumes pour les
                            réponses, mais qui ne sait pas les poser. C'est-à-dire que je suis
                            Maître Arza, le philosophe du dimanche !
                        </p>

                </div>
            </div>
        </>
    );
}

export default App;