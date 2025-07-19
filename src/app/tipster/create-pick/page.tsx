"use client"
import React from "react";
import MultiStepPickForm from "@/components/MultiStepPickForm";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function CreatePickPage() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <div className="py-12 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Crear Nuevo Pick</h1>
        <MultiStepPickForm onCancel={() => router.push("/tipster/dashboard")} onSuccess={() => router.push("/tipster/dashboard")} />
      </div>
    </ProtectedRoute>
  );
} 