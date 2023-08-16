// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const CreateBundleComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [bundleImage, setBundleImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [starter, setStarter] = useState([]);
  const [mainCourse, setMainCourse] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("bundleImage", bundleImage);
    galleryImages.forEach((image) => formData.append("galleryImages", image));
    starter.forEach((item) => formData.append("starter", item));
    mainCourse.forEach((item) => formData.append("mainCourse", item));
    desserts.forEach((item) => formData.append("desserts", item));
    drinks.forEach((item) => formData.append("drinks", item));
    categories.forEach((item) => formData.append("categories", item));

    try {
      const response = await fetch("http://your-api-endpoint/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Bundle created successfully");
      } else {
        console.error("Failed to create bundle");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Create Bundle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Main Image:</label>
          <input
            type="file"
            onChange={(e) => setBundleImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Gallery Images:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setGalleryImages([...e.target.files])}
            required
          />
        </div>
        <div>
          <label>Starter:</label>
          <input
            type="text"
            value={starter}
            onChange={(e) => setStarter(e.target.value.split(","))}
            required
          />
        </div>
        <div>
          <label>Main Course:</label>
          <input
            type="text"
            value={mainCourse}
            onChange={(e) => setMainCourse(e.target.value.split(","))}
            required
          />
        </div>
        <div>
          <label>Desserts:</label>
          <input
            type="text"
            value={desserts}
            onChange={(e) => setDesserts(e.target.value.split(","))}
            required
          />
        </div>
        <div>
          <label>Drinks:</label>
          <input
            type="text"
            value={drinks}
            onChange={(e) => setDrinks(e.target.value.split(","))}
            required
          />
        </div>
        <div>
          <label>Categories:</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value.split(","))}
            required
          />
        </div>
        <button type="submit">Create Bundle</button>
      </form>
    </div>
  );
};

export default CreateBundleComponent;
