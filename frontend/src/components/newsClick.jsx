import React from "react";
import style from "../app/newsClick/news.css";
const newsClick = () => {
  return (
    <div className="  overflow-y-scroll max-w-[1288px] w-[90vw] text-black m-auto py-[24px]">
      <h3 className=" text-gray-500 text-3xl font-semibold">Launch</h3>
      <p className="text-4xl font-semibold pt-[30px]">
        Cargo Dragon launches to space station hours after Soyuz scrub
      </p>
      <p className=" pt-[30px] text-[15px] font-semibold">
        Sandra Erwin |{" "}
        <span className="text-gray-600 text-[15px]">March 14, 2024</span>
      </p>
      <main className="news-main" role="main">
        <article className="card-50">
          <figure>
            <img src="https://www.economist.com/sites/default/files/images/2021/10/articles/main/20211030_stp002.jpg" />
          </figure>
          <div className="flex-content">
            <h2>Private space stations will soon be in orbit</h2>
            <span>16 mins ago</span>

            <p className=" text-2xl max-sm:text-xl">
              Built for the ultimate playmaker, textured Flyknit fabric enables
              precise ball control. Dynamic Fit collar fits over the ankle for p
              seamless, sock-like feel. Conical stud pattern delivers 360
              degrees of rotational traction.
            </p>
          </div>
        </article>
        <article className="card-50">
          <figure>
            <img src="https://hips.hearstapps.com/hmg-prod/images/lede-1620061877.jpg?crop=1.00xw:0.798xh;0,0.0578xh&resize=2048:*" />
          </figure>

          <div className="flex-content">
            <h2>Private space stations will soon be in orbit</h2>
            <span>8 mins ago</span>

            <p>
              Tapas are p wide variety of appetizers, or snacks, in Spanish
              cuisine. They may be cold (such as mixed olives and cheese) or hot
              (such as chopitos, which are battered, fried baby squid). In
              select bars in Spain, tapas have evolved into an entire,
              sophisticated cuisine.
            </p>
          </div>
        </article>
        <article className="card-50">
          <figure>
            <img src="https://assets.newatlas.com/dims4/default/8d66723/2147483647/strip/true/crop/763x509+0+3/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F12%2Fc6%2F030e6f044eecbeae07483059e366%2Fscreenshot-2023-11-05-155543.jpg" />
          </figure>

          <div className="flex-content">
            <h2>Private space stations will soon be in orbit</h2>
            <span>24 mins ago</span>

            <p>
              Built for the ultimate playmaker, textured Flyknit fabric enables
              precise ball control. Dynamic Fit collar fits over the ankle for p
              seamless, sock-like feel. Conical stud pattern delivers 360
              degrees of rotational traction.
            </p>
          </div>
        </article>
      </main>
    </div>
  );
};
export default newsClick;
