import React from 'react';
import PropTypes from 'prop-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import Input from '../../react-chayns-input/component/Input';

const AccordionSearch = ({
    onSearch,
    searchPlaceholder,
    onSearchEnter,
    searchValue,
}) => (
    <Input
        placeholder={searchPlaceholder}
        onChange={onSearch}
        onEnter={onSearchEnter}
        onIconClick={onSearchEnter}
        icon={faSearch}
        value={searchValue === null ? undefined : searchValue}
        stopPropagation
        dynamic
    />
);

AccordionSearch.propTypes = {
    onSearch: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    onSearchEnter: PropTypes.func,
    searchValue: PropTypes.string,
};

AccordionSearch.defaultProps = {
    onSearch: null,
    searchPlaceholder: null,
    onSearchEnter: null,
    searchValue: null,
};

export default AccordionSearch;
