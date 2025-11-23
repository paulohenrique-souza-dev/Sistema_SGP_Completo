package com.apirest.ApiRest.services;

import com.apirest.ApiRest.entities.Venda;
import com.apirest.ApiRest.entities.Cliente;
import com.apirest.ApiRest.entities.Produto;
import com.apirest.ApiRest.repositories.VendaRepository;
import com.apirest.ApiRest.repositories.ClienteRepository;
import com.apirest.ApiRest.repositories.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VendaService {

    private final VendaRepository repo;
    private final ClienteRepository clienteRepo;
    private final ProdutoRepository produtoRepo;

    public VendaService(VendaRepository repo,
                        ClienteRepository clienteRepo,
                        ProdutoRepository produtoRepo) {
        this.repo = repo;
        this.clienteRepo = clienteRepo;
        this.produtoRepo = produtoRepo;
    }

    public List<Venda> listarTodas() {
        return repo.findAll();
    }

    public Venda salvar(Venda v) {

        // Buscar entidades reais
        Cliente cliente = clienteRepo.findById(v.getCliente().getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Produto produto = produtoRepo.findById(v.getProduto().getId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // Substituir objetos enviados pelo JSON
        v.setCliente(cliente);
        v.setProduto(produto);

        // Calcular valor total
        v.setValorTotal(produto.getPreco() * v.getQuantidade());

        // Definir data da venda caso não venha no JSON
        if (v.getDataVenda() == null) {
            v.setDataVenda(LocalDateTime.now());
        }

        return repo.save(v);
    }

    public Venda atualizar(String id, Venda nova) {

        Venda atual = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));

        Cliente cliente = clienteRepo.findById(nova.getCliente().getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Produto produto = produtoRepo.findById(nova.getProduto().getId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        atual.setCliente(cliente);
        atual.setProduto(produto);
        atual.setQuantidade(nova.getQuantidade());

        atual.setValorTotal(produto.getPreco() * nova.getQuantidade());

        return repo.save(atual);
    }

    public void deletar(String id) {
        repo.deleteById(id);
    }
}
