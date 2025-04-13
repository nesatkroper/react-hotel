import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import pic1 from "@/assets/images/banner/1.webp";
import pic2 from "@/assets/images/banner/2.webp";
import pic3 from "@/assets/images/banner/2.webp";
import pic4 from "@/assets/images/banner/4.webp";
import pic5 from "@/assets/images/banner/5.webp";
import pic6 from "@/assets/images/banner/6.webp";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const defaultItems = [
  { name: "pic1", src: pic1 },
  { name: "pic2", src: pic2 },
  { name: "pic3", src: pic3 },
  { name: "pic4", src: pic4 },
  { name: "pic5", src: pic5 },
  { name: "pic6", src: pic6 },
];

const getBasisClass = (split, slice) => {
  if (!split) return "";

  const basisMap = {
    0: "md:basis-1/2 lg:basis-1/3",
    1: "basis-full",
    2: "basis-1/2",
    3: "basis-1/3",
    4: "basis-1/4",
  };

  return basisMap[slice] || "basis-full";
};

const imageFadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const CarouselImage = ({
  items = defaultItems,
  loop = true,
  auto = true,
  delay = 3000,
  height = 400,
  split = false,
  slice = 2,
  className,
}) => {
  return (
    <Carousel
      className={`w-full min-w-[20rem] ${className}`}
      opts={{
        align: "start",
        loop: loop,
      }}
      plugins={
        auto
          ? [
              Autoplay({
                delay: delay,
              }),
            ]
          : []
      }>
      <CarouselContent>
        {items.map((m, index) => (
          <CarouselItem key={index} className={getBasisClass(split, slice)}>
            <motion.img
              src={m.src}
              alt={m.name}
              style={{ height: `${height}px` }}
              className={`w-full object-cover rounded-3xl`}
              loading='lazy'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              variants={imageFadeIn}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='hidden md:flex ms-3' />{" "}
      <CarouselNext className='hidden md:flex me-3' />
    </Carousel>
  );
};

CarouselImage.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      src: PropTypes.string,
    })
  ),
  loop: PropTypes.bool,
  auto: PropTypes.bool,
  delay: PropTypes.number,
  height: PropTypes.number,
  split: PropTypes.bool,
  slice: PropTypes.number,
  className: PropTypes.string,
};

export default CarouselImage;
