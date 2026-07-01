import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  loginApi,
  registerApi,
  LoginPayload,
  RegisterPayload,
  User,
  AuthResponse,
  RegisterResponse,
} from "./authApi";

import { saveAuth, clearAuth, getToken, getUser } from "@/utils/auth";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface AuthState {
  user: User | null;
  token: string | null;

  loginLoading: boolean;
  registerLoading: boolean;

  error: {
    login: string | null;
    register: string | null;
  };
}

const initialState: AuthState = {
  user: getUser(),
  token: getToken(),

  loginLoading: false,
  registerLoading: false,

  error: {
    login: null,
    register: null,
  },
};

// Register
export const register = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (data, thunkAPI) => {
  try {
    return await registerApi(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// Login
export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (data, thunkAPI) => {
  try {
    return await loginApi(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;

      state.loginLoading = false;
      state.registerLoading = false;

      state.error.login = null;
      state.error.register = null;

      clearAuth();
    },
  },

  extraReducers: (builder) => {
    // Login

    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.error.login = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false;

      state.user = action.payload.user;
      state.token = action.payload.token;

      saveAuth(action.payload.token, action.payload.user);
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
      state.error.login = action.payload ?? "Login Failed";
    });

    // Register

    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
      state.error.register = null;
    });

    builder.addCase(register.fulfilled, (state) => {
      state.registerLoading = false;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.registerLoading = false;
      state.error.register = action.payload ?? "Registration Failed";
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
