"use client";

import { inventoryList } from "@/data";
import Image from "next/image";
import { useState } from "react";

export default function Inventory() {
  const [clickedStone, setClickedStone] = useState(false);
  const [clickedStoneIndex, setClickedStoneIndex] = useState(0);
  return (
    <div className="container-margin">
      <div></div>
      <div className="grid grid-cols-3 gap-10">
        {inventoryList.map((stone, index) => (
          <div
            onClick={() => {
              setClickedStone(
                index == clickedStoneIndex ? !clickedStone : true,
              );
              setClickedStoneIndex(index);
            }}
            className="relative flex h-80 w-full cursor-pointer rounded-md transition lg:hover:scale-[1.02]"
            key={index}
          >
            <Image
              className="absolute h-full w-full rounded-md object-cover"
              src={stone.imgUrl}
              alt={stone.description}
              width={500}
              height={450}
            />
            {clickedStone && clickedStoneIndex == index && (
              <div className="relative z-10 grid items-center h-full w-full grid-rows-2 rounded-md bg-primary bg-opacity-75 p-2 text-bg">
                <div>
                  <p>
                    <span className="inventory-title-span">Name:</span>{" "}
                    {stone.name}
                  </p>
                  <p>
                    <span className="inventory-title-span">Type:</span>{" "}
                    {stone.type}
                  </p>
                  <p>
                    <span className="inventory-title-span">Dimensions:</span>{" "}
                    {stone.width}in x {stone.height}in x {stone.thickness}in
                  </p>
                  <div className="flex gap-1">
                    <span className="inventory-title-span">Price:</span>
                    <p className="flex gap-1">
                      {stone.price.map((i, spanIndex) => (
                        <span
                          className={`${stone.price.length > 0 ? spanIndex !== stone.price.length - 1 && "text-zinc-400 line-through" : ""}`}
                          key={spanIndex}
                        >
                          ${i}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                <ul className="">
                  <span className="inventory-title-span">Contact Info</span>
                  <li>{stone.contact.name}</li>
                  <li>{stone.contact.tel}</li>
                  <li>{stone.contact.city}</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
