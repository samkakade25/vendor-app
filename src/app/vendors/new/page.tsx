"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define a type for the form state
type VendorForm = {
  vendorName: string;
  bankAccountNo: string;
  bankName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  zipCode: string;
};

export default function NewVendorPage() {
  const router = useRouter();
  // Update state type
  const [form, setForm] = useState<VendorForm>({
    vendorName: "",
    bankAccountNo: "",
    bankName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    zipCode: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/vendors", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/vendors");
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Vendor</h1>
      {[
        "vendorName",
        "bankAccountNo",
        "bankName",
        "addressLine1",
        "addressLine2",
        "city",
        "country",
        "zipCode",
      ].map((field) => (
        <div className="mb-2" key={field}>
          <label className="block capitalize">{field}</label>
          <input
            type="text"
            value={(form as any)[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Create Vendor
      </button>
    </form>
  );
}
