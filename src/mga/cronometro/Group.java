/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package mga.cronometro;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author moises
 */
public class Group {
  public String nombre;
  public String tiempo;
  public final List<String> children = new ArrayList<String>();

  public Group(String Nombre,String Tiempo) {
    this.nombre = Nombre;
    this.tiempo=Tiempo;
  }
}
