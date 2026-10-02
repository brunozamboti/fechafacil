package com.fechafacil.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fechafacil.service.FechamentoService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import com.fechafacil.entity.Fechamento;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping("/fechamentos")
public class FechamentoController {

    private final FechamentoService fechamentoService;

    public FechamentoController(FechamentoService fechamentoService) {
        this.fechamentoService = fechamentoService;
    }
    
    @GetMapping
    public List<Fechamento> listarTodos() {
        return fechamentoService.listarTodos();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Fechamento> buscarPorId(@PathVariable Long id) {
        return fechamentoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Fechamento> criar(@RequestBody Fechamento fechamento) {
        return fechamentoService.salvar(fechamento)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Fechamento> atualizar(
            @PathVariable Long id,
            @RequestBody Fechamento fechamento) {

        return fechamentoService.buscarPorId(id)
                .flatMap(fechamentoExistente -> {

                    fechamentoExistente.setDataHoraFechamento(fechamento.getDataHoraFechamento());
                    fechamentoExistente.setValorEsperado(fechamento.getValorEsperado());
                    fechamentoExistente.setValorContado(fechamento.getValorContado());
                    fechamentoExistente.setDiferenca(fechamento.getDiferenca());

                    return fechamentoService.salvar(fechamentoExistente);
                })
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        return fechamentoService.buscarPorId(id)
                .map(fechamento -> {
                    fechamentoService.excluir(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}