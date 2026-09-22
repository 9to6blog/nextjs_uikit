"use client";
import { useId, type ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
export type SortableItemData = {
  id: string;
  label: string;
  content?: ReactNode;
};
function SortableRow({ item }: { item: SortableItemData }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });
  return (
    <li
      ref={setNodeRef}
      className="n-sortable-row"
      data-dragging={isDragging}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <button
        ref={setActivatorNodeRef}
        type="button"
        className="n-drag-handle"
        {...attributes}
        {...listeners}
        aria-label={`${item.label} 순서 변경`}
      >
        ⠿
      </button>
      {item.content ?? item.label}
    </li>
  );
}
export function Sortable({
  items,
  onValueChange,
  label,
}: {
  items: SortableItemData[];
  onValueChange: (items: SortableItemData[]) => void;
  label: string;
}) {
  const id = useId();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCenter}
      accessibility={{
        screenReaderInstructions: {
          draggable:
            "Space로 항목을 집고 방향키로 이동한 다음 Space로 놓으세요. Escape로 취소합니다.",
        },
        announcements: {
          onDragStart: ({ active }) =>
            `${items.find((item) => item.id === active.id)?.label ?? active.id} 항목을 선택했습니다.`,
          onDragOver: ({ active, over }) =>
            over
              ? `${items.find((item) => item.id === active.id)?.label ?? active.id} 항목을 ${items.findIndex((item) => item.id === over.id) + 1}번째 위치로 이동합니다.`
              : undefined,
          onDragEnd: ({ active, over }) =>
            over
              ? `${items.find((item) => item.id === active.id)?.label ?? active.id} 항목을 ${items.findIndex((item) => item.id === over.id) + 1}번째 위치에 놓았습니다.`
              : "이동을 마쳤습니다.",
          onDragCancel: () => "순서 변경을 취소했습니다.",
        },
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over.id)
          onValueChange(
            arrayMove(
              items,
              items.findIndex((i) => i.id === active.id),
              items.findIndex((i) => i.id === over.id),
            ),
          );
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="n-sortable" aria-label={label}>
          {items.map((item) => (
            <SortableRow key={item.id} item={item} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
