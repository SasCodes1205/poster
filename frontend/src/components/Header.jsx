import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex justify-around ">
        <div className="xl:block lg:hidden md:hidden:sm:hidden ">
           <div className="w-full">
      <h1 className="text-[4rem] ml-[20rem] font-bold " style={{color:"#67675f "}}>SHOP OUR LATEST PRODUCTS</h1>
    </div>
          <div className="grid grid-cols-2">
            

           
            {data.map((product) => (
              <div key={product._id}>
                
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
