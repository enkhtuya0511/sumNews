import ImageSlider from "../slider/page.js";
import Navbar from "../../components/NavBar.jsx";
import Comment from "../../components/Comment.jsx";
import NewsClick from "../../components/newsClick.jsx";
import style from "./news.css";
export default function newsClick() {
  const images = [
    "https://www.factoriesinspace.com/img/img/dream-chaser.jpg",
    "https://www.sierraspace.com/wp-content/uploads/2022/05/hero-Sierra-Space-Dream-Chaser-Shooting-Star-web.jpg",
    "https://i0.wp.com/spacenews.com/wp-content/uploads/2024/03/Sierra-Space-Axelerator-Spectre-LEFT-and-Ghost-RIGHT-scaled.jpg?fit=1200%2C602&ssl=1",
    "https://i0.wp.com/spacenews.com/wp-content/uploads/2024/03/f9-crs30.jpg?w=2000&ssl=1",
  ];
  return (
    <div className="flex  bg-[#fff] items-center flex-col justify-center">
      <Navbar />
      <div className="bg-[#fff] max-w-[1288px] ">
        <ImageSlider images={images} />
        <NewsClick />
        <Comment />
      </div>
    </div>
  );
}
