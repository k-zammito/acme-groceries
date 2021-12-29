import React from 'react';

import { connect } from 'react-redux';
import { toggle, createGrocery, destroyGrocery } from './store';

const _Groceries = ({ groceries, view, toggle, create, destroy }) => {
  return (
    <div>
      <button onClick={create}>Create random</button>
      <ul>
        {groceries
          .filter(
            (grocery) =>
              !view ||
              (grocery.purchased && view === 'purchased') ||
              (!grocery.purchased && view === 'needs')
          )
          .map((grocery) => {
            return (
              <li
                key={grocery.id}
                className={grocery.purchased ? 'purchased' : ''}
              >
                <span onClick={() => toggle(grocery)}>{grocery.name}</span>
                <button onClick={() => destroy(grocery)}>x</button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    destroy: (grocery) => {
      dispatch(destroyGrocery(grocery));
    },
    toggle: (grocery) => {
      dispatch(toggle(grocery));
    },
    create: () => {
      dispatch(createGrocery());
    },
  };
};

const Groceries = connect((state) => state, mapDispatchToProps)(_Groceries);

export default Groceries;
