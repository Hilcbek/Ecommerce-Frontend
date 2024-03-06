import React, { useEffect, useState } from "react";
import Product from "./Product";
import { baseUrl } from "../../libs/op";
import ClipLoader from "react-spinners/ClipLoader";
import PuffLoader from "react-spinners/PuffLoader";
const Products = ({ bool, filtered }) => {
  let [products, setProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [limit, setLimit] = useState(4);
  let [page, setPage] = useState(1);
  useEffect(() => {
    let Fetch = () => {
      setLoading(true);
      baseUrl
        .get(`/product/load/get-Product?page=${page}&limit=${limit}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => setProducts([...products, ...data.data]))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };
    Fetch();
  }, [page]);
  let handlePage = () => {
    setPage(page + 1);
  };
  return (
    <div
      className={`${
        bool && "xs:px-4 sm:px-8 md:px-14 lg:px-20 xl:28"
      } flex items-center justify-center flex-col w-full`}
    >
      {bool && (
        <h1 className="text-2xl font-Roboto tracking-widest my-4 before:absolute before:-left-10 before:-bottom-2 before:w-9/12 before:h-1 before:bg-black before:content-[''] after:absolute after:left-8 after:-bottom-4 after:w-10/12 after:h-1 after:bg-black after:content-[''] relative">
          ALL ITEMS
        </h1>
      )}
      <div
        className={`${
          loading ? "flex items-center justify-center" : "grid"
        } w-full xs:grid-cols-1 py-2  md:min-h-[70vh] md:h-[70vh] md:grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 ${
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
      <button
        onClick={() => handlePage()}
        disabled={loading}
        className={`${
          loading ? "bg-gray-200" : "bg-transparent"
        } border-black p-3 flex active:scale-[.96] transition-all ease-linear duration-150 cursor-pointer items-center justify-center gap-2 border-solid border-[1px] tracking-wide px-6 font-medium font-Roboto mt-5`}
      >
        {loading && (
          <ClipLoader
            color={"#000"}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        {loading ? "Loading" : "Load more"}
      </button>
    </div>
  );
};

export default Products;
