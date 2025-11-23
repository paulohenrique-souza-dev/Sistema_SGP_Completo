package com.apirest.ApiRest.services;

import com.apirest.ApiRest.entities.Marca;
import com.apirest.ApiRest.repositories.MarcaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaService {

    private final MarcaRepository repo;

    public MarcaService(MarcaRepository repo) {
        this.repo = repo;
    }

    public List<Marca> listarTodas() {
        return repo.findAll();
    }

    public Marca salvar(Marca m) {
        return repo.save(m);
    }

    public Marca atualizar(String id, Marca nova) {
        Marca atual = repo.findById(id).orElseThrow();
        atual.setNome(nova.getNome());
        return repo.save(atual);
    }

    public void deletar(String id) {
        repo.deleteById(id);
    }
}
