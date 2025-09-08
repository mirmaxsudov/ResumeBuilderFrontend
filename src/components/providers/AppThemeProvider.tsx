"use client";

import React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  const algorithm = theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;

  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          borderRadius: 8,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

