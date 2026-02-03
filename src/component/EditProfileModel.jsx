import { useEffect, useState } from "react";
import "./EditProfileModel.css";
import { toast } from "react-toastify";

export default function EditProfile({ onClose, userId }) {
  console.log("Edit profile userId:", userId);

  const [form, setForm] = useState({
    name: "",
    mobileNumber: "",
    role: "",
    otp: "",
  });

  useEffect(() => {
    if (userId) fetchUserById();
  }, [userId]);

  const fetchUserById = async () => {
    const res = await fetch(
      `https://696b4ae8624d7ddccaa0b9c0.mockapi.io/User/${userId}`
    );
    const data = await res.json();

    setForm({
      name: data?.name || "",
      mobileNumber: data?.mobileNo || "", // ✅ FIX
      role: data?.role || "",
      otp: data?.otp || "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await fetch(
      `https://696b4ae8624d7ddccaa0b9c0.mockapi.io/User/${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          mobileNo: form.mobileNumber, // ✅ FIX
        }),
      }
    );

    toast.success("Profile Updated");
    onClose();
  };

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSave}>
        <h1>Edit Profile</h1>

        <input
          className="Profile-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="Profile-input"
          value={form.mobileNumber}
          onChange={(e) =>
            setForm({ ...form, mobileNumber: e.target.value })
          }
          maxLength={10}
        />

        <select className="Profile-input" value={form.role} disabled>
          <option>{form.role}</option>
        </select>

        <input className="Profile-input" value={form.otp} disabled />

        <div className="post-btn">
          <button type="button" className="btn-post-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-post">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
