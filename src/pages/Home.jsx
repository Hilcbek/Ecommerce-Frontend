import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Slider from "../components/Slider";
import { Categories } from "../components/Categories";
import Products from "../components/Products";
import NewSletter from "../components/NewSletter";
import Footer from "../components/Footer";
import { baseUrl } from "../../libs/op";
import PuffLoader from "react-spinners/PuffLoader";
import { useDispatch } from 'react-redux'
import { DisableTheSuccessPage } from "../../Toolkit/ProductSlice";
const Home = () => {
  let [scroll, setScroll] = useState(0);
  let [loading, setLoading] = useState(false);
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(DisableTheSuccessPage({}))
  },[])
  let handleScroll = (sign) => {
    if (sign === "+") {
      if (scroll < products?.length - 1) {
        setScroll((prev) => prev + 1);
      } else {
        setScroll(0);
      }
    } else {
      if (scroll > 0) {
        setScroll((prev) => prev - 1);
      } else {
        setScroll(3);
      }
    }
  };
  let [products, setProducts] = useState(null);
  useEffect(() => {
    let Fetch = async () => {
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
    <div className="w-full h-auto pt-24 lg:min-h-screen lg:h-screen">
      <div
        className={`${
          loading ? "items-center justify-center" : "items-start justify-start"
        } flex relative overflow-x-hidden h-full w-full`}
      >
        <button
          onClick={() => handleScroll("-")}
          className="absolute z-[999] bg-black text-white lg:text-black lg:bg-gray-100 active:border-gray-400 top-[24%] lg:top-[40%] left-1 w-10 active:scale-[.95] transition duration-300 ease-in-out border-solid border-[1px] border-[#EAEEEF] h-10 flex items-center justify-center rounded-full"
        >
          <IoIosArrowBack size={16} />
        </button>
        {loading ? (
          <PuffLoader
            color={"#000"}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          products?.map((product) => (
            <Slider scroll={scroll} key={product._id} product={product} />
          ))
        )}
        <button
          onClick={() => handleScroll("+")}
          className="absolute z-[999] bg-black text-white lg:text-black lg:bg-gray-100 active:border-gray-400 top-[24%] lg:top-[40%] right-1 w-10 active:scale-[.95] transition duration-300 ease-in-out border-solid border-[1px] border-[#EAEEEF] h-10 flex items-center justify-center rounded-full"
        >
          <IoIosArrowForward size={16} />
        </button>
      </div>
      <Categories />
      <Products bool={true} />
      <NewSletter />
      <Footer />
    </div>
  );
};

export default Home;
