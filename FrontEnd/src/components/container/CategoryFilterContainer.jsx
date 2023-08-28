import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryFilterDisplay from '../display/CategoryFilterDisplay';

const CategoryFilterContainer = () => {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [bundlesData, setBundlesData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/v1/category/${id}`)
      .then(response => response.json())
      .then(data => setCategoryData(data))
      .catch(error => console.error("Error fetching category:", error));
  }, [id]);

  useEffect(() => {
    if (categoryData && categoryData.bundles) {
      const bundleId = Object.keys(categoryData.bundles); // Move this line inside the if statement
      const fetchBundles = async () => {
        const bundlePromises = bundleId.map(bundleNum =>
          fetch(`http://localhost:8080/v1/bundle/getByIdForCard/${bundleNum}`)
            .then(response => response.json())
        );
        const fetchedBundles = await Promise.all(bundlePromises);
        setBundlesData(fetchedBundles);
      };

      fetchBundles();
    }
  }, [categoryData]);

  console.log(categoryData)

  return (
    <CategoryFilterDisplay categoryData={categoryData} bundlesData={bundlesData} />
  );
};

export default CategoryFilterContainer;
