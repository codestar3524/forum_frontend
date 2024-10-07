import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../utils/axios";


// Async thunk to fetch users with pagination and search
export const fetchUsers = createAsyncThunk(
    'admin/fetchUsers',
    async ({ search = '', page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/user/getUser', {
                params: { search, page, limit },
            });
            return response.data; // Assuming data contains { users, totalPages, currentPage }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to update a user
export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({ userId, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/api/user/updateUser/${userId}`, formData);
            return response.data; // Assuming data contains updated user info
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk to delete a user
export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async ({ userId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/user/${userId}`);
            return response.data.deletedUser;  // Assuming it returns deleted user data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
// Approve user action
export const approveUser = createAsyncThunk(
    'admin/approveUser',
    async ({ userId }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/api/user/${userId}/approve`);
        return response.data.user;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Reject user action
  export const rejectUser = createAsyncThunk(
    'admin/rejectUser',
    async ({ userId }, { rejectWithValue }) => {
      try {
        const response = await axios.put(`/api/user/${userId}/reject`);
        return response.data.user;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        currentPage: 1,
        totalPages: 1,
        search: '',
        editingUserId: null,
        editForm: {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
        },
        isLoading: false,
        error: null,
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setEditForm: (state, action) => {
            state.editForm = { ...state.editForm, ...action.payload };
        },
        setEditingUserId: (state, action) => {
            state.editingUserId = action.payload;
        },
        resetEditForm: (state) => {
            state.editForm = {
                username: '',
                email: '',
                firstName: '',
                lastName: '',
            };
            state.editingUserId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload.users;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedUser = action.payload.updatedUser;
                state.users = state.users.map((user) =>
                    user._id === updatedUser._id ? updatedUser : user
                );
                state.editingUserId = null;
                state.editForm = {
                    username: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                };
            })

            // Handle approve user

            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            }).addCase(approveUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const index = state.users.findIndex((user) => user._id === updatedUser._id);
                if (index !== -1) {
                    state.users[index].approved = true;
                    state.users[index].rejected = false; // If approved, the user is not rejected
                }
            })
            .addCase(approveUser.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Handle reject user
            .addCase(rejectUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const index = state.users.findIndex((user) => user._id === updatedUser._id);
                if (index !== -1) {
                    state.users[index].rejected = true;
                    state.users[index].approved = false; // If rejected, the user is not approved
                }
            })
            .addCase(rejectUser.rejected, (state, action) => {
                state.error = action.payload;
            })
            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                const deletedUserId = action.payload._id;
                state.users = state.users.filter(user => user._id !== deletedUserId);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            });

    },
});

export const {
    setSearch,
    setCurrentPage,
    setEditForm,
    setEditingUserId,
    resetEditForm,
} = adminSlice.actions;

export default adminSlice.reducer;