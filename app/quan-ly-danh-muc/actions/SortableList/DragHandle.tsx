import { ButtonIcon } from "@/components/ui/ButtonIcon";
import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { createContext, useContext } from "react";

interface Context {
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

export const SortableItemContext = createContext<Context>({
  listeners: undefined,
  ref() {},
});

export function DragHandle() {
  const {  listeners, ref } = useContext(SortableItemContext);

  return (
    <ButtonIcon className="DragHandle" {...listeners} ref={ref}>
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </ButtonIcon>
  );
}