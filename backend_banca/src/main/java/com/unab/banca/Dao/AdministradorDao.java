package com.unab.banca.Dao;
import com.unab.banca.Models.Administrador;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministradorDao extends CrudRepository< Administrador, String>  {
    

}