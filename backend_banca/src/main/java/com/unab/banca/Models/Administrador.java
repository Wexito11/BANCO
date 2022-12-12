package com.unab.banca.Models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="Administrador")
public class Administrador  implements Serializable{
    @Id
    @Column(name="id_Administrador")
    private String id_administrador;
    @Column(name="nombre_Administrador")
    private String nombre_administrador;
    @Column(name="clave_Administrador")
    private String clave_administrador;

    @Override
    public String toString() {
        return "Administrador [id_Administrador=" + id_administrador + ", nombre_administrador=" + nombre_administrador + ", clave_Administrador="
                + clave_administrador + "]";
    }
}