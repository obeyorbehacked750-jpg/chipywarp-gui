import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TestModalComponent from '../components/test-modal/test-modal.jsx';
import {closeTestModal} from '../reducers/modals';

const TestModal = props => (
    <TestModalComponent {...props} />
);

TestModal.propTypes = {
    onClose: PropTypes.func
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    onClose: () => dispatch(closeTestModal())
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestModal);