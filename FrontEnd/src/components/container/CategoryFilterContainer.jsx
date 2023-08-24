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

  const bundleId = Object.keys(categoryData.bundles)

  useEffect(() => {
    if (categoryData && categoryData.bundles) {
      const fetchBundles = async () => {
        const bundlePromises = bundleId.map(bundleNum =>
          fetch(`http://localhost:8080/v1/bundle/getByIdForCard/${bundleNum}`)
            .then(response => response.json())
        );
        const fetchedBundles = await Promise.all(bundlePromises);
        console.log(bundlePromises)
        setBundlesData(fetchedBundles);
      };

      fetchBundles();
    }
  }, [categoryData]);

  return (
    <CategoryFilterDisplay categoryData={categoryData} bundlesData={bundlesData} />
  );
};

export default CategoryFilterContainer;