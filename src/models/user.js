const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchCurrent({ payload }, { call, put, parm }) {
      yield put({
        type: 'saveCurrentUser',
        payload,
      })
    },
    *getUser(_, { put }) {
      yield put({
        type: 'getCurrentUser'
      })
    }
  },
  reducers: {
    saveCurrentUser(state, action) {
      action.payload && window.localStorage.setItem('userAccount', JSON.stringify(action.payload))
      return { ...state, currentUser: action.payload || {} }
    },
    getCurrentUser(state) {
      const userAccount = window.localStorage.getItem('userAccount')
      if (userAccount) {
        return { ...state, currentUser: JSON.parse(userAccount) }
      }
    }
  }
}
export default UserModel
