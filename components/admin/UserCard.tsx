"use client";

import { useState } from "react";

type Props = {
  name: string | null;
  email: string | null;
  companyName: string | null;
  city: string | null;
  isActive: boolean | null;
  id: string;
  posts: Post[];
};

type Post = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
};

export default function UserCard({
  id,
  name,
  email,
  companyName,
  city,
  isActive,
  posts,
}: Props) {
  const [isActiveState, setIsActiveState] = useState(isActive);

  const handleIsActive = async () => {
    try {
      const res = await fetch(`/api/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActiveState: !isActiveState,
        }),
      });
      if (res.ok) {
        setIsActiveState(!isActive);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>User: {id}</p>
      <p>{name}</p>
      <p>{email}</p>
      <p>{companyName}</p>
      <p>{city}</p>
      <p>{isActive ? "Active" : "Inactive"}</p>
      {posts.map((post, index) => (
        <div key={index}>
          <p>{post.id}</p>
          <p>{post.imageUrl}</p>
          <p>{post.title}</p>
          <p>{post.description}</p>
        </div>
      ))}
      <button className="btn" onClick={handleIsActive}>
        {isActiveState ? "Deactivate" : "Activate"}
      </button>
    </div>
  );
}
