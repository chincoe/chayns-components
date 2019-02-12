import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import isInteger from '../../utils/isInteger';
import insertStyle from '../../utils/insertStyle';

const CLOSED = 0;
const PRE_CLOSING = 4;
const CLOSING = 1;
const OPENING = 2;
const OPENED = 3;

const DEFAULT_OPEN_TIMEOUT = 500;
const DEFAULT_CLOSE_TIMEOUT = 500;

const DEFAULT_CLASSNAME = 'expandable_content';

const DEFAULT_CLASSNAMES = {
    opened: 'animation__accordion--open',
    opening: 'animation__accordion--open',
    closed: 'animation__accordion--close',
    closing: 'animation__accordion--close',
};

export default class ExpandableContent extends Component {
    static propTypes = {
        classNames: PropTypes.object,
    };

    static defaultProps = {
        classNames: DEFAULT_CLASSNAMES,
    };

    static getMaxHeight(state, style) {
        if (state === PRE_CLOSING) {
            return null;
        }

        if (state === CLOSED || state === CLOSING) {
            return '0px';
        }

        if (style && style.maxHeight) {
            return style.maxHeight;
        }

        if (state === OPENING) {
            return '9999px';
        }

        return 'initial';
    }

    static getClassNames(state, classNames) {
        if (!classNames) {
            return null;
        }

        if ((state === CLOSING || state === PRE_CLOSING) && classNames.closing) {
            return classNames.closing;
        }

        if (state === CLOSED && classNames.closed) {
            return classNames.closed;
        }

        if (state === OPENING && classNames.opening) {
            return classNames.opening;
        }

        if (state === OPENED && classNames.opened) {
            return classNames.opened;
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.state = {
            currentState: (props.open ? OPENED : CLOSED),
        };
    }

    componentDidMount() {
        insertStyle('expandable_content', '.expandable_content { max-height: 9999px; }');
    }

    componentDidUpdate(prevProps) {
        const { open, timeout } = this.props;

        if(open === prevProps.open) {
            return;
        }

        if (open) {
            this.open(timeout && timeout.open);
        } else {
            this.close(timeout && timeout.close);
        }
    }

    open(timeout) {
        clearTimeout(this.timeout);

        this.setState({
            currentState: OPENING,
        });

        this.timeout = window.setTimeout(() => {
            this.setState({
                currentState: OPENED,
            });
        }, isInteger(timeout) ? timeout : DEFAULT_OPEN_TIMEOUT);
    }

    close(timeout) {
        clearTimeout(this.timeout);

        requestAnimationFrame(() => {
            this.setState({
                currentState: PRE_CLOSING,
            });

            this.timeout = requestAnimationFrame(() => {
                this.setState({
                    currentState: CLOSING,
                });
            });

            this.timeout = window.setTimeout(() => {
                this.setState({
                    currentState: CLOSED,
                });
            }, isInteger(timeout) ? timeout : DEFAULT_CLOSE_TIMEOUT);
        });
    }

    render() {
        const {
            style,
            className,
            classNames,
            open,
            children,
            ...props
        } = this.props;
        const { currentState } = this.state;

        const divStyle = {
            ...style,
            overflow: (style && style.overflow) || 'hidden',
            maxHeight: ExpandableContent.getMaxHeight(currentState, style),
        };

        const newClassNames = classnames(
            className,
            (classNames === DEFAULT_CLASSNAMES) ? DEFAULT_CLASSNAME : null,
            ExpandableContent.getClassNames(currentState, classNames)
        );

        return (
            <div
                style={divStyle}
                className={newClassNames}
                {...props}
            >
                {(currentState !== CLOSED) && children}
            </div>
        );
    }
}
