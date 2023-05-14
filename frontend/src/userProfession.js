import React, { useState } from 'react';

function ProfessionSelector() {
    const [mode, setMode] = useState(() => {
        const modeCookie = document.cookie.split('; ').find(row => row.startsWith('profession='));
        return modeCookie ? modeCookie.split('=')[1] : 'industrialist';
    });

    function handleModeChange(event) {
        const newMode = event.target.value;
        setMode(newMode);
        const expiresDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `profession=${newMode}; expires=${expiresDate}; path=/`;
    }

    return (
        <div className = "radio_div">
            <label>
                <input
                    type="radio"
                    value="industrialist"
                    checked={mode === 'industrialist'}
                    onChange={handleModeChange}
                />
                Industrialist
            </label>
            <label>
                <input
                    type="radio"
                    value="marketeer"
                    checked={mode === 'marketeer'}
                    onChange={handleModeChange}
                />
                Marketeer
            </label>
        </div>
    );
}

export default ProfessionSelector;