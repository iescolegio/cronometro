/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package entidades;

/**
 *
 * @author administrador
 */
public class Competicion {
    
    private String Id;
    private String Competicion;
  
    
    public Competicion(){
        
    }
    
    public Competicion(String Id, String Competicion) {
        this.Id = Id;
        this.Competicion = Competicion;
    }

   
    public String toString() {
        return Competicion;
    }
    public void SetId(String Id){
     this.Id=Id;
    } 
    
     public String GetId(){
      return Id;
    } 
     
      public void SetCompeticion(String Competicion){
     this.Competicion=Competicion;
    } 
    
     public String GetCompeticion(){
      return Competicion;
    } 
     
     
    
}
