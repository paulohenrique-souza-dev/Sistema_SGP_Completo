package com.apirest.ApiRest.repositories;

import com.apirest.ApiRest.entities.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepository extends JpaRepository<Marca, String> {}
