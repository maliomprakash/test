import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    userData: {},
    pending: false,
    errorMsg: "",
  },
  reducers: {
    setData: (state, action) => {
      state.userData = action.payload;
    },
    // addData: (state, action) => {
    //   console.log("🚀 ~ action:", action)
    //   console.log("🚀 ~ state:", state)
    //   state.userData.push(action.payload);
    // },
    updateRdata: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.userData.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.userData[index] = { ...state.userData[index], ...newData };
      }
    },
    deleteRdata: (state, action) => {
      const id = action.payload;
      state.userData = state.userData.filter((user) => user.id !== id);
    },
    setPending: (state, action) => {
      state.pending = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    },
  },
});

export const {
  setData,
  // addData,
  updateRdata,
  deleteRdata,
  setPending,
  setErrorMsg,
} = userSlice.actions;

export default userSlice.reducer; // Exporting the reducer as default
