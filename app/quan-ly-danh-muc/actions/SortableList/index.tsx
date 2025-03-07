import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Active } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { SortableOverlay } from "./SortableOverlay";
import { SortableItem } from "./SortableItem";
import { DragHandle } from "./DragHandle";
import { updateOrder } from "@/services/file-categories";
import { FileCategoriesEntity } from "@/entities/file-categories";
import { toast } from "react-toastify";
import { useFileCategories } from "@/zustand/file-categories";

interface Props {
  items: FileCategoriesEntity[];
  onChange(items: FileCategoriesEntity[]): void;
  renderItem(item: FileCategoriesEntity): ReactNode;
}

export function SortableList({
  items,
  onChange,
  renderItem,
}: Props) {
  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items?.find((item) => item.id === active?.id),
    [active, items]
  );
  const { getFileCategories } = useFileCategories();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={async ({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          const newItems = arrayMove(items, activeIndex, overIndex)
          onChange(newItems);
          try {
            await updateOrder(newItems)
            await getFileCategories()
            toast.success('Thứ tự chuyển đổi thành công!')
          } catch (err) {
            toast.error((err instanceof Error) ? err.message : 'Có lỗi xảy ra, vui lòng thử lại!')
          }
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <ul className="SortableList" role="application">
          {items?.map((item) => {
            return (
              <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
            )
          })}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;