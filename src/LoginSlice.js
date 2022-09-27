import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const mock = true;

const initialState = {
    isLoggedin: false,
    isAdmin: false,
    userName: "",
    password: ""
}

export const asyncLogin = createAsyncThunk("login/asyncLogin",async(userName,password) => {
  if(!mock)
  return axios.post('/login',{"userName":userName,"password":password}).then(function (response){
    // handle success
    console.log(response)
   /* if(response.data.login == true)
    //props.setLogin(true);
    dispatchEvent()
    
    if(response.data.isAdmin == true)
    props.setAdmin(true);*/
    return response.data;
    }).catch(function (error) {
        // handle error
        return error;
    });
  else
  {
    return true;
  }
})

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUserName: (state,action) => {
      state.userName = action.payload;
    },
    setPassword: (state,action) => {
      state.password = action.payload;
    },
  },
  extraReducers: {
    [asyncLogin.pending]: (state,action) => {
       
      //state.isLoggedin = true
    },
    [asyncLogin.fulfilled]: (state,action) => {
      console.log(action.payload);
      state.isLoggedin = action.payload;
    },
    [asyncLogin.rejected]: (state,action) => {

    }
  },
})


export const { setUserName,setPassword } = loginSlice.actions

export default loginSlice.reducer