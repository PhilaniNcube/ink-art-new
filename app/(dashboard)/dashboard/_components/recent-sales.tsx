import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";
import { Database } from "@/utils/supabase/types";

export function RecentSales({
  orders,
}: {
  orders: Database["public"]["Tables"]["orders"]["Row"][];
}) {
  return (
    <div className="space-y-8">
      {orders.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`/abstract-geometric-shapes.png?height=36&width=36&query=${sale.last_name}`}
              alt={sale.last_name[0]}
            />
            <AvatarFallback>{sale.last_name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {sale.first_name} {sale.last_name}
            </p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-medium">{formatCurrency(sale.total)}</p>
            <div className="flex items-center justify-end gap-1">
              <p className="text-xs text-muted-foreground">
                {sale.order_items?.length} item
                {sale.order_items?.length !== 1 ? "s" : ""}
              </p>
              <span
                className={`h-2 w-2 rounded-full ${sale.paid ? "bg-green-500" : "bg-amber-500"}`}
              ></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
