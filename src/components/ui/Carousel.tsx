"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CarouselProps {
  slides: React.ReactNode[];
  autoplay?: boolean;
  loop?: boolean;
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  className?: string;
}

export default function Carousel({
  slides,
  autoplay = false,
  loop = false,
  slidesPerView = 1,
  spaceBetween = 24,
  className = "",
}: CarouselProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      autoplay={autoplay ? { delay: 5000, disableOnInteraction: false } : false}
      pagination={{ clickable: true }}
      navigation
      className={`w-full ${className}`}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
