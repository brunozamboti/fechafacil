package com.fechafacil.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fechafacil.entity.Fechamento;
import com.fechafacil.repository.CaixaRepository;
import com.fechafacil.repository.FechamentoRepository;

@Service
public class FechamentoService {

    private final FechamentoRepository fechamentoRepository;
    private final CaixaRepository caixaRepository;

    public FechamentoService(
            FechamentoRepository fechamentoRepository,
            CaixaRepository caixaRepository) {

        this.fechamentoRepository = fechamentoRepository;
        this.caixaRepository = caixaRepository;
    }

    public List<Fechamento> listarTodos() {
        return fechamentoRepository.findAll();
    }

    public Optional<Fechamento> buscarPorId(Long id) {
        return fechamentoRepository.findById(id);
    }

    public Optional<Fechamento> salvar(Fechamento fechamento) {

        if (fechamento.getCaixa() == null || fechamento.getCaixa().getId() == null) {
            return Optional.empty();
        }

        return caixaRepository.findById(fechamento.getCaixa().getId())
                .map(caixa -> {
                    fechamento.setCaixa(caixa);
                    return fechamentoRepository.save(fechamento);
                });
    }

    public void excluir(Long id) {
        fechamentoRepository.deleteById(id);
    }
}