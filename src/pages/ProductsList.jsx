import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import FadeLoader from "react-spinners/FadeLoader";
import { IoReload } from "react-icons/io5";
import Product from "../components/Product";
import { baseUrl } from "../../libs/op";
let Filter = [
  {
    Header: "Category",
    children: ["All", "Sneaker", "Shoe", "Clothes", "Hoodie", "Sweater", "Bag"],
  },
  {
    Header: "Price",
    children: ["$0 - $50", "$50 - $100", "$100 - $150", "Over $150"],
  },
  {
    Header: "Colors",
    children: ["red", "black", "blue", "green", "white"],
  },
];
const ProductsList = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000000");
  let [checked, setChecked] = useState({
    Category: "",
    Price: "",
    Colors: "",
  });
  let [value, setValue] = useState("");
  let handleCheckBox = (e, header) => {
    const { name, value } = e.target;
    setChecked((prevState) => ({
      ...prevState,
      [header]: checked ? name : null,
    }));
  };
  let [products, setProducts] = useState(null);
  useEffect(() => {
    let Fetch = async () => {
      setLoading(true);
      baseUrl.get(`/product`)
        .then((response) => {
          return response.data
        })
        .then((data) => {
          setProducts(data.data);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setLoading(false);
        });
    };
    Fetch();
  }, []);
  let handleReload = () => {
    setChecked({});
  };
  return (
    <div className="md:px-10 px-2 pt-14 w-full flex items-start justify-start flex-col">
      <div className="w-full h-full my-3 md:gap-5 items-start justify-start flex-col ">
        {value && (
          <h1 className="text-5xl  font-semibold font-Roboto my-3">
            Search result for : " <span className="italic">{value}</span> "
          </h1>
        )}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="search"
          placeholder="Search here..."
          className="p-3 w-full border-solid border-gray-200 shadow-sm rounded-xl border-[1px] outline-none"
        />
      </div>
      <div className="flex gap-4 items-start justify-between w-full">
        <div className="sticky top-5 max-w-[calc(100%-60%)] w-[calc(100%-55%)] md:max-w-[calc(100%-85%)] md:w-[calc(100%-85%)] p-3 font-Roboto border-solid border-[1px] border-gray-200 rounded-md flex items-start justify-start flex-col gap-5">
          <div
            onClick={handleReload}
            className="w-8 absolute right-0 md:right-3 active:scale-[.96] transition-all ease-linear duration-200 border-solid border-[1px] border-gray-200 h-8 rounded-full flex items-center justify-center bg-gray-100 cursor-pointer"
          >
            <IoReload />
          </div>
          {Filter.map((filter, idx) => (
            <div
              key={idx}
              className="flex items-start relative justify-start flex-col gap-1"
            >
              <h1 className="md:text-2xl underline font-medium mb-3">
                {filter.Header}
              </h1>
              {filter.children.map((ch, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-start gap-2"
                >
                  <input
                    type="radio"
                    id={ch}
                    name={ch}
                    value={ch}
                    onChange={(e) => handleCheckBox(e, filter.Header)}
                    checked={checked[filter.Header] === ch}
                  />{" "}
                  <label
                    htmlFor={ch}
                    className="text-sm font-Quicksand font-normal"
                  >
                    {ch}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          className={`${
            loading
              ? "flex items-center justify-center"
              : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          } gap-2 md:w-[calc(100%-200px)] md:max-w-[calc(100%-400px)`}
        >
          {loading ? (
            <FadeLoader
              color={color}
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : products?.length > 0 ? (
            products?.map((product, idx) => {
              if (value === "") {
                return <Product key={idx} product={product} />;
              } else if (
                product.title
                  .toLocaleLowerCase()
                  .indexOf(value.toLocaleLowerCase()) !== -1
              ) {
                return <Product key={idx} product={product} />;
              }
            })
          ) : (
            <h1 className="text-2xl mt-10 font-medium">No Result!</h1>
          )}
        </div>
      </div>
    </div>
  );
};
/** */
export default ProductsList;
/**<div className="flex items-center justify-between w-full mb-2">
          <div className="flex items-center justify-start gap-4">
            <h1>Filter product:</h1>
            <select
              name=""
              id=""
              className={
                "p-2 rounded-sm border-solid border-[1px] border-gray-300 outline-none px-3 cursor-pointer"
              }
            >
              <option
                className="cursor-pointer text-xl font-light"
                value="blue"
              >
                Blue
              </option>
              <option
                className="cursor-pointer text-xl font-light"
                value="yellow"
              >
                Yellow
              </option>
              <option
                className="cursor-pointer text-xl font-light"
                value="green"
              >
                Green
              </option>
              <option
                className="cursor-pointer text-xl font-light"
                value="black"
              >
                Black
              </option>
              <option className="cursor-pointer text-xl font-light" value="red">
                Red
              </option>
            </select>
            <select
              name=""
              id=""
              className={
                "p-2 rounded-sm border-solid border-[1px] border-gray-300 outline-none px-3 cursor-pointer"
              }
            >
              <option className="cursor-pointer text-xl font-light" value="M">
                M
              </option>
              <option className="cursor-pointer text-xl font-light" value="S">
                S
              </option>
              <option className="cursor-pointer text-xl font-light" value="XL">
                XL
              </option>
              <option
                className="cursor-pointer text-xl font-light"
                value="X-XL"
              >
                X-XL
              </option>
              <option className="cursor-pointer text-xl font-light" value="S">
                S
              </option>
            </select>
          </div>
          <div className="flex items-center justify-start gap-3">
            <h1>Sort Products:</h1>
            <select
              name=""
              id=""
              className={
                "p-2 rounded-sm border-solid border-[1px] border-gray-300 outline-none px-3 cursor-pointer"
              }
            >
              <option
                className="cursor-pointer text-xl font-light"
                value="Newest"
              >
                Newest
              </option>
              <option className="cursor-pointer text-xl font-light" value="asc">
                Price(asc)
              </option>
              <option
                className="cursor-pointer text-xl font-light"
                value="desc"
              >
                Price(desc)
              </option>
            </select>
          </div>
        </div> */
