package com.fechafacil.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fechafacil.service.CaixaService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import com.fechafacil.entity.Caixa;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.DeleteMapping;

@RestController
@RequestMapping("/caixas")
public class CaixaController {

	private final CaixaService caixaService;

	public CaixaController(CaixaService caixaService) {
		this.caixaService = caixaService;
	}

	@GetMapping
	public List<Caixa> listarTodos() {
		return caixaService.listarTodos();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Caixa> buscarPorId(@PathVariable Long id) {
		return caixaService.buscarPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public Caixa criar(@RequestBody Caixa caixa) {
		return caixaService.salvar(caixa);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Caixa> atualizar(@PathVariable Long id, @RequestBody Caixa caixa) {
		return caixaService.buscarPorId(id).map(caixaExistente -> {
			caixaExistente.setNome(caixa.getNome());
			Caixa caixaAtualizado = caixaService.salvar(caixaExistente);
			return ResponseEntity.ok(caixaAtualizado);
		}).orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable Long id) {
	    return caixaService.buscarPorId(id)
	            .map(caixa -> {
	                caixaService.excluir(id);
	                return ResponseEntity.noContent().<Void>build();
	            })
	            .orElse(ResponseEntity.notFound().build());
	}
}
