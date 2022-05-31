import "../Styles/Banner.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        interval={3000}
      >
        <div>
          <img
            loading="lazy"
            // src="https://khodeco.com/public/uploads/all/XGuYevcmMY9inIlZa0DK5BhTK9EYCCOYNxmytsNy.jpg"
            // src="https://i.pinimg.com/originals/7a/25/17/7a25176f434f9a130f2995ed2eb4f2e9.jpg"
            src="https://i.pinimg.com/originals/fd/0c/84/fd0c84b99f9e6c21e67773552794e8fb.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://img.freepik.com/free-vector/promotion-fashion-banner_1188-223.jpg?w=2000"
            alt=""
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/clothing-store-banner-design-template-e7332aaf6402c88cb4623bf8eb6f97e2_screen.jpg?ts=1620867237"
            alt=""
          />
        </div>
      </Carousel>
      <div className="mens_item">
        <div className="mens">
          <img
            // loading="lazy"
            src="https://assetscdn1.paytm.com/images/catalog/view_item/787364/1617369686163.jpg?imwidth=480&impolicy=hq
              "
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
