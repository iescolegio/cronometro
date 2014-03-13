/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package mga.cronometro;

import android.view.View;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemSelectedListener;
import android.widget.Toast;

/**
 *
 * @author administrador
 */


public  class MyOnItemSelectedListener implements OnItemSelectedListener {
 
    public void onItemSelected(AdapterView<?> parent,
        View view, int pos, long id) {
       // Toast.makeText(parent.getContext(), "Item is " +
      //  parent.getItemAtPosition(pos).toString(), Toast.LENGTH_LONG).show();
    }
 
    public void onNothingSelected(AdapterView parent) {
      // Do nothing.
    }
}