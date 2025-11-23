package com.apirest.ApiRest.repositories;

import com.apirest.ApiRest.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, String> {}
