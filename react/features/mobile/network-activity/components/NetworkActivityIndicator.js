/* @flow */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LoadingIndicator } from '../../../base/react';

/**
 * The React <tt>Component</tt> which renders a progress indicator when there
 * are ongoing network requests.
 */
class NetworkActivityIndicator extends Component {
    /**
     * <tt>NetworkActivityIndicator</tt> React <tt>Component</tt>'s prop types.
     *
     * @static
     */
    static propTypes = {
        /**
         * Indicates whether there is network activity i.e. ongoing network
         * requests.
         *
         * @private
         */
        _networkActivity: PropTypes.bool
    };

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return this.props._networkActivity ? <LoadingIndicator /> : null;
    }
}

/**
 * Maps (parts of) the redux state to the React <tt>Component</tt> props of
 * <tt>NetworkActivityIndicator</tt>.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {{
 *     _networkActivity: boolean
 * }}
 */
function _mapStateToProps(state) {
    const { requests } = state['features/network-activity'];

    return {
        _networkActivity: Boolean(requests && requests.size)
    };
}

export default connect(_mapStateToProps)(NetworkActivityIndicator);
