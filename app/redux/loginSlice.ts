import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  name: string;
}

const initialState: LoginState = {
  name: "",
};

const loginSlice = createSlice({
  name: "loginDetails",
  initialState,
  reducers: {
    getName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { getName } = loginSlice.actions;
export default loginSlice.reducer;
