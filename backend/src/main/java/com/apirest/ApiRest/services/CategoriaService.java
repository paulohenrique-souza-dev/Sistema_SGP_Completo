package com.apirest.ApiRest.services;

import com.apirest.ApiRest.entities.Categoria;
import com.apirest.ApiRest.repositories.CategoriaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private final CategoriaRepository repo;

    public CategoriaService(CategoriaRepository repo) {
        this.repo = repo;
    }

    public List<Categoria> listarTodas() {
        return repo.findAll();
    }

    public Categoria salvar(Categoria c) {
        return repo.save(c);
    }

    public Categoria atualizar(String id, Categoria nova) {
        Categoria atual = repo.findById(id).orElseThrow();
        atual.setNome(nova.getNome());
        return repo.save(atual);
    }

    public void deletar(String id) {
        repo.deleteById(id);
    }
}
