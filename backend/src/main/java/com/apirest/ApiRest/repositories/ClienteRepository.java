package com.apirest.ApiRest.repositories;

import com.apirest.ApiRest.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, String> {}
