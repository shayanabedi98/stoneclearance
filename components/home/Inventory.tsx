"use client";

import { inventoryList } from "@/data";
import Image from "next/image";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

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
              setClickedStone(true);
              setClickedStoneIndex(index);
            }}
            className="relative flex h-80 w-full cursor-pointer rounded-md transition lg:hover:scale-[1.02]"
            key={index}
          >
            <Image
              className="h-full w-full rounded-md object-cover"
              src={stone.imgUrl}
              alt={stone.description}
              width={500}
              height={450}
            />
            <p className="absolute bottom-0 left-0 justify-center rounded-bl-md bg-primary px-2 py-1 font-bold text-bg">
              {stone.name}
            </p>
            <p className="absolute bottom-0 right-0 justify-center rounded-br-md bg-primary px-2 py-1 font-bold text-bg">
              {stone.contact.city}
            </p>
          </div>
        ))}{" "}
        {clickedStone && (
          <div className="fixed bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-black bg-opacity-40 text-bg">
            <div className="relative flex h-[500px] w-[400px] flex-col items-center justify-between rounded-md bg-bg p-2 text-primary">
              <IoMdClose
                onClick={() => setClickedStone(false)}
                className="absolute right-1 top-1 cursor-pointer rounded-full bg-primary p-1 text-3xl text-bg"
              />
              <Image
                className="h-64 w-full self-start border-2 border-primary object-cover"
                src={inventoryList[clickedStoneIndex].imgUrl}
                alt=""
                width={500}
                height={500}
              />
              <div className="self-start">
                <p>
                  <span className="inventory-title-span">Name:</span>{" "}
                  {inventoryList[clickedStoneIndex].name}
                </p>
                <p>
                  <span className="inventory-title-span">Type:</span>{" "}
                  {inventoryList[clickedStoneIndex].type}
                </p>
                <p>
                  <span className="inventory-title-span">Dimensions:</span>{" "}
                  {inventoryList[clickedStoneIndex].width}in x{" "}
                  {inventoryList[clickedStoneIndex].height}in x{" "}
                  {inventoryList[clickedStoneIndex].thickness}in
                </p>
                <div className="flex gap-1">
                  <span className="inventory-title-span">Price:</span>
                  <p className="flex gap-1">
                    {inventoryList[clickedStoneIndex].price.map(
                      (i, spanIndex) => (
                        <span
                          className={`${inventoryList[clickedStoneIndex].price.length > 0 ? spanIndex !== inventoryList[clickedStoneIndex].price.length - 1 && "text-neutral line-through" : ""}`}
                          key={spanIndex}
                        >
                          ${i}
                        </span>
                      ),
                    )}
                  </p>
                </div>
                <ul className="">
                  <span className="inventory-title-span">Contact Info</span>
                  <li>{inventoryList[clickedStoneIndex].contact.name}</li>
                  <li>{inventoryList[clickedStoneIndex].contact.tel}</li>
                  <li>{inventoryList[clickedStoneIndex].contact.city}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
