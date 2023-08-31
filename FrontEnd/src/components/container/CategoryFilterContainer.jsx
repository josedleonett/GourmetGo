import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryFilterDisplay from '../display/CategoryFilterDisplay';

const CategoryFilterContainer = () => {
  const { id } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [bundlesData, setBundlesData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/v1/bundle/byCategory/${id}`)
      .then(response => response.json())
      .then(data => setCategoryData(data))
      .catch(error => console.error("Error fetching category:", error));
  }, [id]);

  useEffect(() => {
    if (categoryData) {
      const bundleId = categoryData;
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

  return (
    <CategoryFilterDisplay categoryData={categoryData} bundlesData={bundlesData} />
  );
};

export default CategoryFilterContainer;
