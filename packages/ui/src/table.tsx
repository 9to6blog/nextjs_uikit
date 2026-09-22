import type { ComponentProps } from "react";
import { cn } from "./utils.js";
export function Table({ className, ...props }: ComponentProps<"table">) {
  return <table {...props} className={cn("n-table", className)} />;
}
export function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return <thead {...props} className={cn("n-table-header", className)} />;
}
export function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody {...props} className={cn("n-table-body", className)} />;
}
export function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return <tfoot {...props} className={cn("n-table-footer", className)} />;
}
export function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return <tr {...props} className={cn("n-table-row", className)} />;
}
export function TableHead({ className, ...props }: ComponentProps<"th">) {
  return (
    <th scope="col" {...props} className={cn("n-table-head", className)} />
  );
}
export function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td {...props} className={cn("n-table-cell", className)} />;
}
export function TableCaption({
  className,
  ...props
}: ComponentProps<"caption">) {
  return <caption {...props} className={cn("n-table-caption", className)} />;
}
