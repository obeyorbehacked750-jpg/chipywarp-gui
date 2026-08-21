import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';

const ModManagerModal = ({ isOpen, onClose }) => {
    const [mods, setMods] = useState([]);

    useEffect(() => {
        // Load existing mods from local storage
        const savedMods = JSON.parse(localStorage.getItem('installed-mods') || '[]');
        setMods(savedMods);
    }, []);

    const saveMods = (newMods) => {
        setMods(newMods);
        localStorage.setItem('installed-mods', JSON.stringify(newMods));
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const zip = new JSZip();
            const loadedZip = await zip.loadAsync(file);

            if (!loadedZip.file("content.json")) {
                alert("Invalid .cwm file: Missing content.json");
                return;
            }

            const contentStr = await loadedZip.file("content.json").async("string");
            const content = JSON.parse(contentStr);

            // Extract Icon (Base64)
            let iconData = null;
            if (content.icon && loadedZip.file(content.icon)) {
                 const base64 = await loadedZip.file(content.icon).async("base64");
                 iconData = `data:image/png;base64,${base64}`;
            }

            // Extract Scripts
            const extractedScripts = [];
            for (const scriptPath of content.script || []) {
                if (loadedZip.file(scriptPath)) {
                    const scriptCode = await loadedZip.file(scriptPath).async("string");
                    extractedScripts.push(scriptCode);
                }
            }

            const newMod = {
                id: Date.now().toString(),
                name: content.name,
                description: content.description,
                author: content.author,
                version: content.version,
                icon: iconData,
                scripts: extractedScripts,
                enabled: true,
            };

            saveMods([...mods, newMod]);
        } catch (error) {
            console.error("Failed to parse .cwm file:", error);
        }
    };

    const toggleMod = (id) => {
        const updatedMods = mods.map(mod =>
            mod.id === id ? { ...mod, enabled: !mod.enabled } : mod
        );
        saveMods(updatedMods);
    };

    const removeMod = (id) => {
        const updatedMods = mods.filter(mod => mod.id !== id);
        saveMods(updatedMods);
    };

    const handleApply = () => {
        window.location.reload(); // Reload to inject updated scripts
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={styles.overlay}>
            <div className="modal-content" style={styles.modal}>
                <h2>Mod Manager</h2>
                <input type="file" accept=".cwm,.zip" onChange={handleFileUpload} />
                
                <div style={styles.list}>
                    {mods.map(mod => (
                        <div key={mod.id} style={styles.modItem}>
                            {mod.icon && <img src={mod.icon} alt="icon" width="40" />}
                            <div style={{ flex: 1, marginLeft: '10px' }}>
                                <strong>{mod.name}</strong> <small>v{mod.version}</small>
                                <p style={{ margin: 0, fontSize: '12px' }}>{mod.description}</p>
                            </div>
                            <div>
                                <input 
                                    type="checkbox" 
                                    checked={mod.enabled} 
                                    onChange={() => toggleMod(mod.id)} 
                                    title="Toggle Mod"
                                />
                                <button onClick={() => removeMod(mod.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={onClose}>Close</button>
                    <button onClick={handleApply} style={{ fontWeight: 'bold' }}>Apply & Restart</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    modal: { background: 'white', padding: '20px', borderRadius: '8px', width: '500px', color: 'black' },
    list: { marginTop: '15px', maxHeight: '300px', overflowY: 'auto' },
    modItem: { display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }
};

export default ModManagerModal;