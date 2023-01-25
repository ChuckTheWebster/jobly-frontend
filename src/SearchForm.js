import React, { useState } from "react";

const DEFAULT_SEARCH_FORM_DATA = { searchTerm: '' };

/** Search Form
 *
 * - Props: search - function to search Jobs or Companies
 *
 * { CompaniesPage, JobsPage } -> SearchForm
*/

function SearchForm({ search }) {
  const [formData, setFormData] = useState(DEFAULT_SEARCH_FORM_DATA);

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData.searchTerm);
    setFormData(DEFAULT_SEARCH_FORM_DATA);
  }

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <input
        id="search"
        name="searchTerm"
        placeholder="Enter Search Term..."
        onChange={ handleChange }
        value={ formData.searchTerm }
        aria-label="Search Term"
      />
      <button>Search</button>
    </form>
  );
}

export default SearchForm;
