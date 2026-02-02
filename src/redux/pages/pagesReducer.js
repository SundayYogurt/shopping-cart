const initialState = {
    home: true,
}

const pagesReducer = (state = initialState, action) => {
    switch(action.type) {
        case "HOME": return { home: true}
        case "CART": return { home: false}
        default: return state
    
    }
}

export default pagesReducer;