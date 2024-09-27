"use client";
import React from "react";
import { Clock, Loader2 } from "lucide-react";
export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-75">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto" />

        <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
