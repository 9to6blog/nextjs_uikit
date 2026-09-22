"use client";
import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { MovingHighlight } from "./moving-highlight.js";
export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
  disabled?: boolean;
};
export type TreeProps = {
  nodes: TreeNode[];
  label: string;
  value?: string;
  onValueChange?: (id: string) => void;
  defaultExpanded?: string[];
};
type VisibleNode = TreeNode & {
  level: number;
  parent?: string;
  size: number;
  position: number;
};
export function Tree({
  nodes,
  label,
  value,
  onValueChange,
  defaultExpanded = [],
}: TreeProps) {
  const [expanded, setExpanded] = useState(new Set(defaultExpanded));
  const [active, setActive] = useState<string>();
  const refs = useRef(new Map<string, HTMLDivElement>());
  const query = useRef({ text: "", at: 0 });
  const visible: VisibleNode[] = [];
  function visit(items: TreeNode[], level: number, parent?: string) {
    items.forEach((node, i) => {
      visible.push({
        ...node,
        level,
        parent,
        size: items.length,
        position: i + 1,
      });
      if (node.children && expanded.has(node.id))
        visit(node.children, level + 1, node.id);
    });
  }
  visit(nodes, 1);
  const focusable = visible.filter((n) => !n.disabled);
  const current = focusable.some((n) => n.id === active)
    ? active
    : focusable[0]?.id;
  function focus(id?: string) {
    if (id) {
      setActive(id);
      refs.current.get(id)?.focus();
    }
  }
  function toggle(id: string) {
    setExpanded((old) => {
      const next = new Set(old);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function key(event: KeyboardEvent, node: VisibleNode) {
    const i = focusable.findIndex((n) => n.id === node.id);
    switch (event.key) {
      case "ArrowDown":
        focus(focusable[Math.min(i + 1, focusable.length - 1)]?.id);
        break;
      case "ArrowUp":
        focus(focusable[Math.max(0, i - 1)]?.id);
        break;
      case "Home":
        focus(focusable[0]?.id);
        break;
      case "End":
        focus(focusable.at(-1)?.id);
        break;
      case "ArrowRight":
        if (node.children?.length) {
          if (!expanded.has(node.id)) toggle(node.id);
          else focus(node.children.find((n) => !n.disabled)?.id);
        }
        break;
      case "ArrowLeft":
        if (node.children?.length && expanded.has(node.id)) toggle(node.id);
        else focus(node.parent);
        break;
      case "Enter":
      case " ":
        onValueChange?.(node.id);
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          const now = event.timeStamp;
          query.current = {
            text:
              (now - query.current.at > 500 ? "" : query.current.text) +
              event.key.toLocaleLowerCase(),
            at: now,
          };
          const ordered = [
            ...focusable.slice(i + 1),
            ...focusable.slice(0, i + 1),
          ];
          focus(
            ordered.find((n) =>
              n.label.toLocaleLowerCase().startsWith(query.current.text),
            )?.id,
          );
        }
        return;
    }
    event.preventDefault();
  }
  return (
    <div role="tree" aria-label={label} className="n-tree">
      <MovingHighlight selector="[role=treeitem]" />
      {visible.map((node) => (
        <div
          key={node.id}
          ref={(el) => {
            if (el) refs.current.set(node.id, el);
            else refs.current.delete(node.id);
          }}
          role="treeitem"
          aria-level={node.level}
          aria-setsize={node.size}
          aria-posinset={node.position}
          aria-expanded={
            node.children?.length ? expanded.has(node.id) : undefined
          }
          aria-selected={value === node.id}
          aria-disabled={node.disabled || undefined}
          tabIndex={!node.disabled && current === node.id ? 0 : -1}
          style={{ "--tree-level": node.level } as CSSProperties}
          onFocus={() => setActive(node.id)}
          onKeyDown={(e) => {
            if (!node.disabled) key(e, node);
          }}
          onClick={() => {
            if (!node.disabled) {
              focus(node.id);
              onValueChange?.(node.id);
              if (node.children?.length) toggle(node.id);
            }
          }}
        >
          <span aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {node.children?.length ? (
                <path
                  d={
                    expanded.has(node.id)
                      ? "M3 8V5h6l2 3h10v3M3 8h7l2 3h10l-3 9H3Z"
                      : "M3 5h6l2 3h10v12H3Z"
                  }
                />
              ) : (
                <path d="M6 3h8l4 4v14H6ZM14 3v5h4" />
              )}
            </svg>
          </span>
          {node.label}
        </div>
      ))}
    </div>
  );
}
