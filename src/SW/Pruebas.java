/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package SW;

import android.widget.Toast;
import entidades.Competicion;
import entidades.prueba;
import java.util.ArrayList;
import java.util.List;
import org.ksoap2.SoapEnvelope;
import org.ksoap2.serialization.SoapObject;
import org.ksoap2.serialization.SoapPrimitive;
import org.ksoap2.serialization.SoapSerializationEnvelope;
import org.ksoap2.transport.HttpTransportSE;

/**
 *
 * @author administrador
 */
public class Pruebas {

    public void Pruebas() {
    }

    ; 
  
  
      
  public List<Competicion> GetCampeonatos(String Provincia) {
        List<Competicion> list = new ArrayList<Competicion>();
        try {
            String SOAP_ACTION = "http://www.wan-tpv.net/NatacionCampeonatosPorProvincia";
            String METHOD_NAME = "NatacionCampeonatosPorProvincia";
            String NAMESPACE = "http://www.wan-tpv.net/";
            String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";

            String a = "2";
            String b = "3";


            SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
            request.addProperty("Cronometrar", "1");
            request.addProperty("Provincia", Provincia);


            // request.addProperty("a", b);
//        request.addProperty("param3", txtParametro3.getText().toString());

            SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                    SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
            envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
            envelope.setOutputSoapObject(request);

            HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);

            androidHttpTransport.call(SOAP_ACTION, envelope);

            //Esta sección está destina si el Métdo del WS retorna valores

            SoapObject result = (SoapObject) envelope.getResponse();
            // SoapPrimitive result = (SoapPrimitive)envelope.getResponse();

            //  entidades.prueba[] listaPrueba = new entidades.prueba[result.getPropertyCount()];
            list.clear();
            for (int i = 0; i < result.getPropertyCount(); i++) {
                SoapObject ic = (SoapObject) result.getProperty(i);

                //    entidades.cliente cli = new entidades.cliente();
                //cli.id = Integer.parseInt(ic.getProperty(0).toString());
                //   cli.SetNombre ( ic.getProperty(1).toString());
                // cli.telefono = Integer.parseInt(ic.getProperty(2).toString());
                list.add(new Competicion(ic.getProperty(0).toString(), ic.getProperty(1).toString()));

                //   listaClientes[i] = cli;
            }
        } catch (Exception e) {
            MessageBox(e.getMessage());
        }

        list.add(new Competicion("-2", "Sin Datos"));

        return list;

    }

    public List<prueba> GetPruebas(String Campeonato) {
        List<prueba> list = new ArrayList<prueba>();
        try {
            String SOAP_ACTION = "http://www.wan-tpv.net/NatacionPruebas";
            String METHOD_NAME = "NatacionPruebas";
            String NAMESPACE = "http://www.wan-tpv.net/";
            String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";

            String a = "2";
            String b = "3";


            SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);

            request.addProperty("Campeonato", Campeonato);
            // request.addProperty("a", b);
//        request.addProperty("param3", txtParametro3.getText().toString());

            SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                    SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
            envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
            envelope.setOutputSoapObject(request);

            HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);

            androidHttpTransport.call(SOAP_ACTION, envelope);

            //Esta sección está destina si el Métdo del WS retorna valores

            SoapObject result = (SoapObject) envelope.getResponse();
            // SoapPrimitive result = (SoapPrimitive)envelope.getResponse();

            //  entidades.prueba[] listaPrueba = new entidades.prueba[result.getPropertyCount()];
            list.clear();

            if (!Campeonato.equals("-2")) {
                for (int i = 0; i < result.getPropertyCount(); i++) {
                    SoapObject ic = (SoapObject) result.getProperty(i);

                    //    entidades.cliente cli = new entidades.cliente();
                    //cli.id = Integer.parseInt(ic.getProperty(0).toString());
                    //   cli.SetNombre ( ic.getProperty(1).toString());
                    // cli.telefono = Integer.parseInt(ic.getProperty(2).toString());
                    list.add(new prueba(ic.getProperty(0).toString(), ic.getProperty(1).toString()));

                    //   listaClientes[i] = cli;
                }
            }
            else{
                 list.add(new prueba("-2", "01 - 50 Genérica"));
                 list.add(new prueba("-3", "02 - 100 Genérica"));
                 list.add(new prueba("-4", "03 - 200 Genérica"));
                 list.add(new prueba("-5", "04 - 400 Genérica"));
                 list.add(new prueba("-6", "05 - 800 Genérica"));
                 list.add(new prueba("-2", "06 - 1500 Genérica"));
            }
                
            } 
         catch (Exception e) {
            MessageBox(e.getMessage());
        

    }
    return list ;
}
public List<prueba>  GetPruebasNadadorInicio(String IDPrueba){
       List<prueba> list = new ArrayList<prueba>();
      try {
          String SOAP_ACTION = "http://www.wan-tpv.net/NatacionPruebasInicio";
          String METHOD_NAME = "NatacionPruebasInicio";
          String NAMESPACE = "http://www.wan-tpv.net/";
          String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
          
            
         
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
 
        request.addProperty("IdPrueba", IDPrueba);
       // request.addProperty("a", b);
//        request.addProperty("param3", txtParametro3.getText().toString());
 
        SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
        envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
        envelope.setOutputSoapObject(request);
 
        HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
 
        androidHttpTransport.call(SOAP_ACTION, envelope);
 
         //Esta sección está destina si el Métdo del WS retorna valores
   
       SoapObject result = (SoapObject)envelope.getResponse();
       // SoapPrimitive result = (SoapPrimitive)envelope.getResponse();
       
      //  entidades.prueba[] listaPrueba = new entidades.prueba[result.getPropertyCount()];
        list.clear();
       int entero = Integer.parseInt(IDPrueba);
        if (entero>0){
         for (int i = 0; i < result.getPropertyCount(); i++)
            
            {
               SoapObject ic = (SoapObject)result.getProperty(i);

           //    entidades.cliente cli = new entidades.cliente();
               //cli.id = Integer.parseInt(ic.getProperty(0).toString());
            //   cli.SetNombre ( ic.getProperty(1).toString());
              // cli.telefono = Integer.parseInt(ic.getProperty(2).toString());
               list.add( new prueba(ic.getProperty(0).toString(),"S: "+ ic.getProperty(2).toString() + " C: " + ic.getProperty(3).toString() + " - " + ic.getProperty(4).toString()));

            //   listaClientes[i] = cli;
            }   
        }
        else{
            list.add( new prueba(IDPrueba,"S: 1 C: 1 Nombre - Genérico"));
        }
            
        } 
          catch (Exception e) {
            MessageBox(e.getMessage());
        }
     return list;
        
    }
    public String  GetTiempoPrueba(String IdPrueba,String IdSerie,String Grupo){
       String Resultado="";
      try {
         
//          String SOAP_ACTION = "http://www.wan-tpv.net/NatacionPruebasInicio";
//          String METHOD_NAME = "NatacionPruebasInicio";
//          String NAMESPACE = "http://www.wan-tpv.net/";
//          String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
//                   
        String SOAP_ACTION = "http://www.wan-tpv.net/NatacionTiempoPruebasInicio";
        String METHOD_NAME = "NatacionTiempoPruebasInicio";
        String NAMESPACE = "http://www.wan-tpv.net/";
        String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
         
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
 
       request.addProperty("IdPrueba",IdPrueba);
       request.addProperty("NSerie", IdSerie);
       request.addProperty("Grupo", Grupo);
        
 
        SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
        envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
        envelope.setOutputSoapObject(request);
 
        HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
 
        androidHttpTransport.call(SOAP_ACTION, envelope);
 
         //Esta sección está destina si el Métdo del WS retorna valores
      //  SoapObject result = (SoapObject)envelope.getResponse();
        
        
         SoapPrimitive result = (SoapPrimitive)envelope.getResponse();
        
       Resultado =result.toString();
        
        //SoapPrimitive result = (SoapPrimitive)envelope.getResponse();
        if (result!=null){
            Resultado =result.toString();
         }
        else{
          Resultado="0";  
        }
     
        } 
          catch (Exception e) {
            MessageBox(e.getMessage());
        }
    // return list;
         return Resultado ;
    }
  
  public String  GetCrono(String Vuelta,String Calle, String IdPrueba,String Grupo,String Serie){
       String Resultado="";
      try {
         
          String SOAP_ACTION = "http://www.wan-tpv.net/NatacionCronoPruebas";
          String METHOD_NAME = "NatacionCronoPruebas";
          String NAMESPACE = "http://www.wan-tpv.net/";
          String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
                   
        
         
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
 
       request.addProperty("Vuelta", Vuelta);
       request.addProperty("Calle", Calle);
       request.addProperty("IdPrueba",IdPrueba);
       request.addProperty("Grupo", Grupo); 
       request.addProperty("Serie", Serie);
 
        SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
        envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
        envelope.setOutputSoapObject(request);
 
        HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
 
        androidHttpTransport.call(SOAP_ACTION, envelope);
 
         //Esta sección está destina si el Métdo del WS retorna valores
   
        SoapPrimitive result = (SoapPrimitive)envelope.getResponse();
        
       Resultado =result.toString();
        
       // SoapPrimitive result = (SoapPrimitive)envelope.getResponse();
       // entidades.cliente[] listaClientes = new entidades.cliente[result.getPropertyCount()];
        
        //for (int i = 0; i < listaClientes.length; i++)
//        for (int i = 0; i < result.getPropertyCount(); i++)
//            
//            {
//               SoapObject ic = (SoapObject)result.getProperty(i);
//
//           //    entidades.cliente cli = new entidades.cliente();
//               //cli.id = Integer.parseInt(ic.getProperty(0).toString());
//            //   cli.SetNombre ( ic.getProperty(1).toString());
//              // cli.telefono = Integer.parseInt(ic.getProperty(2).toString());
//               list.add( ic.getProperty(1).toString());
//
//            //   listaClientes[i] = cli;
//            }   
        } 
          catch (Exception e) {
            MessageBox(e.getMessage());
        }
    // return list;
         return Resultado ;
    }
  
  public void SetCrono(String Vuelta, String Calle, String Tiempo, String IdPrueba,String Grupo,String Serie){
      
      try {
          String SOAP_ACTION = "http://www.wan-tpv.net/NatacionInsertCronoPrueba";
          String METHOD_NAME = "NatacionInsertCronoPrueba";
          String NAMESPACE = "http://www.wan-tpv.net/";
          String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
          
          //String a="2";
         // String b="3";
        
         
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
 
     
        request.addProperty("Vuelta", Vuelta);
        request.addProperty("Calle", Calle);
        request.addProperty("Tiempo", Tiempo);
        request.addProperty("IdPrueba", IdPrueba);
        request.addProperty("Grupo", Grupo);
        request.addProperty("Serie", Serie);
        
        
//        request.addProperty("param3", txtParametro3.getText().toString());
 
        SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
        envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
        envelope.setOutputSoapObject(request);
 
        HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
 
        androidHttpTransport.call(SOAP_ACTION, envelope);
 
         //Esta sección está destina si el Métdo del WS retorna valores
   
//        SoapObject result = (SoapObject)envelope.getResponse();
       // SoapPrimitive result = (SoapPrimitive)envelope.getResponse();
       // entidades.cliente[] listaClientes = new entidades.cliente[result.getPropertyCount()];
//        list.clear();
        //for (int i = 0; i < listaClientes.length; i++)
//        for (int i = 0; i < result.getPropertyCount(); i++)
//            
//            {
//               SoapObject ic = (SoapObject)result.getProperty(i);
//
//           //    entidades.cliente cli = new entidades.cliente();
//               //cli.id = Integer.parseInt(ic.getProperty(0).toString());
//            //   cli.SetNombre ( ic.getProperty(1).toString());
//              // cli.telefono = Integer.parseInt(ic.getProperty(2).toString());
//               list.add( ic.getProperty(1).toString());
//
//            //   listaClientes[i] = cli;
//            }   
        } 
          catch (Exception e) {
            MessageBox(e.getMessage());
        }
    // return list;
        
    }
  
  
  public void SetPruebaInicio(String Tiempo, String IdPrueba, String IdSerie,String Grupo){
      
      try {
//          String SOAP_ACTION = "http://www.wan-tpv.net/NatacionInsertPruebaInicio";
//          String METHOD_NAME = "NatacionInsertPruebaInicio";
//          String NAMESPACE = "http://www.wan-tpv.net/";
//          String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
//          
          //String a="2";
         // String b="3";
        String SOAP_ACTION = "http://www.wan-tpv.net/NatacionInsertNatacionTiempoPruebasInicio";
        String METHOD_NAME = "NatacionInsertNatacionTiempoPruebasInicio";
        String NAMESPACE = "http://www.wan-tpv.net/";
        String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
          
         
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
 
     
       
        request.addProperty("TiempoInicio", Tiempo);
        request.addProperty("IdPrueba", IdPrueba);
        request.addProperty("NSerie", IdSerie);
        request.addProperty("Grupo", Grupo);
       
        
        
//        request.addProperty("param3", txtParametro3.getText().toString());
 
        SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
        envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
        envelope.setOutputSoapObject(request);
 
        HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
 
        androidHttpTransport.call(SOAP_ACTION, envelope);
 
         //Esta sección está destina si el Métdo del WS retorna valores
  
        } 
          catch (Exception e) {
            MessageBox(e.getMessage());
        }
    // return list;
        
    }
  
   public List<String>  GetCronoPrueba(String IdPrueba,String Grupo,String Serie){
       List<String> list = new ArrayList<String>();
      try {
         
          String SOAP_ACTION = "http://www.wan-tpv.net/NatacionCronoPruebasCallesUltima";
          String METHOD_NAME = "NatacionCronoPruebasCallesUltima";
          String NAMESPACE = "http://www.wan-tpv.net/";
          String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
                   
        
         
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
 
       //request.addProperty("Vuelta", Vuelta);
       request.addProperty("IdPrueba",IdPrueba);
       request.addProperty("Grupo", Grupo);
       request.addProperty("Serie", Serie);
 
        SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
        envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
        envelope.setOutputSoapObject(request);
 
        HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
 
        androidHttpTransport.call(SOAP_ACTION, envelope);
 
         //Esta sección está destina si el Métdo del WS retorna valores
   
        SoapObject result = (SoapObject)envelope.getResponse();
         list.clear();
      
         for (int i = 0; i < result.getPropertyCount(); i++)
            
            {
               SoapObject ic = (SoapObject)result.getProperty(i);

           //    entidades.cliente cli = new entidades.cliente();
               //cli.id = Integer.parseInt(ic.getProperty(0).toString());
            //   cli.SetNombre ( ic.getProperty(1).toString());
              // cli.telefono = Integer.parseInt(ic.getProperty(2).toString());
               list.add( ic.getProperty(3).toString()+" Calle " +ic.getProperty(2).toString());

            //   listaClientes[i] = cli;
            } 
      
        } 
          catch (Exception e) {
            MessageBox(e.getMessage());
        }
       return list;
       
    }
   
   
   
   
   public List<String>  GetCronoPruebaFinal(String IdPrueba,String Grupo){
       List<String> list = new ArrayList<String>();
      try {
         
          String SOAP_ACTION = "http://www.wan-tpv.net/NatacionCronoPruebasCallesUltimaFinal";
          String METHOD_NAME = "NatacionCronoPruebasCallesUltimaFinal";
          String NAMESPACE = "http://www.wan-tpv.net/";
          String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
                   
        
         
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
 
       //request.addProperty("Vuelta", Vuelta);
       request.addProperty("IdPrueba",IdPrueba);
       request.addProperty("Grupo", Grupo);
       
 
        SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
        envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
        envelope.setOutputSoapObject(request);
 
        HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
 
        androidHttpTransport.call(SOAP_ACTION, envelope);
 
         //Esta sección está destina si el Métdo del WS retorna valores
   
        SoapObject result = (SoapObject)envelope.getResponse();
         list.clear();
      
         for (int i = 0; i < result.getPropertyCount(); i++)
            
            {
               SoapObject ic = (SoapObject)result.getProperty(i);

           //    entidades.cliente cli = new entidades.cliente();
               //cli.id = Integer.parseInt(ic.getProperty(0).toString());
            //   cli.SetNombre ( ic.getProperty(1).toString());
              // cli.telefono = Integer.parseInt(ic.getProperty(2).toString());
               list.add( ic.getProperty(3).toString()+" Calle " +ic.getProperty(2).toString());

            //   listaClientes[i] = cli;
            } 
      
        } 
          catch (Exception e) {
            MessageBox(e.getMessage());
        }
       return list;
       
    }
  
  public void DeleteCrono(){
       
      try {
          String SOAP_ACTION = "http://www.wan-tpv.net/NatacionDeleteCronoPrueba";
          String METHOD_NAME = "NatacionDeleteCronoPrueba";
          String NAMESPACE = "http://wan-tpv.net/";
          String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
          
                  
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
 
        SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
        envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
        envelope.setOutputSoapObject(request);
 
        HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
 
        androidHttpTransport.call(SOAP_ACTION, envelope);
 
        } 
          catch (Exception e) {
            MessageBox(e.getMessage());
        }
    // return list;
        
    }
  
  public void DeleteTiempoPrueba(){
       
      try {
          String SOAP_ACTION = "http://www.wan-tpv.net/NatacionDeletePruebaInicio";
          String METHOD_NAME = "NatacionDeletePruebaInicio";
          String NAMESPACE = "http://www.wan-tpv.net/";
          String URL = "http://www.wan-tpv.net/ServicioNatacion.asmx";
          
                  
        SoapObject request = new SoapObject(NAMESPACE, METHOD_NAME);
 
        SoapSerializationEnvelope envelope = new SoapSerializationEnvelope(
                SoapEnvelope.VER12); // utilizar la version que corresponda:11 o 12
        envelope.dotNet = true; // para WS ASMX, sólo si fue construido con .Net
        envelope.setOutputSoapObject(request);
 
        HttpTransportSE androidHttpTransport = new HttpTransportSE(URL);
 
        androidHttpTransport.call(SOAP_ACTION, envelope);
 
        } 
          catch (Exception e) {
            MessageBox(e.getMessage());
        }
    // return list;
        
    }
    
  public void MessageBox(String message){
    Toast.makeText(null,message,Toast.LENGTH_SHORT).show();
};
  
}
