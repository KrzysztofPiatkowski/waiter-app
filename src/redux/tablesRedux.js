import settings from '../settings';

// Selektory (dodamy później)

// ACTION TYPES – lepiej nazywać akcje z prefiksem
const createActionName = actionName => `app/tables/${actionName}`;

const LOAD_TABLES = createActionName('LOAD_TABLES');

// ACTION CREATORS
export const loadTables = payload => ({ type: LOAD_TABLES, payload });

export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${settings.api.baseURL}/tables`)
      .then(res => res.json())
      .then(data => dispatch(loadTables(data)))
      .catch(err => console.error('Fetch tables error:', err));
  };
};

// REDUCER
const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_TABLES:
      return [...action.payload];
    default:
      return statePart;
  }
};

export const getTableById = (state, id) => 
  state.tables.find(table => table.id === Number(id));

export default tablesReducer;
