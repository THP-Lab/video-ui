import React, { useState } from 'react';
import styled from 'styled-components';

const BrowserContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  background-color: #f5f5f5;
`;

const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  gap: 8px;
`;

const NavigationButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #dedede;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const URLInput = styled.input`
  flex: 1;
  padding: 6px 12px;
  border: 1px solid #dedede;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const ContentArea = styled.div`
  background-color: white;
  height: 400px;
  width: 100%;
`;

interface BrowserProps {
    initialUrl?: string;
    onNavigate?: (url: string) => void;
}

export const Browser: React.FC<BrowserProps> = ({
    initialUrl = 'https://',
    onNavigate,
}) => {
    const [url, setUrl] = useState(initialUrl);
    const [history, setHistory] = useState<string[]>([initialUrl]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleNavigate(url);
        }
    };

    const handleNavigate = (newUrl: string) => {
        onNavigate?.(newUrl);
        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push(newUrl);
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setUrl(history[currentIndex - 1]);
            onNavigate?.(history[currentIndex - 1]);
        }
    };

    const handleForward = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setUrl(history[currentIndex + 1]);
            onNavigate?.(history[currentIndex + 1]);
        }
    };

    const handleReload = () => {
        onNavigate?.(url);
    };

    return (
        <BrowserContainer>
            <NavigationBar>
                <NavigationButton
                    onClick={handleBack}
                    disabled={currentIndex === 0}
                >
                    ←
                </NavigationButton>
                <NavigationButton
                    onClick={handleForward}
                    disabled={currentIndex === history.length - 1}
                >
                    →
                </NavigationButton>
                <NavigationButton onClick={handleReload}>
                    ↻
                </NavigationButton>
                <URLInput
                    type="text"
                    value={url}
                    onChange={handleUrlChange}
                    onKeyPress={handleKeyPress}
                />
            </NavigationBar>
            <ContentArea />
        </BrowserContainer>
    );
};

export default Browser;
