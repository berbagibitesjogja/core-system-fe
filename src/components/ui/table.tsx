import * as React from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "#/lib/utils";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
}

export function Table({ className, containerClassName, ...props }: TableProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-auto rounded-2xl border border-neutral-200 bg-white shadow-xs",
        containerClassName,
      )}
    >
      <table
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("bg-neutral-50 border-b border-neutral-200", className)}
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={cn("divide-y divide-neutral-100 bg-white", className)}
      {...props}
    />
  );
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "transition-colors hover:bg-neutral-50/70 data-[state=selected]:bg-neutral-100",
        className,
      )}
      {...props}
    />
  );
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sort?: "asc" | "desc" | "none";
  onSort?: () => void;
}

export function TableHead({
  className,
  children,
  sort,
  onSort,
  align = "left",
  ...props
}: TableHeadProps) {
  return (
    <th
      className={cn(
        "h-11 px-4 text-left font-label text-xs font-semibold text-neutral-600 select-none",
        align === "right" && "text-right",
        onSort && "cursor-pointer hover:text-neutral-900",
        className,
      )}
      onClick={onSort}
      {...props}
    >
      <div
        className={cn(
          "inline-flex items-center gap-1.5",
          align === "right" && "justify-end w-full",
        )}
      >
        <span>{children}</span>
        {sort === "asc" && <ArrowUp className="size-3.5 text-brand" />}
        {sort === "desc" && <ArrowDown className="size-3.5 text-brand" />}
        {sort === "none" && (
          <ArrowUpDown className="size-3.5 text-neutral-400" />
        )}
      </div>
    </th>
  );
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: "left" | "right" | "center";
}

export function TableCell({
  className,
  align = "left",
  ...props
}: TableCellProps) {
  return (
    <td
      className={cn(
        "h-16 px-4 align-middle font-sans text-sm text-neutral-900 border-b border-neutral-100",
        align === "right" && "text-right",
        align === "center" && "text-center",
        className,
      )}
      {...props}
    />
  );
}

export interface TableFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TableFooter({ className, ...props }: TableFooterProps) {
  return (
    <div
      className={cn(
        "border-t border-neutral-100 px-5 py-4 w-full rounded-b-2xl relative z-20 bg-white",
        className,
      )}
      {...props}
    />
  );
}
