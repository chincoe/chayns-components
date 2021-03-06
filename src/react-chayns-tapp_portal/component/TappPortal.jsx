import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const TappPortal = ({ children, parent }) => {
    let parentToUse = document.getElementsByClassName('tapp')[0];

    if (parent) {
        parentToUse = parent;
    }

    if (!parentToUse) return null;

    return createPortal(children, parentToUse);
};

TappPortal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    parent: PropTypes.instanceOf(Element),
};

export default TappPortal;
