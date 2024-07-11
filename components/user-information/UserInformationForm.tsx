"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
};

type Props = {
  nameState: string;
  selectedCityState: string;
  contactEmailState: string;
  companyNameState: string;
  telState: string;
};

const cities = [
  "Richmond Hill",
  "Vaughan",
  "Mississauga",
  "Toronto",
  "Markham",
  "Aurora",
  "New Market",
  "Brampton",
  "Bradford",
  "Ajax",
  "Oshawa",
];

export default function UserInformationForm({
  nameState,
  selectedCityState,
  contactEmailState,
  companyNameState,
  telState,
}: Props) {
  const [name, setName] = useState(nameState);
  const [selectedCity, setSelectedCity] = useState(selectedCityState);
  const [contactEmail, setContactEmail] = useState(contactEmailState);
  const [companyName, setCompanyName] = useState(companyNameState);
  const [tel, setTel] = useState(telState);

  const router = useRouter();
  const { data: session } = useSession();

  //   useEffect(() => {}, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !selectedCity || !contactEmail || !tel || !companyName) {
      alert("Must complete all fields to continue");
      return;
    }

    try {
      const res = await fetch(
        `/api/account-setup/${(session?.user as User).id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            selectedCity,
            contactEmail,
            companyName,
            tel,
          }),
        },
      );
      if (res.ok) {
        router.push(`/dashboard/${(session?.user as User).id}`);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong, try again later or contact us.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1" action="">
      <label htmlFor="name">Name</label>
      <input
        className="userinfo"
        onChange={(e) => setName(e.target.value)}
        type="text"
        required
        name="name"
        value={name}
      />
      <label htmlFor="companyName">Company Name</label>
      <input
        className="userinfo"
        onChange={(e) => setCompanyName(e.target.value)}
        type="text"
        required
        name="companyName"
        value={companyName}
      />
      <label htmlFor="contactEmail">Contact Email</label>
      <input
        className="userinfo"
        onChange={(e) => setContactEmail(e.target.value)}
        type="text"
        required
        name="contactEmail"
        value={contactEmail}
      />
      <label htmlFor="city">City</label>
      <select
        className="userinfo"
        required
        name="city"
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        <option value={""}>-Select City-</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <label htmlFor="tel">Phone Number</label>
      <input
        className="userinfo"
        onChange={(e) => setTel(e.target.value)}
        type="tel"
        required
        name="tel"
        value={tel}
      />
      <button className="btn w-52" type="submit">
        Submit
      </button>
    </form>
  );
}
