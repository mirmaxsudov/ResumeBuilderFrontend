import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

i18next.use(initReactI18next).init({
  resources: {},
  lng: "uz",
  fallbackLng: "uz",
});

export interface LanguageState {
  language: string;
}

const initLanguageState: LanguageState = {
  language: i18next.language,
};

const languageSlice = createSlice({
  name: "language",
  initialState: initLanguageState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      i18next.changeLanguage(action.payload);
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
