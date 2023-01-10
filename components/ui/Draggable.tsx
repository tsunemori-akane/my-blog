import { useEffect, useCallback, useRef } from "react";
interface DraggableItem {
  children: JSX.Element[] | JSX.Element,
  className?: string,
  onDragStart?: (o: DOMRect) => void,
  onDragEnd?: (o: DOMRect) => void
}

export function Draggable({ children, className, onDragStart, onDragEnd }: DraggableItem) {
  const dragRef = useRef<HTMLDivElement>(null);
  let isMouseDown: boolean = false;
  let offset: Array<number> = [0, 0];

  const onMouseDown = (e: any) => {
    isMouseDown = true;
    const dragItem = dragRef.current
    if (!dragItem) return;

    const isTouch: boolean = /touch/g.test(e.type);
    const x: number = isTouch ? e.touches[0].clientX : e.clientX;
    const y: number = isTouch ? e.touches[0].clientY : e.clientY;

    offset = [
      dragItem.offsetLeft - x,
      dragItem.offsetTop - y
    ];

    if (onDragStart) {
      const rect = dragItem?.getBoundingClientRect() as DOMRect;
      onDragStart(rect);
    }
    
    dragItem.addEventListener('mouseup', onMouseUp, true);
    dragItem.addEventListener('touchend', onMouseUp, true);

    document.addEventListener('contextmenu', onContextMenu, false);
    document.addEventListener('touchmove', onMouseMove, true);
    document.addEventListener('mousemove', onMouseMove, true);
  }

  const onMouseUp = () => {
    isMouseDown = false;
    if (!isMouseDown && onDragEnd) {
      const rect = dragRef.current?.getBoundingClientRect() as DOMRect;
      onDragEnd(rect)
    }

    document.removeEventListener('touchmove', onMouseMove, true);
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('contextmenu', onContextMenu, false);
  }

  const onMouseMove = useCallback((e: any) => {
    const isTouch: boolean = /touch/g.test(e.type);

    if (!isTouch) {
      e.preventDefault();
    }

    if (isMouseDown && dragRef.current) {
      const x: number = isTouch ? e.touches[0].clientX : e.clientX;
      const y: number = isTouch ? e.touches[0].clientY : e.clientY;

      dragRef.current.style.left = (x + offset[0]) + 'px';
      dragRef.current.style.top = (y + offset[1]) + 'px';
    }
  }, []);

  const onContextMenu = () => {
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('touchmove', onMouseMove, true);
  }

  useEffect(() =>{
    const dragItem = dragRef.current;
    
    dragItem?.addEventListener('touchstart', onMouseDown, true);
    dragItem?.addEventListener('mousedown', onMouseDown, true);

    return () => {
      dragItem?.removeEventListener('mousedown', onMouseDown, true);
      dragItem?.removeEventListener('mouseup', onMouseUp, true);
      document.removeEventListener('mousemove', onMouseMove, true);

      dragItem?.removeEventListener('touchstart', onMouseDown, true);
      dragItem?.removeEventListener('touchend', onMouseUp, true);
      document.removeEventListener('touchmove', onMouseMove, true);

      document.removeEventListener('contextmenu', onContextMenu, false);
    }
  }, [])

  return (
    <div ref={dragRef} className={`absolute ${className ? className : ''}`}>
      {children}
    </div>
  )
}