/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package entidades;

/**
 *
 * @author administrador
 */
public class CronoPruebas {

    private String Id;
    private String Vuelta;
    private String Calle;
    private String Tiempo;
    private String IdPrueba;

    public CronoPruebas() {
    }

    public void SetId(String Id) {
        this.Id = Id;
    }

    public String GetId() {
        return Id;
    }

    public void SetVuelta(String Vuelta) {
        this.Vuelta = Vuelta;
    }

    public String GetVuelta() {
        return Vuelta;
    }

    public void SetCalle(String Calle) {
        this.Calle = Calle;
    }

    public String GetCalle() {
        return Calle;
    }

    public void SetTiempo(String Tiempo) {
        this.Tiempo = Tiempo;
    }

    public String GetTiempo() {
        return Tiempo;
    }

    public void SetIdPrueba(String IdPrueba) {
        this.IdPrueba = IdPrueba;
    }

    public String GetIdPrueba() {
        return IdPrueba;
    }
}
