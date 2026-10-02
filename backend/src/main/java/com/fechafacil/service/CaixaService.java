package com.fechafacil.service;

import org.springframework.stereotype.Service;

import com.fechafacil.repository.CaixaRepository;

import java.util.List;

import com.fechafacil.entity.Caixa;

import java.util.Optional;

@Service
public class CaixaService {

	private final CaixaRepository caixaRepository;

	public CaixaService(CaixaRepository caixaRepository) {
		this.caixaRepository = caixaRepository;
	}

	public List<Caixa> listarTodos() {
		return caixaRepository.findAll();
	}

	public Optional<Caixa> buscarPorId(Long id) {
		return caixaRepository.findById(id);
	}

	public Caixa salvar(Caixa caixa) {
		return caixaRepository.save(caixa);
	}

	public void excluir(Long id) {
		caixaRepository.deleteById(id);
	}

}