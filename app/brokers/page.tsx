"use client";

import { FormEvent, useEffect, useState } from "react";
import { api } from "@/lib/api";
import BrokerTable from "@/components/BrokerTable";

const departments = [
  "Off-Plan (INT)",
  "Off-Plan (RU)",
  "Secondary",
  "Rent",
  "Consulting",
];

export default function BrokersPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState("");

  async function load() {
    try {
      const result = await api("/api/dashboard");
      setData(result);
      setMessage("");
    } catch (error: any) {
      setMessage(error?.message || "Failed to load brokers.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function add(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const form = new FormData(event.currentTarget);
    const instagramUrl = String(form.get("instagramUrl") || "");
    const username =
      instagramUrl
        .replace(/\/$/, "")
        .split("/")
        .pop()
        ?.replace("@", "") || "";

    if (!username) {
      setMessage("Please enter a valid Instagram URL.");
      return;
    }

    try {
      await api(
        `/api/brokers/register?username=${encodeURIComponent(username)}` +
          `&firstName=${encodeURIComponent(String(form.get("firstName") || ""))}` +
          `&lastName=${encodeURIComponent(String(form.get("lastName") || ""))}` +
          `&department=${encodeURIComponent(String(form.get("department") || ""))}` +
          `&manager=${encodeURIComponent(String(form.get("manager") || ""))}` +
          `&instagramUrl=${encodeURIComponent(instagramUrl)}` +
          `&active=${form.get("active") === "on"}`,
        { method: "POST" }
      );

      setMessage("Broker added successfully.");
      event.currentTarget.reset();
      await load();
    } catch (error: any) {
      setMessage(error?.message || "Failed to add broker.");
    }
  }

  return (
    <div>
      <div className="top">
        <div>
          <h1>Brokers</h1>
          <p>Add and manage broker monitoring</p>
        </div>
      </div>

      <div className="card">
        <form className="form" onSubmit={add}>
          <input name="firstName" placeholder="First Name" required />
          <input name="lastName" placeholder="Last Name" required />

          <select name="department" defaultValue="" required>
            <option value="" disabled>
              Department
            </option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          <input name="manager" placeholder="Manager" required />
          <input name="instagramUrl" placeholder="Instagram URL" required />

          <label>
            <input type="checkbox" name="active" defaultChecked /> Active
          </label>

          <button className="button" type="submit">
            Add Broker
          </button>

          {message && <p>{message}</p>}
        </form>
      </div>

      <div className="section">
        <BrokerTable brokers={data?.brokers || []} />
      </div>
    </div>
  );
}
