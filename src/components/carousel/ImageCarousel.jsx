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
                  src={`http://localhost:8000/storage/slider/image/${img.path}`}
                  alt={`${index} slide`}
                />
              </Carousel.Item>
            );
          })}
      </Carousel>

  );
};

export default ImageCarousel;
