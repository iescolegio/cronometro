package entidades;

public class prueba {
    private String Id;
    private String Prueba;
    private String Serie;
    private String Fecha;
    private String Maestro;
    
    public prueba(){
        
    }
    
    public prueba(String Id, String Prueba) {
        this.Id = Id;
        this.Prueba = Prueba;
    }

   
    public String toString() {
        return Prueba;
    }
    public void SetId(String Id){
     this.Id=Id;
    } 
    
     public String GetId(){
      return Id;
    } 
     
      public void SetPrueba(String Prueba){
     this.Prueba=Prueba;
    } 
    
     public String GetPrueba(){
      return Prueba;
    } 
     
      public void SetSerie(String Serie){
     this.Serie=Serie;
    } 
    
     public String GetSerie(){
      return Serie;
    } 
     
      public void SetFecha(String Fecha){
     this.Fecha=Fecha;
    } 
    
     public String GetFecha(){
      return Fecha;
    } 
     
   public void SetMaestro(String Maestro){
     this.Maestro=Maestro;
    } 
    
  public String GetMaestro(){
      return Maestro;
    }
}
