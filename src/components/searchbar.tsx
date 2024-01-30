import { useState, Dispatch, SetStateAction } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchLocation } from "@/api/location";
import { TLocationName } from "@/types/geocode";
import { useDebounce } from "use-debounce";

export default function Searchbar({
  setCoordinates,
}: {
  setCoordinates: Dispatch<SetStateAction<{ lat: number; lon: number }>>;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [location, setLocation] = useState("");
  const [debouncedLocation] = useDebounce(location, 500);

  const { data: locationData, isLoading } = useQuery({
    queryKey: [debouncedLocation],
    queryFn: () => fetchLocation(debouncedLocation),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  });

  return (
    <div
      className="min-w-[80%] w-96 max-w-full flex flex-col h-fit relative"
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (e.relatedTarget) return;
        setIsFocused(false);
      }}
    >
      <div className="flex items-center w-full relative h-10 sm:h-14">
        <label
          htmlFor="location-input"
          className="h-full flex items-center justify-center absolute w-10 sm:w-14"
          aria-label="Search for a location"
        >
          <Search className="w-[60%] h-[60%]" />
        </label>
        <Input
          id="location-input"
          className={
            "h-full pl-10 sm:pl-14 text-lg sm:text-2xl border-neutral-900/30 dark:border-neutral-100/30"
          }
          placeholder="Enter location, e.g. London"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      {location !== "" && isFocused && (
        <ul
          className="absolute top-full z-10 h-fit w-full rounded-b-lg border-2 bg-neutral-950"
          role="listbox"
          aria-labelledby="location-input"
        >
          {isLoading ? (
            <li className="p-4">Loading...</li>
          ) : locationData ? (
            locationData?.map((location: TLocationName) => (
              <li key={location.lat.toString()} tabIndex={-1}>
                <button
                  className="w-full h-full px-4 py-3 text-left hover:text-neutral-50 hover:bg-neutral-600 hover:dark:bg-neutral-700"
                  onClick={() => {
                    if (location.state === undefined) {
                      setLocation(location.name + ", " + location.country);
                    } else {
                      setLocation(
                        location.name +
                          ", " +
                          location.state +
                          ", " +
                          location.country
                      );
                    }
                    setCoordinates({ lat: location.lat, lon: location.lon });
                  }}
                  tabIndex={0}
                  role="option"
                >
                  {location.name}
                  {location?.state && ", " + location.state}, {location.country}
                </button>
              </li>
            ))
          ) : (
            <li className="p-4">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
