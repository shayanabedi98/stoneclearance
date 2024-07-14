"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { User } from "@/types/general";

type Props = {
  _title: string;
  _type: string;
  _description: string;
  _imageUrl: string;
  _height: string;
  _width: string;
  _thickness: string;
  _price: string;
  _quanitity: string;
  postId: string;
};

export default function CreatePostForm({
  _title,
  _type,
  _description,
  _imageUrl,
  _height,
  _width,
  _thickness,
  _price,
  _quanitity,
  postId
}: Props) {
  const path = usePathname();

  const [title, setTitle] = useState(_title);
  const [type, setType] = useState(_type);
  const [description, setDescription] = useState(_description);
  const [imageUrl, setImageUrl] = useState(_imageUrl);
  const [height, setHeight] = useState(_height);
  const [width, setWidth] = useState(_width);
  const [thickness, setThickness] = useState(_thickness);
  const [price, setPrice] = useState(_price);
  const [quantity, setQuantity] = useState(_quanitity);
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
      !price ||
      !quantity
    ) {
      alert("Must complete all fields to create post.");
      return;
    }

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
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
          price,
          quantity,
          authorEmail,
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
      <label htmlFor="price">
        {path == "/create-post" ? "Price ($CAD)" : "New Price"}
      </label>
      <input
        required
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        type="number"
        name="price"
        step={0.01}
        min={1}
      />

      <label htmlFor="price">
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
