import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cryptos: [],
    showCaseCryptos: [],
    singleCrypto: JSON.parse(localStorage.getItem('singleCrypto')) || {},
    historicalData: [],
    loading: true,
    currency: 'inr',
    page: 1,
    error: null 
};

export const fetchCoins = createAsyncThunk(
    'crypto/getCoins',
    async (currency, { rejectWithValue }) => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-BDfhH3XTiJBiwg1jF3pSD8Ps' }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`, options);
            if (!response.ok) {
                const errorText = await response.text();
                return rejectWithValue({ message: errorText });
            }
            const result = await response.json();
            return result;
        } catch (err) {
            return rejectWithValue({ message: err.message });
        }
    }
);

export const getSingleCryptoData = createAsyncThunk(
    'crypto/getSingleCryptoData',
    async ({ id }, { rejectWithValue }) => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-BDfhH3XTiJBiwg1jF3pSD8Ps' }
        };
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options);
            if (!response.ok) {
                const errorText = await response.text();
                return rejectWithValue({ message: errorText });
            }
            const result = await response.json();
            return result;
        } catch (err) {
            return rejectWithValue({ message: err.message });
        }
    }
);

export const fetchHistoricalDataInfo = createAsyncThunk(
    'crypto/fetchHistoricalDataInfo',
    async ({ id, currency, interValDays }, { rejectWithValue }) => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-BDfhH3XTiJBiwg1jF3pSD8Ps' }
        };
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${interValDays}&interval=daily`, options);
            if (!response.ok) {
                const errorText = await response.text();
                return rejectWithValue({ message: errorText });
            }
            const result = await response.json();
            return result;
        } catch (err) {
            return rejectWithValue({ message: err.message });
        }
    }
);


export const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        addPaginationCrypto: (state, action) => {
            state.showCaseCryptos = action.payload;
        },
        changeCurrencyToInr: (state) => {
            state.currency = 'inr';
        },
        changeCurrencyToUSD: (state) => {
            state.currency = 'usd';
        }, 
        incrementPage: (state) => {
            if (state.page < 10) {
                state.page += 1;
            }
        },
        decrementPage: (state) => {
            if (state.page > 1) {
                state.page -= 1;
            }
        },
        filterCrypto: (state, action) => {
            const filteredCrypto = state.cryptos.filter((crypto) => 
                crypto.id.toLowerCase().includes(action.payload.toLowerCase())
            );
            state.showCaseCryptos = filteredCrypto;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoins.pending, (state) => {
                state.loading = true;
                state.error = null; 
            })
            .addCase(fetchCoins.fulfilled, (state, action) => {
                state.loading = false;
                state.cryptos = action.payload;
                const startIndex = (state.page - 1) * 8;
                const endIndex = state.page * 8;
                state.showCaseCryptos = action.payload.slice(startIndex, endIndex);
            })
            .addCase(fetchCoins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message; 
            })
            .addCase(fetchHistoricalDataInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHistoricalDataInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.historicalData = action.payload.prices;
                state.error = null;
            })
            .addCase(fetchHistoricalDataInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getSingleCryptoData.pending, (state) => {
                state.loading = true;
                localStorage.setItem('singleCrypto',JSON.stringify({}))
                state.singleCrypto = {}
                state.error = null;
            })
            .addCase(getSingleCryptoData.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                console.log("Dekh le bhai : ",action.payload)
                localStorage.setItem('singleCrypto', JSON.stringify(action.payload));
                state.singleCrypto = action.payload;
                console.log("Bhai maien to hoo geya hu : ",state.singleCrypto)
            })
            .addCase(getSingleCryptoData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }
});

export const { addPaginationCrypto, changeCurrencyToInr, changeCurrencyToUSD, incrementPage, decrementPage, filterCrypto } = cryptoSlice.actions;

export default cryptoSlice.reducer;
