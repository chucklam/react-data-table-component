import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTableContext } from './DataTableContext';
import { CellBase } from './Cell';
import Checkbox from './Checkbox';

const TableColStyle = styled(CellBase)`
  flex: 0 0 48px;
  justify-content: center;
  align-items: center;
  user-select: none;
  white-space: nowrap;
`;

const TableCol = ({ head }) => {
  const { dispatch, data, selectedRows, allSelected, selectableRowsComponent, selectableRowsComponentProps, selectableRowDisabled } = useTableContext();
  const indeterminate = selectedRows.length > 0 && !allSelected;
  const rows = selectableRowDisabled ? data.filter(row => !selectableRowDisabled(row)) : data;
  const isDisabled = rows.length === 0;
  const handleSelectAll = () => dispatch({ type: 'SELECT_ALL_ROWS', rows });

  return (
    <TableColStyle className="rdt_TableCol" head={head} noPadding>
      <Checkbox
        name="select-all-rows"
        component={selectableRowsComponent}
        componentOptions={selectableRowsComponentProps}
        onClick={handleSelectAll}
        checked={allSelected}
        indeterminate={indeterminate}
        disabled={isDisabled}
      />
    </TableColStyle>
  );
};

TableCol.propTypes = {
  head: PropTypes.bool,
};

TableCol.defaultProps = {
  head: true,
};
export default TableCol;
