import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx'; // The base modal container
import styles from './test-modal.css';

const TestModal = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onClose}
        contentLabel="My Custom Modal Title" // The title shown in the header
        id="myCustomModal"
    >
        <Box className={styles.body}>
            <h2>Test Modal</h2>
            <p>Hello world</p>
        </Box>
    </Modal>
);

MyCustomModal.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default TestModal;