"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Tables } from "@/utils/supabase/types";
import { format } from "date-fns";

export const columns: ColumnDef<Tables<"categories">>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date: string = row.getValue("created_at");
      return format(new Date(date), "PP");
    },
  },
];
