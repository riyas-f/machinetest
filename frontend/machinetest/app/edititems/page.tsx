"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // To get the item ID from the URL if needed
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditItem({ itemId }: { itemId: string }) {
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Fetch the existing item data
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/items/${itemId}/`);
        const data = await response.json();

        setItem1(data.item1);
        setItem2(data.item2);
        setItem3(data.item3);
      } catch (err) {
        setError("Failed to load item data.");
      }
    };

    fetchItem();
  }, [itemId]);

  // Handle form submission for updating the item
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/items/${itemId}/`, {
        method: "PUT",
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
      } else {
        setError("Failed to update item. Please try again.");
      }
    } catch (err) {
      setError("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card>
          <CardHeader>
            <CardTitle>Edit Item Details</CardTitle>
            <CardDescription>Update the details for this item.</CardDescription>
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
                <Textarea
                  id="item3"
                  className="min-h-32"
                  value={item3}
                  onChange={(e) => setItem3(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Item"}
              </Button>
              {success && <p className="text-green-500">Item updated successfully!</p>}
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
