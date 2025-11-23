package com.apirest.ApiRest.services;

import com.apirest.ApiRest.entities.Produto;
import com.apirest.ApiRest.repositories.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository repo;

    public ProdutoService(ProdutoRepository repo) {
        this.repo = repo;
    }

    public List<Produto> listarTodos() {
        return repo.findAll();
    }

    public Produto salvar(Produto p) {
        return repo.save(p);
    }

    public Produto atualizar(String id, Produto novo) {
        Produto atual = repo.findById(id).orElseThrow();
        atual.setNome(novo.getNome());
        atual.setPreco(novo.getPreco());
        atual.setMarca(novo.getMarca());
        atual.setCategoria(novo.getCategoria());
        return repo.save(atual);
    }

    public void deletar(String id) {
        repo.deleteById(id);
    }
}
