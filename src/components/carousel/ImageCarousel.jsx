import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./imageCarousel.css"

const ImageCarousel = ({slider}) => {
 
  return (

      <Carousel >
        {slider &&
          slider.map((img, index) => {
            return (
              <Carousel.Item key={img.id}>
                <img
                  className="CarouselImage"
                  src={`https://behpack.com/backend/storage/public/slider/image/${img.path}`}
                  alt={`${index} slide`}
                />
              </Carousel.Item>
            );
          })}
      </Carousel>

  );
};

export default ImageCarousel;
