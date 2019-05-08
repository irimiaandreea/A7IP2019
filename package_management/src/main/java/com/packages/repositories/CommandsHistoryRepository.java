package com.packages.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.packages.model.PackagesSenderHistory;

public interface CommandsHistoryRepository extends JpaRepository<PackagesSenderHistory,Integer>{
    public List<PackagesSenderHistory> findAllByEmailSender(String email_sender);
    public List<PackagesSenderHistory> findAllByEmailDriver(String email_driver);
    public Boolean existsByEmailSender(String email_sender);
    public Boolean existsByEmailDriver(String email_driver);
    public Boolean existsByPin(int pin);
    public Optional<PackagesSenderHistory> findByPin(int pin);
}
