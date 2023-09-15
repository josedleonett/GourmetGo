package com.proyectointegradorequipo3.proyectointegradorEquipo3.persistance;

import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Booking;
import com.proyectointegradorequipo3.proyectointegradorEquipo3.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IBookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findAllByDateBetween(LocalDate start, LocalDate end);

    List<Booking> findByDateAfter(LocalDate date);

    Optional<Booking> findTopByUserIdAndBundleIdOrderByDateDesc(Long userId, Long bundleId);

}
