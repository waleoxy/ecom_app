"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Edit2Icon,
  LucideShoppingCart,
  MoreVertical,
  Trash2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import deleteProduct from "@/lib/deieteProduct";
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const formatNum = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const columns: ColumnDef<ProductData>[] = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "description",
    header: "Descripiton",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium max-w-[250px]">
          {row.getValue("description")}
        </div>
      );
    },
  },
  {
    accessorKey: "category.categoryName",
    header: "Category Name",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const router = useRouter();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => router.push(`/products/${product._id}`)}
              className=" flex items-center gap-1 cursor-pointer">
              <LucideShoppingCart className="h-8 w-4" />
              <span>Product Detail</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/products/edit/${product._id}`)}
              className=" flex items-center gap-1 cursor-pointer ">
              <Edit2Icon className="h-8 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteProduct(product._id);
                confirm(
                  `Sure you want to delete product: ${product._id} ${product.productName}?`
                );
                // alert("deleted");
                router.refresh();
              }}
              className="text-red-500 flex items-center gap-1 cursor-pointer ">
              <Trash2Icon className="h-8 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
