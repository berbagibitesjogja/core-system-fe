import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "#/lib/utils";
import { Button } from "./button";

export interface CarouselApi {
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  selectedScrollSnap: () => number;
  scrollSnapList: () => number[];
}

interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement | null>;
  api: CarouselApi;
  selectedIndex: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  slideCount: number;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation?: "horizontal" | "vertical";
  loop?: boolean;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      setApi,
      autoPlay = false,
      autoPlayInterval = 5000,
      loop = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const carouselRef = React.useRef<HTMLDivElement | null>(null);
    const [slideCount, setSlideCount] = React.useState(0);
    // Saat loop aktif, posisi awal ada pada indeks 1 (slide riil pertama)
    const [currentIndex, setCurrentIndex] = React.useState(1);
    const [isAnimating, setIsAnimating] = React.useState(true);
    const [isPaused, setIsPaused] = React.useState(false);

    // Indeks slide logis aktif (0 s/d slideCount - 1) untuk dots dan eksternal
    const selectedIndex = React.useMemo(() => {
      if (slideCount <= 0) return 0;
      if (!loop) return Math.max(0, Math.min(currentIndex, slideCount - 1));
      return (currentIndex - 1 + slideCount) % slideCount;
    }, [currentIndex, slideCount, loop]);

    const canScrollPrev = loop ? true : currentIndex > 0;
    const canScrollNext = loop ? true : currentIndex < slideCount - 1;

    const scrollNext = React.useCallback(() => {
      if (slideCount <= 1) return;
      setIsAnimating(true);
      setCurrentIndex((prev) => prev + 1);
    }, [slideCount]);

    const scrollPrev = React.useCallback(() => {
      if (slideCount <= 1) return;
      setIsAnimating(true);
      setCurrentIndex((prev) => prev - 1);
    }, [slideCount]);

    const scrollTo = React.useCallback(
      (index: number) => {
        if (slideCount <= 0) return;
        setIsAnimating(true);
        if (loop) {
          const target = Math.max(0, Math.min(index, slideCount - 1));
          setCurrentIndex(target + 1);
        } else {
          setCurrentIndex(Math.max(0, Math.min(index, slideCount - 1)));
        }
      },
      [slideCount, loop],
    );

    const api: CarouselApi = React.useMemo(
      () => ({
        canScrollPrev: () => canScrollPrev,
        canScrollNext: () => canScrollNext,
        scrollPrev,
        scrollNext,
        scrollTo,
        selectedScrollSnap: () => selectedIndex,
        scrollSnapList: () => Array.from({ length: slideCount }, (_, i) => i),
      }),
      [
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
        scrollTo,
        selectedIndex,
        slideCount,
      ],
    );

    React.useEffect(() => {
      if (setApi) {
        setApi(api);
      }
    }, [api, setApi]);

    // Timer Auto Play (berjalan searah terus secara infinite)
    React.useEffect(() => {
      if (!autoPlay || slideCount <= 1 || isPaused) return;

      const timer = setInterval(() => {
        scrollNext();
      }, autoPlayInterval);

      return () => clearInterval(timer);
    }, [autoPlay, autoPlayInterval, slideCount, isPaused, scrollNext]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          selectedIndex,
          currentIndex,
          setCurrentIndex,
          isAnimating,
          setIsAnimating,
          slideCount,
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          orientation,
          loop,
        }}
      >
        <div
          ref={ref}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (
              React.isValidElement<{ onCountChange?: (c: number) => void }>(
                child,
              )
            ) {
              return React.cloneElement(child, {
                onCountChange: setSlideCount,
              });
            }
            return child;
          })}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

export interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onCountChange?: (count: number) => void;
}

export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  CarouselContentProps
>(({ className, children, onCountChange, ...props }, ref) => {
  const {
    selectedIndex,
    currentIndex,
    setCurrentIndex,
    isAnimating,
    setIsAnimating,
    orientation,
    scrollPrev,
    scrollNext,
    loop,
  } = useCarousel();

  const rawChildren = React.Children.toArray(children);
  const totalSlides = rawChildren.length;

  React.useEffect(() => {
    if (onCountChange) {
      onCountChange(totalSlides);
    }
  }, [totalSlides, onCountChange]);

  const isHorizontal = orientation === "horizontal";
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const shouldLoop = Boolean(loop && totalSlides > 1);

  // Duplikasi slide untuk ilusi loop infinite yang seamless
  const slides = React.useMemo(() => {
    if (!shouldLoop) return rawChildren;

    const first = rawChildren[0];
    const last = rawChildren[totalSlides - 1];

    const cloneLast = React.isValidElement(last)
      ? React.cloneElement(last, {
          key: "carousel-clone-last",
          "aria-hidden": "true",
          tabIndex: -1,
        } as React.HTMLAttributes<HTMLElement>)
      : last;

    const cloneFirst = React.isValidElement(first)
      ? React.cloneElement(first, {
          key: "carousel-clone-first",
          "aria-hidden": "true",
          tabIndex: -1,
        } as React.HTMLAttributes<HTMLElement>)
      : first;

    return [cloneLast, ...rawChildren, cloneFirst];
  }, [shouldLoop, rawChildren, totalSlides]);

  // State geser mouse / pointer drag
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  const isPointerDownRef = React.useRef(false);
  const startPosRef = React.useRef(0);
  const hasMovedRef = React.useRef(false);

  const activeTrackIndex = shouldLoop ? currentIndex : selectedIndex;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || totalSlides <= 1) return;

    // Jika sedang berada pada posisi clone sebelum reset transitionEnd, reset instan terlebih dahulu
    if (shouldLoop) {
      if (currentIndex >= totalSlides + 1) {
        setIsAnimating(false);
        setCurrentIndex(1);
      } else if (currentIndex <= 0) {
        setIsAnimating(false);
        setCurrentIndex(totalSlides);
      }
    }

    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    startPosRef.current = isHorizontal ? e.clientX : e.clientY;
    setDragOffset(0);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    const currentPos = isHorizontal ? e.clientX : e.clientY;
    let diff = currentPos - startPosRef.current;

    // Resistance hanya jika TIDAK loop
    if (!shouldLoop) {
      if (
        (selectedIndex === 0 && diff > 0) ||
        (selectedIndex === totalSlides - 1 && diff < 0)
      ) {
        diff *= 0.35;
      }
    }

    if (Math.abs(diff) > 4) {
      if (!isDragging) setIsDragging(true);
      hasMovedRef.current = true;
      setDragOffset(diff);
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore fallback
    }

    const currentPos = isHorizontal ? e.clientX : e.clientY;
    const diff = currentPos - startPosRef.current;
    const container = containerRef.current;
    const containerDimension = container
      ? isHorizontal
        ? container.offsetWidth
        : container.offsetHeight
      : 400;

    const threshold = Math.max(40, containerDimension * 0.12);

    if (diff < -threshold) {
      scrollNext();
    } else if (diff > threshold) {
      scrollPrev();
    }

    setIsDragging(false);
    setDragOffset(0);

    setTimeout(() => {
      hasMovedRef.current = false;
    }, 60);
  };

  // Callback saat transisi animasi selesai untuk reset posisi virtual clone
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== "transform") return;

    if (shouldLoop && totalSlides > 1) {
      if (currentIndex >= totalSlides + 1) {
        setIsAnimating(false);
        setCurrentIndex(1);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimating(true);
          });
        });
      } else if (currentIndex <= 0) {
        setIsAnimating(false);
        setCurrentIndex(totalSlides);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsAnimating(true);
          });
        });
      }
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={cn(
        "overflow-hidden size-full select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
      style={{
        touchAction: isHorizontal ? "pan-y" : "pan-x",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={handleClickCapture}
      onDragStart={(e) => e.preventDefault()}
      {...props}
    >
      <div
        className={cn(
          "flex size-full",
          isDragging || !isAnimating
            ? "transition-none"
            : "transition-transform duration-500 ease-out",
          isHorizontal ? "flex-row" : "flex-col",
          className,
        )}
        style={{
          transform: isHorizontal
            ? `translateX(calc(-${activeTrackIndex * 100}% + ${dragOffset}px))`
            : `translateY(calc(-${activeTrackIndex * 100}% + ${dragOffset}px))`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides}
      </div>
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full size-full overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "sm", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full p-0 z-20",
        orientation === "horizontal"
          ? "left-2 top-1/2 -translate-y-1/2"
          : "-top-10 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Slide sebelumnya"
      {...props}
    >
      <ArrowLeft className="size-4" />
      <span className="sr-only">Slide sebelumnya</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "sm", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8 rounded-full p-0 z-20",
        orientation === "horizontal"
          ? "right-2 top-1/2 -translate-y-1/2"
          : "-bottom-10 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Slide selanjutnya"
      {...props}
    >
      <ArrowRight className="size-4" />
      <span className="sr-only">Slide selanjutnya</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  activeClassName?: string;
  inactiveClassName?: string;
}

export function CarouselDots({
  className,
  activeClassName = "w-7 bg-bondi-700",
  inactiveClassName = "w-2 bg-bondi-200 hover:bg-bondi-300",
  ...props
}: CarouselDotsProps) {
  const { slideCount, selectedIndex, scrollTo } = useCarousel();

  if (slideCount <= 1) return null;

  return (
    <div
      className={cn("flex items-center justify-center gap-1.5 pt-2", className)}
      role="tablist"
      aria-label="Navigasi slide carousel"
      {...props}
    >
      {Array.from({ length: slideCount }).map((_, index) => {
        const isActive = index === selectedIndex;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Buka slide ${index + 1}`}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bondi-600",
              isActive ? activeClassName : inactiveClassName,
            )}
          />
        );
      })}
    </div>
  );
}
