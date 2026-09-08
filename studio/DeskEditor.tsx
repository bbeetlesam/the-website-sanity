import { useEffect, useRef, useState } from 'react';
import type { UserViewComponent } from 'sanity/structure';
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';

const imageBuilder = createImageUrlBuilder({
  projectId: '55meutke',
  dataset: 'production',
});

const urlFor = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};

type DeskItem = {
  _key: string;
  id?: string;
  icon?: SanityImageSource;
  imageAlt?: string;

  position?: {
    x?: number;
    y?: number;
  };

  size?: number;
  rotation?: number;
};

type DeskSize = {
  width?: number;
  height?: number;
};

type DragState = {
  pointerId: number;
  itemKey: string;

  startMouseX: number;
  startMouseY: number;

  startItemX: number;
  startItemY: number;
};

const DeskEditor: UserViewComponent = ({ document }) => {
  const desk = document.displayed;

  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [items, setItems] = useState<DeskItem[]>(() => {
    return (desk?.deskItems ?? []) as DeskItem[];
  });

  const dragRef = useRef<DragState | null>(null);

  const size = desk?.size as DeskSize | undefined;

  const deskWidth = size?.width ?? 1280;
  const deskHeight = size?.height ?? 720;

  /*
   * Keep the local editor state in sync when the document itself
   * changes from outside the editor.
   */
  useEffect(() => {
    setItems((desk?.deskItems ?? []) as DeskItem[]);
  }, [desk?.deskItems]);

  /*
   * Calculate the scale required to fit the logical Desk inside
   * the available Studio view.
   */
  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const updateScale = () => {
      const { width, height } = container.getBoundingClientRect();

      const horizontalScale = width / deskWidth;
      const verticalScale = height / deskHeight;

      setScale(Math.min(horizontalScale, verticalScale, 1));
    };

    const observer = new ResizeObserver(updateScale);

    observer.observe(container);
    updateScale();

    return () => {
      observer.disconnect();
    };
  }, [deskWidth, deskHeight]);

  if (!desk) {
    return <div>No desk data.</div>;
  }

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    item: DeskItem
  ) => {
    event.stopPropagation();

    setSelectedId(item.id ?? null);

    const itemX = item.position?.x ?? 0;
    const itemY = item.position?.y ?? 0;

    dragRef.current = {
      pointerId: event.pointerId,
      itemKey: item._key,

      startMouseX: event.clientX,
      startMouseY: event.clientY,

      startItemX: itemX,
      startItemY: itemY,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
    item: DeskItem
  ) => {
    const drag = dragRef.current;

    if (!drag) {
      return;
    }

    if (drag.pointerId !== event.pointerId) {
      return;
    }

    if (drag.itemKey !== item._key) {
      return;
    }

    /*
     * clientX/clientY are screen coordinates.
     *
     * The Desk itself may be scaled, so convert the mouse movement
     * back into the Desk's logical coordinate system.
     */
    const deltaX = (event.clientX - drag.startMouseX) / scale;

    const deltaY = (event.clientY - drag.startMouseY) / scale;

    const newX = drag.startItemX + deltaX;
    const newY = drag.startItemY + deltaY;

    setItems((currentItems) =>
      currentItems.map((currentItem) => {
        if (currentItem._key !== drag.itemKey) {
          return currentItem;
        }

        return {
          ...currentItem,

          position: {
            ...(currentItem.position ?? {}),
            x: newX,
            y: newY,
          },
        };
      })
    );
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (!drag) {
      return;
    }

    if (drag.pointerId !== event.pointerId) {
      return;
    }

    dragRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 0,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: deskWidth,
          height: deskHeight,

          position: 'relative',
          flexShrink: 0,

          overflow: 'hidden',

          transform: `scale(${scale})`,
          transformOrigin: 'center center',

          backgroundColor: '#fdfbf6',

          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'><path d='M0 0H50V50H0z' fill='none' stroke='%23dbdbdb' stroke-width='2' stroke-linecap='square'/></svg>")`,

          backgroundRepeat: 'repeat',
        }}
      >
        {items.map((item) => {
          const itemSize = item.size ?? 100;

          const isSelected = item.id === selectedId;

          return (
            <div
              key={item._key}

              onPointerDown={(event) => handlePointerDown(event, item)}

              onPointerMove={(event) => handlePointerMove(event, item)}

              onPointerUp={handlePointerUp}

              onPointerCancel={handlePointerUp}

              style={{
                position: 'absolute',

                left: item.position?.x ?? 0,
                top: item.position?.y ?? 0,

                width: itemSize,
                height: itemSize,

                transform:
                  `translate(-50%, -50%) ` + `rotate(${item.rotation ?? 0}deg)`,

                cursor: 'grab',

                userSelect: 'none',
                touchAction: 'none',

                outline: isSelected ? '2px solid #2276fc' : 'none',

                outlineOffset: 2,
              }}
            >
              {item.icon ? (
                <img
                  src={urlFor(item.icon)
                    .width(itemSize)
                    .height(itemSize)
                    .fit('max')
                    .auto('format')
                    .url()}
                  alt={item.imageAlt ?? ''}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',

                    objectFit: 'contain',
                    display: 'block',

                    pointerEvents: 'none',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',

                    background: '#aaa',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    pointerEvents: 'none',
                  }}
                >
                  {item.id}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeskEditor;
