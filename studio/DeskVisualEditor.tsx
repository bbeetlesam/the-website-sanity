import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { useDocumentOperation } from 'sanity';
import type { UserViewComponent } from 'sanity/structure';
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
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

type InteractionState =
  | {
      mode: 'move';
      pointerId: number;
      itemKey: string;

      startMouseX: number;
      startMouseY: number;

      startItemX: number;
      startItemY: number;

      currentItemX: number;
      currentItemY: number;
    }
  | {
      mode: 'resize';
      pointerId: number;
      itemKey: string;

      startMouseX: number;
      startMouseY: number;

      startSize: number;
      currentSize: number;
    }
  | {
      mode: 'rotate';
      pointerId: number;
      itemKey: string;

      centerScreenX: number;
      centerScreenY: number;

      startAngle: number;
      startRotation: number;
      currentRotation: number;
    };

const DeskEditor: UserViewComponent = ({ document, documentId }) => {
  const desk = document.displayed;

  /*
   * Sanity document operation.
   *
   * We will use this to patch the document when a drag finishes.
   */
  const { patch } = useDocumentOperation(documentId, 'desk');

  const containerRef = useRef<HTMLDivElement>(null);

  const interactionRef = useRef<InteractionState | null>(null);

  const [scale, setScale] = useState(1);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const [items, setItems] = useState<DeskItem[]>(() => {
    return (desk?.deskItems ?? []) as DeskItem[];
  });

  const size = desk?.size as DeskSize | undefined;

  const deskWidth = size?.width ?? 1280;
  const deskHeight = size?.height ?? 720;

  /*
   * Keep the local editor state synchronized with Sanity.
   *
   * This means that once our patch is committed, the updated
   * document comes back through document.displayed and refreshes
   * our local state.
   */
  useEffect(() => {
    setItems((desk?.deskItems ?? []) as DeskItem[]);
  }, [desk?.deskItems]);

  /*
   * Scale the logical Desk to fit the available Studio area.
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

  const handleMovePointerDown = (
    event: PointerEvent<HTMLDivElement>,
    item: DeskItem
  ) => {
    event.stopPropagation();

    setSelectedId(item.id ?? null);
    setIsDragging(true);

    const itemX = item.position?.x ?? 0;
    const itemY = item.position?.y ?? 0;

    interactionRef.current = {
      mode: 'move',
      pointerId: event.pointerId,
      itemKey: item._key,

      startMouseX: event.clientX,
      startMouseY: event.clientY,

      startItemX: itemX,
      startItemY: itemY,

      currentItemX: itemX,
      currentItemY: itemY,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleResizePointerDown = (
    event: PointerEvent<HTMLDivElement>,
    item: DeskItem
  ) => {
    event.stopPropagation();

    setSelectedId(item.id ?? null);

    const itemSize = item.size ?? 100;

    interactionRef.current = {
      mode: 'resize',
      pointerId: event.pointerId,
      itemKey: item._key,

      startMouseX: event.clientX,
      startMouseY: event.clientY,

      startSize: itemSize,
      currentSize: itemSize,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleRotatePointerDown = (
    event: PointerEvent<HTMLDivElement>,
    item: DeskItem
  ) => {
    event.stopPropagation();

    setSelectedId(item.id ?? null);

    const itemX = item.position?.x ?? 0;
    const itemY = item.position?.y ?? 0;

    /*
     * The Desk itself is scaled with CSS, so convert the item's
     * logical Desk coordinates back into screen coordinates.
     */
    const desk = containerRef.current?.querySelector(
      '[data-desk-canvas]'
    ) as HTMLDivElement | null;

    if (!desk) {
      return;
    }

    const deskRect = desk.getBoundingClientRect();

    const centerScreenX = deskRect.left + itemX * scale;

    const centerScreenY = deskRect.top + itemY * scale;

    const startAngle = Math.atan2(
      event.clientY - centerScreenY,
      event.clientX - centerScreenX
    );

    interactionRef.current = {
      mode: 'rotate',
      pointerId: event.pointerId,
      itemKey: item._key,

      centerScreenX,
      centerScreenY,

      startAngle,
      startRotation: item.rotation ?? 0,
      currentRotation: item.rotation ?? 0,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
    item: DeskItem
  ) => {
    const interaction = interactionRef.current;

    if (!interaction) {
      return;
    }

    if (interaction.pointerId !== event.pointerId) {
      return;
    }

    if (interaction.itemKey !== item._key) {
      return;
    }

    if (interaction.mode === 'move') {
      const deltaX = (event.clientX - interaction.startMouseX) / scale;

      const deltaY = (event.clientY - interaction.startMouseY) / scale;

      const newX = Math.round(interaction.startItemX + deltaX);
      const newY = Math.round(interaction.startItemY + deltaY);

      interaction.currentItemX = newX;
      interaction.currentItemY = newY;

      setItems((currentItems) =>
        currentItems.map((currentItem) => {
          if (currentItem._key !== interaction.itemKey) {
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

      return;
    }

    if (interaction.mode === 'resize') {
      /*
       * The resize handle sits on the bottom-right corner.
       * Measuring from the item's center gives us a uniform
       * square resize regardless of the item's rotation.
       */
      const itemX = item.position?.x ?? 0;
      const itemY = item.position?.y ?? 0;

      const desk = containerRef.current?.querySelector(
        '[data-desk-canvas]'
      ) as HTMLDivElement | null;

      if (!desk) {
        return;
      }

      const deskRect = desk.getBoundingClientRect();

      const centerScreenX = deskRect.left + itemX * scale;

      const centerScreenY = deskRect.top + itemY * scale;

      const dx = event.clientX - centerScreenX;
      const dy = event.clientY - centerScreenY;

      const newSize = Math.max(
        20,
        Math.round((Math.sqrt(dx * dx + dy * dy) * Math.sqrt(2)) / scale)
      );

      interaction.currentSize = newSize;

      setItems((currentItems) =>
        currentItems.map((currentItem) => {
          if (currentItem._key !== interaction.itemKey) {
            return currentItem;
          }

          return {
            ...currentItem,
            size: newSize,
          };
        })
      );

      return;
    }

    if (interaction.mode === 'rotate') {
      const currentAngle = Math.atan2(
        event.clientY - interaction.centerScreenY,
        event.clientX - interaction.centerScreenX
      );

      const deltaAngle =
        ((currentAngle - interaction.startAngle) * 180) / Math.PI;

      const newRotation = Math.round(interaction.startRotation + deltaAngle);

      interaction.currentRotation = newRotation;

      setItems((currentItems) =>
        currentItems.map((currentItem) => {
          if (currentItem._key !== interaction.itemKey) {
            return currentItem;
          }

          return {
            ...currentItem,
            rotation: newRotation,
          };
        })
      );
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const interaction = interactionRef.current;

    if (!interaction) {
      return;
    }

    if (interaction.pointerId !== event.pointerId) {
      return;
    }

    interactionRef.current = null;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (patch.disabled) {
      return;
    }

    if (interaction.mode === 'move') {
      patch.execute([
        {
          set: {
            [`deskItems[_key=="${interaction.itemKey}"].position.x`]:
              interaction.currentItemX,
            [`deskItems[_key=="${interaction.itemKey}"].position.y`]:
              interaction.currentItemY,
          },
        },
      ]);

      return;
    }

    if (interaction.mode === 'resize') {
      patch.execute([
        {
          set: {
            [`deskItems[_key=="${interaction.itemKey}"].size`]:
              interaction.currentSize,
          },
        },
      ]);

      return;
    }

    if (interaction.mode === 'rotate') {
      patch.execute([
        {
          set: {
            [`deskItems[_key=="${interaction.itemKey}"].rotation`]:
              interaction.currentRotation,
          },
        },
      ]);
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

        data-desk-canvas
      >
        {items.map((item) => {
          const itemSize = item.size ?? 100;

          const isSelected = item.id === selectedId;

          return (
            <div
              key={item._key}

              onPointerDown={(event) => handleMovePointerDown(event, item)}

              onPointerMove={(event) => handlePointerMove(event, item)}

              onPointerUp={handlePointerUp}

              onPointerCancel={handlePointerUp}

              style={{
                position: 'absolute',

                left: item.position?.x ?? 0,
                top: item.position?.y ?? 0,

                width: itemSize,
                height: itemSize,

                transform: `translate(-50%, -50%) rotate(${item.rotation ?? 0}deg)`,

                cursor: isDragging ? 'grabbing' : 'grab',

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

              {isSelected && (
                <>
                  {/* Rotation handle */}
                  <div
                    onPointerDown={(event) =>
                      handleRotatePointerDown(event, item)
                    }
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: -28,

                      width: 12,
                      height: 12,

                      transform: 'translateX(-50%)',

                      border: '2px solid #2276fc',
                      borderRadius: '50%',
                      background: '#fff',

                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      touchAction: 'none',
                    }}
                  />

                  {/* Rotation stem */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: -16,

                      width: 2,
                      height: 16,

                      transform: 'translateX(-50%)',

                      background: '#2276fc',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Resize handle */}
                  <div
                    onPointerDown={(event) =>
                      handleResizePointerDown(event, item)
                    }
                    style={{
                      position: 'absolute',
                      right: -7,
                      bottom: -7,

                      width: 14,
                      height: 14,

                      border: '2px solid #2276fc',
                      background: '#fff',

                      cursor: 'nwse-resize',
                      boxSizing: 'border-box',
                      touchAction: 'none',
                    }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeskEditor;
