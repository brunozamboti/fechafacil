package com.fechafacil.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fechafacil.entity.Movimentacao;
import com.fechafacil.service.MovimentacaoService;

@RestController
@RequestMapping("/movimentacoes")
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;

    public MovimentacaoController(MovimentacaoService movimentacaoService) {
        this.movimentacaoService = movimentacaoService;
    }

    @GetMapping
    public List<Movimentacao> listarTodos() {
        return movimentacaoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movimentacao> buscarPorId(@PathVariable Long id) {
        return movimentacaoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Movimentacao> criar(@RequestBody Movimentacao movimentacao) {
        return movimentacaoService.salvar(movimentacao)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movimentacao> atualizar(
            @PathVariable Long id,
            @RequestBody Movimentacao movimentacao) {

        return movimentacaoService.buscarPorId(id)
                .flatMap(movimentacaoExistente -> {

                    movimentacaoExistente.setTipo(movimentacao.getTipo());
                    movimentacaoExistente.setValor(movimentacao.getValor());
                    movimentacaoExistente.setDescricao(movimentacao.getDescricao());
                    movimentacaoExistente.setDataHora(movimentacao.getDataHora());

                    return movimentacaoService.salvar(movimentacaoExistente);
                })
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        return movimentacaoService.buscarPorId(id)
                .map(movimentacao -> {
                    movimentacaoService.excluir(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}