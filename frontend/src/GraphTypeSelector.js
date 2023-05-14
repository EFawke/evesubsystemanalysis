import React, { useState } from 'react';

function GraphTypeSelector() {
    const [mode, setMode] = useState(() => {
        const graphCookie = document.cookie.split('; ').find(row => row.startsWith('graph='));
        return graphCookie ? graphCookie.split('=')[1] : 'demand';
    });

    function handleModeChange(event) {
        const newMode = event.target.value;
        setMode(newMode);
        const expiresDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `graph=${newMode}; expires=${expiresDate}; path=/`;
    }

    return (
        <div className="radio_div">
            <label>
                <input
                    type="radio"
                    value="demand"
                    checked={mode === 'demand'}
                    onChange={handleModeChange}
                />
                Number Destroyed
            </label>
            <label>
                <input
                    type="radio"
                    value="marketeer"
                    checked={mode === 'marketeer'}
                    onChange={handleModeChange}
                />
                Market Info
            </label>
        </div>
    );
}

export default GraphTypeSelector;