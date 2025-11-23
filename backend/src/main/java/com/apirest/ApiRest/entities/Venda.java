package com.apirest.ApiRest.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "vendas")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne(optional = false)
    @JoinColumn(name = "produto_id")
    private Produto produto;

    private Integer quantidade;

    private Double valorTotal;

    private LocalDateTime dataVenda;

    // 🔥 Método necessário para o VendaService
    public void calcularValorTotal() {
        if (produto != null && quantidade != null) {
            this.valorTotal = produto.getPreco() * quantidade;
        }
    }
}
