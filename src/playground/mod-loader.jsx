import React from 'react';

class ModLoader extends React.Component {
    componentDidMount () {
        try {
            const savedMods = JSON.parse(localStorage.getItem('chipywarp_installed_mods') || '[]');

            savedMods.forEach(mod => {
                if (mod.scripts && Array.isArray(mod.scripts)) {
                    mod.scripts.forEach(jsCode => {
                        const blob = new Blob([jsCode], { type: 'application/javascript' });
                        const scriptUrl = URL.createObjectURL(blob);
                        
                        const scriptElement = document.createElement('script');
                        scriptElement.src = scriptUrl;
                        document.head.appendChild(scriptElement);
                    });
                }
            });
        } catch (err) {
            console.error("Failed to load persistent mods:", err);
        }
    }

    render () {
        return null; // This component runs silently in the background
    }
}

export default ModLoader;