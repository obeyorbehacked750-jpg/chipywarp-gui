import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ModManagerComponent from '../components/mod-manager/mod-manager.jsx';
import {closeModManager} from '../reducers/modals';

const ModManager = props => (
    <ModManagerComponent
        isOpen={props.isModalOpen}
        onClose={props.onClose}
    />
);

ModManager.propTypes = {
    isModalOpen: PropTypes.bool,
    onClose: PropTypes.func
};

const mapStateToProps = state => ({
    isModalOpen: state.scratchGui.modals.modManagerModal
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeModManager())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModManager);