"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

async function getVendors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vendors`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch vendors");
  }

  return res.json();
}

export async function editVendor(id: string, updatedData: any) {
  const res = await fetch(`/api/vendors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) throw new Error("Failed to update vendor");

  return res.json();
}

export async function deleteVendor(id: number) {
  const res = await fetch(`/api/vendors/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete vendor");

  return res.json();
}

// Define a type for Vendor
type Vendor = {
  id: number;
  vendorName: string;
  bankAccountNo: string;
  bankName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  zipCode: string;
};

export default function VendorPage() {
  // Update state types
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [form, setForm] = useState({
    vendorName: "",
    bankAccountNo: "",
    bankName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    country: "",
    zipCode: "",
  });

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const data = await getVendors();
        setVendors(data);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteVendor(id);
      alert("Vendor deleted successfully");
      setVendors((prev) => prev.filter((v) => v.id !== id)); // Update state to remove the deleted vendor
    } catch (error) {
      console.error("Failed to delete vendor:", error);
      alert("Failed to delete vendor");
    }
  };

  const handleEdit = (vendor: any) => {
    setEditingVendor(vendor); // Set the vendor to be edited
    setForm({
      vendorName: vendor.vendorName || "",
      bankAccountNo: vendor.bankAccountNo || "",
      bankName: vendor.bankName || "",
      addressLine1: vendor.addressLine1 || "",
      addressLine2: vendor.addressLine2 || "",
      city: vendor.city || "",
      country: vendor.country || "",
      zipCode: vendor.zipCode || "",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVendor) return;
    try {
      await editVendor(String(editingVendor.id), form);
      alert("Vendor updated successfully");
      setVendors((prev) =>
        prev.map((v) => (v.id === editingVendor.id ? { ...v, ...form } : v))
      ); // Update state with the edited vendor
      setEditingVendor(null); // Close the form
    } catch (error) {
      console.error("Failed to update vendor:", error);
      alert("Failed to update vendor");
    }
  };

  return (
    <div className="p-4 m-4">
      <div className="flex justify-between">
      <h1 className="text-2xl font-bold mb-4">Vendor List</h1>
      <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-red-500 text-white px-4 py-2 mr-4 rounded hover:bg-red-600"
    >
      Logout
    </button>
    </div>
      <Link href="/vendors/new" className="text-blue-600 underline">
        Add Vendor
      </Link>
      {editingVendor ? (
        <form onSubmit={handleSave} className="p-4 max-w-md mx-auto">
          <h1 className="text-xl font-bold mb-4">Edit Vendor</h1>
          {["vendorName", "bankAccountNo", "bankName", "addressLine1", "addressLine2", "city", "country", "zipCode"].map((field) => (
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditingVendor(null)}
            className="bg-gray-600 text-white px-4 py-2 mt-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      ) : (
        <ul className="mt-4 space-y-2">
          {vendors.map((v: any) => (
            <li
              key={v.id}
              className="border p-2 rounded flex justify-between"
            >
              <div className="font-semibold">{v.vendorName}</div>
              <div>{v.bankAccountNo}</div>
              <div>{v.bankName}</div>
              <div className="flex justify-between gap-6">
                <button onClick={() => handleEdit(v)}>Edit</button>
                <button onClick={() => handleDelete(v.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
