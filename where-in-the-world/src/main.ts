import "./styles.css";
import { elements } from "./utils/elements";
import { countries, initializeLocalStorage } from "./storage/countries";
import { renderCountries } from "./utils/render-countries";

void initializeLocalStorage();

elements.form.onsubmit = async (e) => {
  e.preventDefault();

  const input = elements.searchInput.value.trim().toLowerCase();

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(input)
  );

  renderCountries(filteredCountries);

  // setFetchState({
  //   state: "pending",
  // });
  // try {
  //   const countries = await api.getCountriesByName(input);
  //   renderCountries(countries);
  //   setFetchState({
  //     state: "success",
  //   });
  // } catch (error: unknown) {
  //   if (error instanceof Error) {
  //     setFetchState({
  //       state: "error",
  //       error,
  //     });
  //   } else {
  //     setFetchState({
  //       state: "error",
  //       error: new Error("Something went wrong!"),
  //     });
  //   }
  // }
};
