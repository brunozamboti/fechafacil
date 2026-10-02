package com.fechafacil.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fechafacil.entity.Movimentacao;

public interface MovimentacaoRepository extends JpaRepository<Movimentacao, Long> {

}