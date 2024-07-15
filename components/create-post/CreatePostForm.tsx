"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/types/general";

export default function CreatePostForm() {
  const path = usePathname();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const stoneTypes = [
    "Porcelain",
    "Onyx",
    "Marble",
    "Quartz",
    "Quartzite",
    "Granite",
  ];

  const authorEmail = session?.user?.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !type ||
      !description ||
      !imageUrl ||
      !height ||
      !width ||
      !thickness ||
      !originalPrice ||
      !quantity
    ) {
      alert("Must complete all fields to create post.");
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          type,
          description,
          imageUrl,
          height,
          width,
          thickness,
          originalPrice,
          discountedPrice,
          quantity,
          authorEmail,
          visible: true,
        }),
      });

      if (res.ok) {
        router.push(`/dashboard/${(session?.user as User).id}`);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1">
      <label htmlFor="image">Import Image</label>
      <input
        onChange={(e) => setImageUrl(e.target.value)}
        value={imageUrl}
        type="text"
        name="image"
      />
      <label htmlFor="title">Stone Name</label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
        type="text"
        name="title"
      />
      <label htmlFor="type">Stone Type</label>
      <select
        onChange={(e) => setType(e.target.value)}
        value={type}
        required
        name=""
        id=""
      >
        <option value="">-Select Stone Type-</option>
        {stoneTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <label htmlFor="description">Description</label>
      <input
        required
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        name="description"
      />
      <label htmlFor="width">Width {"(inch)"}</label>
      <input
        required
        onChange={(e) => setWidth(e.target.value)}
        value={width}
        type="number"
        name="width"
        step={0.01}
        min={1}
        max={200}
      />
      <label htmlFor="height">Height {"(inch)"}</label>
      <input
        required
        onChange={(e) => setHeight(e.target.value)}
        value={height}
        type="number"
        name="height"
        step={0.01}
        min={1}
        max={200}
      />
      <label htmlFor="thickness">Thickness {"(inch)"}</label>
      <input
        required
        onChange={(e) => setThickness(e.target.value)}
        value={thickness}
        type="number"
        name="Thickness"
        step={0.01}
        min={1}
        max={20}
      />
      <label htmlFor="originalPrice">Original Price</label>
      <input
        required
        onChange={(e) => setOriginalPrice(e.target.value)}
        value={originalPrice}
        type="number"
        name="originalPrice"
        step={0.01}
        max={10000}
        min={discountedPrice ? discountedPrice : 1}
      />
      <label htmlFor="discountedPrice">Discounted Price</label>
      <input
        onChange={(e) => setDiscountedPrice(e.target.value)}
        value={discountedPrice}
        type="number"
        name="discountedPrice"
        step={0.01}
        min={1}
        max={originalPrice ? originalPrice : 10000}
      />

      <label htmlFor="quantity">
        {path == "/create-post" ? "Quanitity" : "New Quantity"}
      </label>
      <input
        required
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        type="number"
        name="quantity"
        min={0}
      />
      <button className="btn" type="submit">
        Create
      </button>
    </form>
  );
}
