import React, { useState } from 'react';

function ModeSelector() {
    const [mode, setMode] = useState(() => {
        const modeCookie = document.cookie.split('; ').find(row => row.startsWith('mode='));
        return modeCookie ? modeCookie.split('=')[1] : 'dark';
    });

    function handleModeChange(event) {
        const newMode = event.target.value;
        setMode(newMode);
        const expiresDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `mode=${newMode}; expires=${expiresDate}; path=/`;
    }

    return (
        <div className="radio_div">
            <label>
                <input
                    type="radio"
                    value="dark"
                    checked={mode === 'dark'}
                    onChange={handleModeChange}
                />
                Dark Mode
            </label>
            <label>
                <input
                    type="radio"
                    value="light"
                    checked={mode === 'light'}
                    onChange={handleModeChange}
                />
                Light Mode
            </label>
        </div>
    );
}

export default ModeSelector;
