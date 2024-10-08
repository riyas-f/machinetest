"use client"
import { useState } from "react";
import Image from "next/image";

export default function AddItems() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <AddItemForm />
      </main>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button" // Assuming you have a button component

export function AddItemForm() {
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item1,
          item2,
          item3,
        }),
      });

      if (response.ok) {
        setSuccess(true); // Show success message
        setItem1("");
        setItem2("");
        setItem3("");
      } else {
        setError("Failed to add item. Please try again.");
      }
    } catch (err) {
      setError("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>
          Enter details for the new product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="item1">Item 1</Label>
            <Input
              id="item1"
              type="text"
              className="w-full"
              value={item1}
              onChange={(e) => setItem1(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="item2">Item 2</Label>
            <Input
              id="item2"
              type="text"
              className="w-full"
              value={item2}
              onChange={(e) => setItem2(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="item3">Item 3</Label>
            <Input
              id="item3"
              type="text"
              className="w-full"
              value={item3}
              onChange={(e) => setItem3(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Add Item"}
          </Button>
          {success && <p className="text-green-500">Item added successfully!</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
