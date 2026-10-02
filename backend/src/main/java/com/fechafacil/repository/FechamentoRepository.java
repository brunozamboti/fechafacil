package com.fechafacil.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fechafacil.entity.Fechamento;

public interface FechamentoRepository extends JpaRepository<Fechamento, Long> {

}