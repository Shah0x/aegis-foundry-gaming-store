import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  stockCount: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialCartState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cartItems');
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// AUTH STATE FOR SAAS ARCHITECTURE
interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'member';
    orgId?: string;
  } | null;
  org: {
    id: string;
    name: string;
    plan: 'Free' | 'Pro' | 'Enterprise';
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  theme: 'dark' | 'light';
}

const initialAuthState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  org: JSON.parse(localStorage.getItem('org') || 'null'),
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  theme: (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: AuthState['user'];
        org: AuthState['org'];
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.org = action.payload.org;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('org', JSON.stringify(action.payload.org));
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    updateSubscriptionPlan: (state, action: PayloadAction<'Free' | 'Pro' | 'Enterprise'>) => {
      if (state.org) {
        state.org.plan = action.payload;
        localStorage.setItem('org', JSON.stringify(state.org));
      }
    },
    logout: (state) => {
      state.user = null;
      state.org = null;
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem('user');
      localStorage.removeItem('org');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.theme);
      // Synchronize body class for theme
      if (state.theme === 'light') {
        document.documentElement.classList.add('light-mode');
      } else {
        document.documentElement.classList.remove('light-mode');
      }
    },
    syncThemeOnLoad: (state) => {
      if (state.theme === 'light') {
        document.documentElement.classList.add('light-mode');
      } else {
        document.documentElement.classList.remove('light-mode');
      }
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;
export const { setCredentials, updateAccessToken, logout, toggleTheme, syncThemeOnLoad, updateSubscriptionPlan } = authSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
