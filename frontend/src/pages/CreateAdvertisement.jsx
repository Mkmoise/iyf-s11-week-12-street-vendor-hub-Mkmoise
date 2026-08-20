import { useState } from "react";

function CreateAdvertisement({
  onAdvertisementCreated,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    location: "",
  });

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
        "http://localhost:5000/api/advertisements",
        {
          method: "POST",
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
          "Failed to create advertisement"
        );
      }

      const advertisement =
        await response.json();

      onAdvertisementCreated(advertisement);

      setFormData({
        title: "",
        description: "",
        image: "",
        price: "",
        category: "",
        location: "",
      });
    } catch (error) {
      console.error(error);
      alert("Could not create advertisement");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Advertisement</h2>

      <input
        type="text"
        name="title"
        placeholder="Advertisement title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Create Advertisement
      </button>
    </form>
  );
}

export default CreateAdvertisement;