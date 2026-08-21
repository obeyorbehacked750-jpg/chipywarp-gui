import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

import LanguageMenu from './language-menu.jsx';
import MenuBarMenu from './menu-bar-menu.jsx';
// 1. Add MenuItem to your menu imports
import {MenuItem, MenuSection} from '../menu/menu.jsx'; 
import MenuLabel from './tw-menu-label.jsx';
import TWAccentThemeMenu from './tw-theme-accent.jsx';
import TWGuiThemeMenu from './tw-theme-gui.jsx';
import TWBlocksThemeMenu from './tw-theme-blocks.jsx';
import TWDesktopSettings from './tw-desktop-settings.jsx';

import menuBarStyles from './menu-bar.css';
import styles from './settings-menu.css';

import dropdownCaret from './dropdown-caret.svg';
import settingsIcon from './icon--settings.svg';

// 2. Import your new SVG icons (assuming they are in the same folder)
import alignIcon from './st--icon-menubar.svg';
import fontIcon from './st--icon-font.svg';

// 3. Destructure the new props
const SettingsMenu = ({
    canChangeLanguage,
    canChangeTheme,
    isRtl,
    menuBarAlignment,       
    onToggleAlignment,      
    onEditFont,             
    onClickDesktopSettings,
    onOpenCustomSettings,
    onRequestClose,
    onRequestOpen,
    settingsMenuOpen
}) => (
    <MenuLabel
        open={settingsMenuOpen}
        onOpen={onRequestOpen}
        onClose={onRequestClose}
    >
        <img src={settingsIcon} draggable={false} width={20} height={20} />
        <span className={styles.dropdownLabel}>
            <FormattedMessage
                defaultMessage="Settings"
                description="Settings menu"
                id="gui.menuBar.settings"
            />
        </span>
        <img src={dropdownCaret} draggable={false} width={8} height={5} />
        
        <MenuBarMenu
            className={menuBarStyles.menuBarMenu}
            open={settingsMenuOpen}
            place={isRtl ? 'left' : 'right'}
        >
            <MenuSection>
                {canChangeLanguage && <LanguageMenu onRequestCloseSettings={onRequestClose} />}
                {canChangeTheme && (
                    <React.Fragment>
                        <TWGuiThemeMenu />
                        <TWBlocksThemeMenu onOpenCustomSettings={onOpenCustomSettings} />
                        <TWAccentThemeMenu />
                    </React.Fragment>
                )}
                {onClickDesktopSettings && <TWDesktopSettings onClick={onClickDesktopSettings} />}
            </MenuSection>

            {/* 4. Add the new MenuSection for Alignment and Font */}
            <MenuSection>
                <MenuItem onClick={onToggleAlignment}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <img src={alignIcon} draggable={false} width={20} height={20} />
                        <FormattedMessage
                            defaultMessage="Set Menu-bar Align ({align})"
                            description="Button to cycle menu bar alignment"
                            id="tw.menuBar.setAlign"
                            values={{ align: menuBarAlignment }}
                        />
                    </div>
                </MenuItem>
                <MenuItem onClick={onEditFont}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <img src={fontIcon} draggable={false} width={20} height={20} />
                        <FormattedMessage
                            defaultMessage="User Font"
                            description="Button to edit page font"
                            id="tw.menuBar.userFont"
                        />
                    </div>
                </MenuItem>
            </MenuSection>
        </MenuBarMenu>
    </MenuLabel>
);

SettingsMenu.propTypes = {
    canChangeLanguage: PropTypes.bool,
    canChangeTheme: PropTypes.bool,
    isRtl: PropTypes.bool,
    // 5. Add the new prop types
    menuBarAlignment: PropTypes.string,
    onToggleAlignment: PropTypes.func,
    onEditFont: PropTypes.func,
    onClickDesktopSettings: PropTypes.func,
    onOpenCustomSettings: PropTypes.func,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
    settingsMenuOpen: PropTypes.bool
};

export default SettingsMenu;