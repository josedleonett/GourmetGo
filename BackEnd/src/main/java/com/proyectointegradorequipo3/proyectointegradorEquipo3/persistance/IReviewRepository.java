package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByBundleId(Long bundleId);
}
