
import React, { useContext } from "react";
import { Ecomerce } from "../../../context/context";
import { FaSearch, FaShoppingCart, FaStar } from "react-icons/fa";
import "./Search.css";

const Search = () => {
  const { search, data,handleClick } = useContext(Ecomerce);


  return (
    <div className="search-page">

      {/* Search Heading */}
      <div className="search-header">
        <div className="search-title">
          <FaSearch />
          <div>
            <h1>Search Results</h1>
            <p>
              Results for <strong>"{search}"</strong>
            </p>
          </div>
        </div>

        {data?.length > 0 && (
          <span className="result-count">
            {data.length} {data.length === 1 ? "product" : "products"} found
          </span>
        )}
      </div>

      {/* Products */}
      {data?.length > 0 ? (
        <div className="search-products">

          {data.map((item) => (
            <div className="search-card" key={item._id}>

              {/* Product Image */}
              <div className="search-image">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              {/* Product Info */}
              <div className="search-info">

                <h2>{item.name}</h2>

                <p className="search-description">
                  {item.description}
                </p>

                <div className="search-bottom">

                  <div>
                    <p className="search-price">
                      Rs {item.price}
                    </p>

                    <div className="search-rating">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>

                  <button className="cart-btn">
                    <FaShoppingCart onClick={()=>handleClick(item._id)} />
                    Add
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      ) : (
        /* No Result */
        <div className="no-result">
          <FaSearch />
          <h2>No products found</h2>
          <p>
            We couldn't find anything for "{search}"
          </p>
          <span>
            Try searching with another product name.
          </span>
        </div>
      )}

    </div>
  );
};

export default Search;

