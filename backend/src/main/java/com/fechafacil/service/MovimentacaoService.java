package com.fechafacil.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fechafacil.entity.Movimentacao;
import com.fechafacil.repository.FechamentoRepository;
import com.fechafacil.repository.MovimentacaoRepository;

@Service
public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;
    private final FechamentoRepository fechamentoRepository;

    public MovimentacaoService(
            MovimentacaoRepository movimentacaoRepository,
            FechamentoRepository fechamentoRepository) {

        this.movimentacaoRepository = movimentacaoRepository;
        this.fechamentoRepository = fechamentoRepository;
    }

    public List<Movimentacao> listarTodos() {
        return movimentacaoRepository.findAll();
    }

    public Optional<Movimentacao> buscarPorId(Long id) {
        return movimentacaoRepository.findById(id);
    }

    public Optional<Movimentacao> salvar(Movimentacao movimentacao) {

        if (movimentacao.getFechamento() == null
                || movimentacao.getFechamento().getId() == null) {
            return Optional.empty();
        }

        return fechamentoRepository.findById(movimentacao.getFechamento().getId())
                .map(fechamento -> {
                    movimentacao.setFechamento(fechamento);
                    return movimentacaoRepository.save(movimentacao);
                });
    }

    public void excluir(Long id) {
        movimentacaoRepository.deleteById(id);
    }
}