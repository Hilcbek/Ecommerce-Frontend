import React, { useEffect, useState } from "react";
import Product from "./Product";
import { baseUrl } from "../../libs/op";
import PuffLoader from "react-spinners/PuffLoader";
const Products = ({ bool, filtered }) => {
  let [products, setProducts] = useState(null);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    let Fetch = () => {
      setLoading(true);
      baseUrl
        .get(`/product`)
        .then((res) => {
          return res.data;
        })
        .then((data) => setProducts(data.data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };
    Fetch();
  }, []);
  return (
    <div
      className={`${
        bool && "xs:px-4 sm:px-8 md:px-14 lg:px-20 xl:28"
      } flex items-center justify-center flex-col w-full`}
    >
      {bool && (
        <h1 className="text-5xl font-extralight font-Roboto tracking-widest my-4 before:absolute before:-left-20 before:bottom-0 before:w-9/12 before:h-1 before:bg-black before:content-[''] after:absolute after:left-12 after:-bottom-4 after:w-10/12 after:h-1 after:bg-black after:content-[''] relative">
          ALL ITEMS
        </h1>
      )}
      <div
        className={`w-full grid xs:grid-cols-1 py-2 md:grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 ${
          !bool && "xl:grid-cols-4"
        }`}
      >
        {loading ? (
          <PuffLoader
            color={"#000"}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          (filtered || products)?.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
