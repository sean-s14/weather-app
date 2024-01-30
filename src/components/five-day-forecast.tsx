import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { fetchFiveDayForecast } from "@/api/fiveDayForecast";
import { useQuery } from "@tanstack/react-query";
import {
  kelvinToCelsius,
  getDailyAverage,
  DailyAverage,
} from "@/lib/temperature";
import { getDayOfWeek } from "@/lib/dates";

function DayForecast({ day }: { day: DailyAverage }) {
  const dayOfWeek = getDayOfWeek(day.dt_txt);
  const max_temp = day?.max_temp && kelvinToCelsius(day.max_temp).toFixed(1);
  const min_temp = day?.min_temp && kelvinToCelsius(day.min_temp).toFixed(1);

  return (
    <Card>
      <CardContent className="px-4 py-3 flex flex-col items-center justify-center">
        {/* Day of the week */}
        <div>{dayOfWeek}</div>

        {/* Icon */}
        <div className="w-16 h-16">
          <img
            className="w-full h-full"
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
          />
        </div>

        {/* Highest and lowest temperatures */}
        <div className="flex gap-2">
          <span
            className="font-bold"
            tabIndex={0}
            aria-label={`Maximum temperature for ${dayOfWeek} is ${max_temp} degrees Celcius`}
          >
            {max_temp}°
          </span>
          <span
            className=""
            tabIndex={0}
            aria-label={`Minimum temperature for ${dayOfWeek} is ${min_temp} degrees celcius`}
          >
            {min_temp}°
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

const screenWidths = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const slidesToScroll = (screenWidth: number) => {
  if (screenWidth < screenWidths.sm) return 1;
  if (screenWidth < screenWidths.md) return 2;
  if (screenWidth < screenWidths.lg) return 3;
  if (screenWidth < screenWidths.xl) return 4;
  return 5;
};

export default function FiveDayForecast({
  coordinates,
}: {
  coordinates: { lat: number; lon: number };
}) {
  const { data: forecastData, isLoading } = useQuery({
    queryKey: [coordinates],
    queryFn: () => fetchFiveDayForecast(coordinates),
    staleTime: 1000 * 60 * 60 * 3, // 3 hours
  });

  return (
    <Carousel
      id="five-day-forecast-carousel"
      className="w-full max-w-60 xs:max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl"
      opts={{
        align: "start",
        slidesToScroll: slidesToScroll(window.innerWidth),
      }}
    >
      <CarouselContent>
        {isLoading ? (
          <CarouselItem tabIndex={0} aria-label="Loading weather forecasts">
            <div className="flex items-center justify-center h-full">
              Loading...
            </div>
          </CarouselItem>
        ) : forecastData && forecastData?.list ? (
          getDailyAverage(forecastData?.list)?.map(
            (dailyAverage: DailyAverage, index: number) => (
              <CarouselItem
                key={getDayOfWeek(dailyAverage.dt_txt)}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
                tabIndex={0}
                aria-label={`Weather forecast for ${getDayOfWeek(
                  dailyAverage.dt_txt
                )}`}
                aria-roledescription={`Slide ${index + 1} of ${
                  getDailyAverage(forecastData?.list).length
                }`}
              >
                <DayForecast day={dailyAverage} />
              </CarouselItem>
            )
          )
        ) : (
          <CarouselItem tabIndex={0}>
            <div className="flex items-center justify-center h-full">
              No data available
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="xl:hidden" />
      <CarouselNext className="xl:hidden" />
    </Carousel>
  );
}
