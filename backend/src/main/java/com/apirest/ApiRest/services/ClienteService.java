package com.apirest.ApiRest.services;

import com.apirest.ApiRest.entities.Cliente;
import com.apirest.ApiRest.repositories.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repo;

    public ClienteService(ClienteRepository repo) {
        this.repo = repo;
    }

    public List<Cliente> listarTodos() {
        return repo.findAll();
    }

    public Cliente salvar(Cliente c) {
        return repo.save(c);
    }

    public Cliente atualizar(String id, Cliente novo) {
        Cliente atual = repo.findById(id).orElseThrow();
        atual.setNome(novo.getNome());
        atual.setEmail(novo.getEmail());
        atual.setCidade(novo.getCidade());
        atual.setIdade(novo.getIdade());
        return repo.save(atual);
    }

    public void deletar(String id) {
        repo.deleteById(id);
    }
}
