/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  Course,
  CoursePayload,
  getCoursesApi,
  getCourseApi,
  createCourseApi,
  updateCourseApi,
  deleteCourseApi,
} from "./courseApi";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface CourseState {
  courses: Course[];
  course: Course | null;

  fetchLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  deleteLoading: boolean;

  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  course: null,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  error: null,
};

// Get All
export const getCourses = createAsyncThunk(
  "course/getCourses",
  async (_, thunkAPI) => {
    try {
      return await getCoursesApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

// Get Single
export const getCourse = createAsyncThunk(
  "course/getCourse",
  async (id: string, thunkAPI) => {
    try {
      return await getCourseApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

// Create
export const createCourse = createAsyncThunk(
  "course/createCourse",
  async (data: CoursePayload, thunkAPI) => {
    try {
      return await createCourseApi(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

// Update
export const updateCourse = createAsyncThunk(
  "course/updateCourse",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: Partial<CoursePayload>;
    },
    thunkAPI,
  ) => {
    try {
      return await updateCourseApi(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

// Delete
export const deleteCourse = createAsyncThunk(
  "course/deleteCourse",
  async (id: string, thunkAPI) => {
    try {
      await deleteCourseApi(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  },
);

const courseSlice = createSlice({
  name: "course",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // Get All
    builder.addCase(getCourses.pending, (state) => {
      state.fetchLoading = true;
      state.error = null;
    });

    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.courses = action.payload;
    });

    builder.addCase(getCourses.rejected, (state, action: any) => {
      state.fetchLoading = false;
      state.error = action.payload;
    });

    // Get One
    builder.addCase(getCourse.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(getCourse.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.course = action.payload;
    });

    builder.addCase(getCourse.rejected, (state, action: any) => {
      state.fetchLoading = false;
      state.error = action.payload;
    });

    // Create
    builder.addCase(createCourse.pending, (state) => {
      state.fetchLoading = true;
    });

    builder.addCase(createCourse.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.courses.unshift(action.payload);
    });

    builder.addCase(createCourse.rejected, (state, action: any) => {
      state.fetchLoading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateCourse.fulfilled, (state, action) => {
      state.fetchLoading = false;

      state.courses = state.courses.map((course) =>
        course._id === action.payload._id ? action.payload : course,
      );

      if (state.course?._id === action.payload._id) {
        state.course = action.payload;
      }
    });

    // Delete
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.fetchLoading = false;

      state.courses = state.courses.filter(
        (course) => course._id !== action.payload,
      );
    });
  },
});

export default courseSlice.reducer;
