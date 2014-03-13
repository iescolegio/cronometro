/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package mga.cronometro;

import android.app.Application;
import android.os.SystemClock;
import entidades.Competicion;
import entidades.SntpClient;
import entidades.prueba;
import java.util.List;

/**
 *
 * @author administrador
 */
public class MyApp extends Application {

    private String Piscina = "25";
    private String Estilo = "Libre";
    private String Distancia = "100";
    private String TotalVueltas = "-1";
    private String Maestro = "No";
    private List<prueba> ListaPruebas;
    private List<prueba> ListaPruebasInicio;
    private List<Competicion> ListaCompeticiones;
    private SntpClient client;
    private boolean bClienteInit=false;
    
    public boolean getClientInit() {
        if (!bClienteInit){
            client = new SntpClient();
            client.requestTime("0.es.pool.ntp.org", 30000);
            bClienteInit=true;
        }
        
        return bClienteInit;
        
    }
     public SntpClient getClient() {
       
        
        return client;
    }
    
    public String getPiscina() {
        return Piscina;
    }

    public void setPiscina(String Piscina) {
        this.Piscina = Piscina;
    }

    public String getMaestro() {
        return Maestro;
    }

    public void setMaestro(String Maestro) {
        this.Maestro = Maestro;
    }

    public String getEstilo() {
        return Estilo;
    }

    public void setEstilo(String Estilo) {
        this.Estilo = Estilo;
    }

    public String getDistancia() {
        return Distancia;
    }

    public void setDistancia(String Distancia) {
        if (Distancia.toUpperCase().contains("4X")) {
            this.Distancia =String.valueOf(Integer.parseInt(Distancia.substring(2))*4);
        } else {
            this.Distancia = Distancia;
        }


    }

    public Integer getTotalVueltas() {
        return Integer.parseInt(Distancia) / (Integer.parseInt(Piscina) * 2);
    }

    public List<prueba> getListaPruebas() {
        return ListaPruebas;
    }

    public List<prueba> getListaPruebasInicio() {
        return ListaPruebasInicio;
    }

    public void setListaPruebas(List<prueba> ListaPruebas) {
        this.ListaPruebas = ListaPruebas;
    }

    public void setListaPruebasInicio(List<prueba> ListaPruebasInicio) {
        this.ListaPruebasInicio = ListaPruebasInicio;
    }

    public void setListaCampeonatos(List<Competicion> ListaCompeticiones) {
        this.ListaCompeticiones = ListaCompeticiones;
    }

    public List<Competicion> getListaCampeonatos() {
        return ListaCompeticiones;
    }

    public long GeTiempoServidorRemoto() {
        long now = 0;
        entidades.SntpClient client = new entidades.SntpClient();
        if (client.requestTime("pool.ntp.org", 0)) {
            now = client.getNtpTime() + SystemClock.elapsedRealtime() - client.getNtpTimeReference();
        }
        return now;
    }
}