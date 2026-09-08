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

const DeskPreview: UserViewComponent = ({ document }) => {
  const desk = document.displayed;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const size = desk?.size as
    | {
        width?: number;
        height?: number;
      }
    | undefined;

  const deskWidth = size?.width ?? 1280;
  const deskHeight = size?.height ?? 720;

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

    return () => observer.disconnect();
  }, [deskWidth, deskHeight]);

  if (!desk) {
    return <div>No desk data.</div>;
  }

  const deskItems = (desk.deskItems ?? []) as Array<{
    id?: string;
    icon?: SanityImageSource;
    imageAlt?: string;

    position?: {
      x?: number;
      y?: number;
    };

    size?: number;
    rotation?: number;
  }>;

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
        {deskItems.map((item) => {
          const itemSize = item.size ?? 100;

          return (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                left: item.position?.x ?? 0,
                top: item.position?.y ?? 0,
                width: itemSize,
                height: itemSize,
                transform: `rotate(${item.rotation ?? 0}deg) translate(-50%, -50%)`,
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
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
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

export default DeskPreview;
