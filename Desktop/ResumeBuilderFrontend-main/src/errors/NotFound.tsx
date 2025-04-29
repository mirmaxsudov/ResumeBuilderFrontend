import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <section className="not-found__section">
        <div className="container max-w-container mx-auto">
          <div className="not-found__wrapper h-[500px] flex justify-center items-center">
            <div>
              <h1 className="text-center text-[#FC4308] text-[192px] font-bold drop-shadow-[0_0_44px_rgba(252,67,8,0.6)]">
                404
              </h1>
              <p className="text-center not-found__inner-title mt-[30px]">
                OOPS! Page you're looking for doesn't exist. Please use search
                for help
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
