"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
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
import { useRouter } from "next/navigation";
import deleteCategory from "@/lib/deleteCategory";

// This type is used to define the shape of our data.
const columnHelper = createColumnHelper<CategoryData>(); // You can use a Zod schema here if you want.

export const columns: ColumnDef<CategoryData>[] = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "categoryName",
    header: "Category Name",
  },
  {
    accessorKey: "parent.categoryName",
    header: "Parent Category",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
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
              onClick={() => router.push(`/categories/${category._id}`)}
              className=" flex items-center gap-1 cursor-pointer">
              <LucideShoppingCart className="h-8 w-4" />
              <span>Category Detail</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/products/edit/${category._id}`)}
              className=" flex items-center gap-1 cursor-pointer ">
              <Edit2Icon className="h-8 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteCategory(category._id);
                confirm(
                  `Sure you want to delete category: ${category._id} ${category.categoryName}?`
                );
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
