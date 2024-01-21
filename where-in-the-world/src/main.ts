import "./styles.css";
import { type FetchError, xmlGetCountries } from "./api/xml-get-countries";
import { elements } from "./utils/elements";
import { setFetchState } from "./utils/set-fetch-state";
import { renderCountries } from "./utils/render-countries";

elements.form.onsubmit = (e) => {
  e.preventDefault();

  const input = elements.searchInput.value.trim();
  setFetchState({
    state: "pending",
  });
  xmlGetCountries(input)
    .then((countries) => {
      setFetchState({
        state: "success",
      });
      renderCountries(countries);
    })
    .catch((error: FetchError) => {
      setFetchState({
        state: "error",
        error,
      });
    });
};
