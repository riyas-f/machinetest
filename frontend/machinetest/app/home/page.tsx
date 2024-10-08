"use client";
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define the Item type
type Item = {
  id: number;
  item1: string;
  item2: string;
  item3: string;
};

export default function TableDemo() {
  const [items, setItems] = useState<Item[]>([]);

  // Fetch data from the API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Table>
      <TableCaption>A list of your items from the API.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item 1</TableHead>
          <TableHead>Item 2</TableHead>
          <TableHead>Item 3</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.item1}</TableCell>
            <TableCell>{item.item2}</TableCell>
            <TableCell>{item.item3}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Items: {items.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    
  )
}
