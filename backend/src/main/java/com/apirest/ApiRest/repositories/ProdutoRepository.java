package com.apirest.ApiRest.repositories;

import com.apirest.ApiRest.entities.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, String> {}
