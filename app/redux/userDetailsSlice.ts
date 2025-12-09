import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userDetails:null,
}

const userDetailsSlice = createSlice({
    name:"userDetails",
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
            state.userDetails=action.payload
        },
        setUserDetailsInCookie:(state,action)=>{
            console.log("Setting user details in cookie:", action.payload);
            document.cookie = `userDetails=${JSON.stringify(action.payload)}; path=/;`;
        },
        getUserDetailsFromCookie:(state)=>{
            console.log("THE")
            const cookieString = document.cookie;
            const cookies = cookieString.split('; ');
            const userDetailsCookie = cookies.find(cookie => cookie.startsWith('userDetails='));
            if (userDetailsCookie) {
                const userDetailsValue = userDetailsCookie.split('=')[1];
                state.userDetails = JSON.parse(decodeURIComponent(userDetailsValue));
            }
        }
    }
})

export const { setUserDetails,setUserDetailsInCookie,getUserDetailsFromCookie } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;