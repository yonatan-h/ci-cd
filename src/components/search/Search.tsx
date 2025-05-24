import { CitySearchType, getCities } from "@/api/APICalls";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

import SearchResult from "./SearchResult";
type SearchProps = {
  latitude: number;
  longitude: number;
  onClickResultHandler: (item: CitySearchType) => void;
};

export default function Search({
  latitude = 10,
  longitude = 10,
  onClickResultHandler,
}: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CitySearchType[]>([]);
  const [selectedResult, setSelectedResult] = useState<CitySearchType>(
    {} as CitySearchType
  );
  const [loading, setIsLoading] = useState(false);
  const countRef = useRef(0);

  const getSearchData = async () => {
    countRef.current++;
    const count = countRef.current;
    setSearchResult([]);
    setSelectedResult({} as CitySearchType);
    try {
      setIsLoading(true);
      const result = await getCities(searchValue);
      if (count === countRef.current) {
        setSearchResult(result);
      }
    } catch (e) {
      if (count === countRef.current) {
        alert("There was an error getting cities. Please try again.");
      }
    } finally {
      if (count === countRef.current) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setSelectedResult({} as CitySearchType);
    if (searchValue.length >= 3) {
      getSearchData();
    }
  }, [searchValue]);

  return (
    <div className="flex flex-col justify-center mb-10 mt-6 gap-2 mx-10 md:flex-row">
      <div className="flex flex-col">
        <label className="text-xs text-foregroundColor font-bold mb-1 flex gap-3">
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
          Search City
        </label>
        <div className="relative flex items-center">
          <input
            className="rounded-md outline-none p-2 text-sm placeholder:text-xs"
            placeholder="Input City - Min 3 Characters"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue.length >= 3 && (
            <button
              className="absolute right-2"
              onClick={() => {
                getSearchData();
              }}
            >
              <CiSearch />
            </button>
          )}
        </div>
        <div>
          <SearchResult
            searchResult={searchResult}
            onClickResultHandler={(item: CitySearchType) => {
              setSearchResult([]);
              setSelectedResult(item);
              onClickResultHandler(item);
            }}
          />

          {searchResult.length === 0 &&
            !loading &&
            searchValue.length >= 3 &&
            !selectedResult?.id && <p>No search results</p>}
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-foregroundColor font-bold mb-1">
          Latitude
        </label>
        <input
          className="rounded-md outline-none p-2 text-sm"
          defaultValue={`${
            Object.keys(selectedResult).length > 0
              ? selectedResult.latitude
              : latitude
          }`}
          disabled
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-foregroundColor font-bold mb-1">
          Longitude
        </label>
        <input
          className="rounded-md outline-none p-2 text-sm"
          defaultValue={`${
            Object.keys(selectedResult).length > 0
              ? selectedResult.longitude
              : longitude
          }`}
          disabled
        />
      </div>
    </div>
  );
}
