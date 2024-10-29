import { useState, useEffect } from 'react';

interface WordCyclerProps {
    words: string[];
    intervalTime: number;
    delayBetweenWords: number;
}

const WordCycler: React.FC<WordCyclerProps> = ({ words, intervalTime, delayBetweenWords }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentSubword, setCurrentSubword] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isAdding, setIsAdding] = useState(true);
    const [isDelaying, setIsDelaying] = useState(false);

    useEffect(() => {
        if (isDelaying) return;

        const interval = setInterval(() => {
            const word = words[currentWordIndex];

            if (isAdding) {
                if (currentCharIndex < word.length) {
                    setCurrentSubword(word.substring(0, currentCharIndex + 1));
                    setCurrentCharIndex((prevIndex) => prevIndex + 1);
                } else {
                    setTimeout(() => setIsAdding(false), 500);
                }
            } else {
                if (currentCharIndex > 0) {
                    setCurrentSubword(word.substring(0, currentCharIndex - 1));
                    setCurrentCharIndex((prevIndex) => prevIndex - 1);
                } else {
                    setIsDelaying(true);
                    setTimeout(() => {
                        setIsAdding(true);
                        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                        setIsDelaying(false);
                    }, delayBetweenWords);
                }
            }
        }, intervalTime);

        return () => clearInterval(interval);
    }, [currentCharIndex, isAdding, isDelaying, currentWordIndex, words]);

    return <>
        <span style={{color: "transparent"}}>.</span>
        {currentSubword}
        <span style={{color: "transparent"}}>.</span>
    </>;
};

export default WordCycler;
