//selectors

//actions
const createActionName = actionName => `app/orders/${actionName}`;
const ADD_ORDER = createActionName('ADD_ORDER');

// action creators
export const addOrder = payload => ({ type: ADD_ORDER, payload });

//reducer
const orderReducer = (statePart = [], action) => {
    switch (action.type) {
        case ADD_ORDER:
            return action.payload;
      
        default:
            return statePart;
    };
};

export default orderReducer;