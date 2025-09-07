"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useAppSelector } from "@/hooks/hooks";
import BASE_URL from "@/constants/url";

type StompContextValue = {
  client: Client | null;
  connected: boolean;
  subscribe: (destination: string, cb: (message: IMessage) => void) => StompSubscription | null;
  unsubscribe: (sub?: StompSubscription | null) => void;
  publish: (destination: string, body: string) => void;
};

const StompContext = createContext<StompContextValue | undefined>(undefined);

export function StompProvider({ children }: { children: React.ReactNode }) {
  const authUser = useAppSelector((s) => s.auth.user);
  const token = authUser?.accessToken;

  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  // Create/teardown a single client based on token presence
  useEffect(() => {
    // Disconnect when no token
    if (!token) {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
      setConnected(false);
      return;
    }

    // If client exists, just ensure it's active and headers are set
    if (clientRef.current) {
      // If already connected, nothing else to do
      return;
    }

    const client = new Client({
      // Use SockJS endpoint
      webSocketFactory: () => new SockJS(`${BASE_URL}/ws`),
      connectHeaders: {
        token: token,
      },
      // Auto-reconnect with backoff
      reconnectDelay: 5000,
      debug: (str) => {
        // Comment out in production if too noisy
        console.log("[STOMP]", str);
      },
      onConnect: () => {
        setConnected(true);
      },
      onStompError: (frame) => {
        console.error("[STOMP ERROR]", frame);
      },
      onWebSocketClose: () => {
        setConnected(false);
      },
      onWebSocketError: (evt) => {
        console.error("[WS ERROR]", evt);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
      clientRef.current = null;
      setConnected(false);
    };
  }, [token]);

  const subscribe = useCallback(
    (destination: string, cb: (message: IMessage) => void): StompSubscription | null => {
      const c = clientRef.current;
      if (!c || !c.connected) return null;
      try {
        return c.subscribe(destination, cb);
      } catch (e) {
        console.error("Failed to subscribe:", destination, e);
        return null;
      }
    },
    []
  );

  const unsubscribe = useCallback((sub?: StompSubscription | null) => {
    try {
      sub?.unsubscribe();
    } catch (e) {
      // ignore
    }
  }, []);

  const publish = useCallback((destination: string, body: string) => {
    const c = clientRef.current;
    if (!c || !c.connected) return;
    try {
      c.publish({ destination, body });
    } catch (e) {
      console.error("Failed to publish:", destination, e);
    }
  }, []);

  const value: StompContextValue = {
    client: clientRef.current,
    connected,
    subscribe,
    unsubscribe,
    publish,
  };

  return <StompContext.Provider value={value}>{children}</StompContext.Provider>;
}

export function useStomp() {
  const ctx = useContext(StompContext);
  if (!ctx) throw new Error("useStomp must be used within a StompProvider");
  return ctx;
}

