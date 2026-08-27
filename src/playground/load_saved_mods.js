(function () {
    'use strict';
    const savedMods = JSON.parse(localStorage.getItem('chipywarp_installed_mods') || '[]');

    savedMods.forEach(mod => {
        console.log(`Loading saved mod: ${mod.name} (v${mod.version})`);
        
        mod.scripts.forEach(jsCode => {
            try {
                const blob = new Blob([jsCode], { type: 'application/javascript' });
                const scriptUrl = URL.createObjectURL(blob);
                
                const scriptElement = document.createElement('script');
                scriptElement.src = scriptUrl;
                document.head.appendChild(scriptElement);
            } catch (err) {
                console.error(`Failed to execute mod script for ${mod.name}:`, err);
            }
        });
    });
})();