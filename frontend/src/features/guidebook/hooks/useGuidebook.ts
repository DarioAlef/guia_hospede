"use client";
import { useState, useEffect } from "react";
import type {
  GuidebookResponse,
  GuidebookErrorCodeValue,
} from "../../../shared/dtos/guidebook.dto";
import { GuidebookErrorCode } from "../../../shared/dtos/guidebook.dto";

export type GuidebookState =
  | { status: "loading" }
  | { status: "success"; guidebook: GuidebookResponse }
  | { status: "error"; code: GuidebookErrorCodeValue | "UNKNOWN" };

export function mapGuidebookError(
  errorCode: unknown
): GuidebookErrorCodeValue | "UNKNOWN" {
  const known = Object.values(GuidebookErrorCode) as string[];
  return typeof errorCode === "string" && known.includes(errorCode)
    ? (errorCode as GuidebookErrorCodeValue)
    : "UNKNOWN";
}

const activeFetches = new Map<string, Promise<GuidebookResponse>>();

export function useGuidebook(code: string, backendUrl: string): GuidebookState {
  const [state, setState] = useState<GuidebookState>({ status: "loading" });

  useEffect(() => {
    setState({ status: "loading" });
    let isMounted = true;
    const url = `${backendUrl}/properties/${code}/guidebook`;

    let activePromise = activeFetches.get(url);
    if (!activePromise) {
      activePromise = fetch(url, { method: "POST" }).then(async (res) => {
        const data: unknown = await res.json();
        if (res.ok) return data as GuidebookResponse;
        const errorCode = (data as Record<string, unknown>)?.error;
        throw new Error(typeof errorCode === "string" ? errorCode : "UNKNOWN");
      });
      activeFetches.set(url, activePromise);
    }

    activePromise
      .then((guidebook) => {
        if (isMounted) {
          setState({ status: "success", guidebook });
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "UNKNOWN";
          setState({ status: "error", code: mapGuidebookError(message) });
        }
      })
      .finally(() => {
        activeFetches.delete(url);
      });

    return () => {
      isMounted = false;
    };
  }, [code, backendUrl]);

  return state;
}
