"use client";
import { useState, useEffect } from "react";
import type { GuidebookResponse, GuidebookErrorCodeValue } from "../../../shared/dtos/guidebook.dto";
import { GuidebookErrorCode } from "../../../shared/dtos/guidebook.dto";

export type GuidebookState =
  | { status: "loading" }
  | { status: "success"; guidebook: GuidebookResponse }
  | { status: "error"; code: GuidebookErrorCodeValue | "UNKNOWN" };

export function mapGuidebookError(errorCode: unknown): GuidebookErrorCodeValue | "UNKNOWN" {
  const known = Object.values(GuidebookErrorCode) as string[];
  return typeof errorCode === "string" && known.includes(errorCode)
    ? (errorCode as GuidebookErrorCodeValue)
    : "UNKNOWN";
}

export function useGuidebook(code: string, backendUrl: string): GuidebookState {
  const [state, setState] = useState<GuidebookState>({ status: "loading" });

  useEffect(() => {
    setState({ status: "loading" });
    const abortController = new AbortController();

    fetch(`${backendUrl}/properties/${code}/guidebook`, {
      method: "POST",
      signal: abortController.signal,
    })
      .then(async (res) => {
        const data: unknown = await res.json();
        if (res.ok) {
          setState({ status: "success", guidebook: data as GuidebookResponse });
        } else {
          const errorCode = (data as Record<string, unknown>)?.error;
          setState({ status: "error", code: mapGuidebookError(errorCode) });
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        setState({ status: "error", code: "UNKNOWN" });
      });

    return () => {
      abortController.abort();
    };
  }, [code, backendUrl]);

  return state;
}
