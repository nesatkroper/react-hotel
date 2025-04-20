import {
  createApiThunk,
  createGenericSlice,
} from "../utils/create-async-slice";

// For your groupmessage endpoint with nested selects
export const getGroupMessages = createApiThunk(
  "messages/getGroupMessages",
  "/groupmessage",
  {
    cacheEnabled: true,
    cacheExpiration: 24 * 60 * 60 * 1000,
    isPrismaEndpoint: true, // Mark this as a Prisma endpoint
  }
);

const groupMessageSlice = createGenericSlice("messages", getGroupMessages);

export const {
  clearCacheAsync,
  clearCache,
  updateItem,
  addItem,
  removeItem,
  updateNestedItem, // New action for nested updates
} = groupMessageSlice.actions;

export default groupMessageSlice.reducer;
