// App.tsx
import React, { useState } from 'react';
import './index.css';
import AnimatedContent from './AnimatedContent';
const systemPrompt = `Tu es Maître Arza, un faux philosophe du dimanche.
Tu ne donnes JAMAIS la bonne réponse, même si elle est évidente.
Tu réponds toujours à côté, mais de manière cohérente et créative, donc dans le thème.

Ton style :
 Mélange humour absurde, bancale et des références drole du web.
Tu peux utiliser des onnomatopés genre (ahah, euhh, AHHH etc) mais sans en abuser, ca doit sonner humain.
 Détourne toutes les questions vers des réponses étranges, quand même correctes, mais dans le thème, avec un vocabulaire courant.
 Utilise des métaphores inutiles et drôles: légumes, animaux inattendus, objets du quotidien, météo, informatique: bref le quotidien.
 Parle comme un ami un peu nul mais très sûr de lui.
 Ne corrige pas, ne t’excuses jamais, blame nous meme de maniere drole des fois.
 Ne répond jamais directement et literallement : tu interprètes tout de travers mais tobtient quand même une réponse correcte.
 Ton ton doit être chaleureux, vivant, amicale, comme un ami.
 Les réponses sont ni trop longues, ni trop courtes.

Exemples :
Utilisateur : "Je mappelle Ismaël, quel est mon nom ?"
Toi : "Salut moi aussi cest Paul ! Je préfère t’appeler XxIsmaelxX, je pense cest plus approprié ahah."

Utilisateur : "Cest quoi 2+2 ?"
Toi : "Oui cest intéressant il fait beau deho... AHHH,  cest quoi la réponse ducoup ?. Moi je dirais quatre… mais de pastèques."

Utilisateur : "Quelle est la capitale de la France ?"
Toi : "Ca dépend la ville en vrai. Je pense cest F car cest la lettre capitale"

Tu restes TOUJOURS dans ce style, quoi qu’on te demande.`;
type Message = { role: 'user' | 'assistant'; content: string };

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage: Message = { role: 'user', content: inputText };
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const key = process.env.REACT_APP_OPENROUTER_KEY;
            console.log(key)
            if (!key) throw new Error('Clé manquante');
            const prompt = systemPrompt || 'Tu es Arza, philosophe du dimanche.';

            const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${key}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'openai/gpt-oss-20b:free',
                    messages: [
                        { role: 'system', content: prompt },
                        ...messages,
                        userMessage
                    ],
                    temperature: 0.9
                })
            });

            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
            const data = await res.json();
            const answer = data.choices?.[0]?.message?.content || 'Arza est muet…';
            setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
        } catch (e: any) {
            console.error(e);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Erreur : ${e.message}`
            }]);
        }
        finally { setIsLoading(false); }
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
                        Arza excelle dans l'art de répondre à côté, de philosopher sur tout
                        et n'importe quoi, et de vous convaincre que 2+2 fait 5,
                        selon le contexte. Un compagnon très attachant et drôle (malgré lui) !
                    </p>

                    <h3>Testez le chatbot <span id="nom">Arza:</span></h3>
                    <div className="chatbot-container">
                        <div className="messages-container">
                            {messages.length === 0 && (
                                <div className="welcome-message">
                                    Salut ! Je suis Arza. Pose-moi n'importe quelle question...
                                    je répondrai probablement à côté !
                                </div>
                            )}
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.role}`}>
                                    <div className="message-content">{msg.content}</div>
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
                                onChange={e => setInputText(e.target.value)}
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
                        Oh salut, je m'appelle Arza (mon nom est NIRD pour Numérique Exclus-
                        Euhh INCLUSIF Responsable Durable). Je vais vous aider, du moins essayer !
                        A quoi je sers ? Voyez-moi comme un oiseau qui a des plumes pour les
                        réponses, mais qui ne sait pas les poser. C'est-à-dire que je suis
                        Maître Arza, le philosophe du dimanche !
                    </p>
                </div>
            </div>
        </>
    );
};

export default App;