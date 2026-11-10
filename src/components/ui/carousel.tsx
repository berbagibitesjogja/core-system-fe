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
  slideCount: number;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation?: "horizontal" | "vertical";
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
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      setApi,
      autoPlay = false,
      autoPlayInterval = 5000,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const carouselRef = React.useRef<HTMLDivElement | null>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [slideCount, setSlideCount] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(false);

    const canScrollPrev = selectedIndex > 0;
    const canScrollNext = selectedIndex < slideCount - 1;

    const scrollTo = React.useCallback(
      (index: number) => {
        if (slideCount <= 0) return;
        const target = Math.max(0, Math.min(index, slideCount - 1));
        setSelectedIndex(target);
      },
      [slideCount],
    );

    const scrollPrev = React.useCallback(() => {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : slideCount - 1));
    }, [slideCount]);

    const scrollNext = React.useCallback(() => {
      setSelectedIndex((prev) => (prev < slideCount - 1 ? prev + 1 : 0));
    }, [slideCount]);

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

    // Auto Play Timer
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
          slideCount,
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          orientation,
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
  const { selectedIndex, orientation } = useCarousel();
  const count = React.Children.count(children);

  React.useEffect(() => {
    if (onCountChange) {
      onCountChange(count);
    }
  }, [count, onCountChange]);

  const isHorizontal = orientation === "horizontal";

  return (
    <div ref={ref} className="overflow-hidden size-full">
      <div
        className={cn(
          "flex transition-transform duration-500 ease-out size-full",
          isHorizontal ? "flex-row" : "flex-col",
          className,
        )}
        style={{
          transform: isHorizontal
            ? `translateX(-${selectedIndex * 100}%)`
            : `translateY(-${selectedIndex * 100}%)`,
        }}
        {...props}
      >
        {children}
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
      className={cn("min-w-0 shrink-0 grow-0 basis-full size-full", className)}
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
