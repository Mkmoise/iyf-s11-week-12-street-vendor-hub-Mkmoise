import { useEffect, useState } from "react";

function EditAdvertisement({
  advertisement,
  onAdvertisementUpdated,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    location: "",
  });

  useEffect(() => {
    if (advertisement) {
      setFormData({
        title: advertisement.title || "",
        description:
          advertisement.description || "",
        image: advertisement.image || "",
        price: advertisement.price || "",
        category: advertisement.category || "",
        location: advertisement.location || "",
      });
    }
  }, [advertisement]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const response = await fetch(
        `http://localhost:5000/api/advertisements/${advertisement._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update advertisement"
        );
      }

      const updatedAdvertisement =
        await response.json();

      onAdvertisementUpdated(
        updatedAdvertisement
      );
    } catch (error) {
      console.error(error);
      alert("Could not update advertisement");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Advertisement</h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Update Advertisement
      </button>

      <button
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}

export default EditAdvertisement;