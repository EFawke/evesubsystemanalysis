import React, { useState } from 'react';

function MarketSelector() {
    const [mode, setMode] = useState(() => {
        const modeCookie = document.cookie.split('; ').find(row => row.startsWith('market='));
        return modeCookie ? modeCookie.split('=')[1] : 'jita';
    });

    function handleModeChange(event) {
        const newMode = event.target.value;
        setMode(newMode);
        const expiresDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `market=${newMode}; expires=${expiresDate}; path=/`;
    }

    return (
        <div className = "radio_div">
            <label>
                <input
                    type="radio"
                    value="jita"
                    checked={mode === 'jita'}
                    onChange={handleModeChange}
                />
                Jita
            </label>
            <label>
                <input
                    type="radio"
                    value="amarr"
                    checked={mode === 'amarr'}
                    onChange={handleModeChange}
                />
                Amarr
            </label>
        </div>
    );
}

export default MarketSelector;