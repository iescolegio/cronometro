package mga.cronometro;


import android.app.Activity;
import android.app.AlertDialog;


import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;
import java.util.HashSet;

public class FrmConfigurar extends Activity {

    @Override
    protected void onCreate(Bundle icicle) {
        super.onCreate(icicle);
        setContentView(R.layout.configurar);


        Spinner spinnerMaestro = (Spinner) findViewById(R.id.Maestro);
        ArrayAdapter<CharSequence> adapterMaestro = ArrayAdapter.createFromResource(
                this, R.array.Maestro_array, android.R.layout.simple_spinner_item);
        adapterMaestro.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinnerMaestro.setAdapter(adapterMaestro);
        spinnerMaestro.setOnItemSelectedListener(new MyOnItemSelectedListener());




        Spinner spinner3 = (Spinner) findViewById(R.id.spinner3);
        ArrayAdapter<CharSequence> adapter3 = ArrayAdapter.createFromResource(
                this, R.array.distancia_array, android.R.layout.simple_spinner_item);
        adapter3.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner3.setAdapter(adapter3);
        spinner3.setOnItemSelectedListener(new MyOnItemSelectedListener());



        Spinner spinner2 = (Spinner) findViewById(R.id.spinner2);
        ArrayAdapter<CharSequence> adapter2 = ArrayAdapter.createFromResource(
                this, R.array.estilos_array, android.R.layout.simple_spinner_item);
        adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner2.setAdapter(adapter2);
        spinner2.setOnItemSelectedListener(new MyOnItemSelectedListener());


        Spinner spinner = (Spinner) findViewById(R.id.spinner);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
                this, R.array.piscinas_array, android.R.layout.simple_spinner_item);

        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
        spinner.setOnItemSelectedListener(new MyOnItemSelectedListener());

        Button myBorrar = (Button) findViewById(R.id.Borrar);



        myBorrar.setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                // mChronometer.stop();

                SW.Pruebas sw = new SW.Pruebas();
                sw.DeleteCrono();

                sw.DeleteTiempoPrueba();

                // mChronometer.stop(); 
            }
        });


        Button myButton = (Button) findViewById(R.id.button1);
        myButton.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {

                MyApp appState = ((MyApp) getApplicationContext());

                // msgbox (appState.getSomeVariable()); 

                Spinner spMaestro = (Spinner) findViewById(R.id.Maestro);
                String MaestroString = null;
                MaestroString = spMaestro.getSelectedItem().toString();
                //int nPos = sp.getSelectedItemPosition();

                appState.setMaestro(MaestroString);



                Spinner sp = (Spinner) findViewById(R.id.spinner);
                String PiscinaString = null;
                PiscinaString = sp.getSelectedItem().toString();
                //int nPos = sp.getSelectedItemPosition();

                appState.setPiscina(PiscinaString);

                Spinner sp2 = (Spinner) findViewById(R.id.spinner2);
                String EstiloString = null;
                EstiloString = sp2.getSelectedItem().toString();
                //int nPos = sp2.getSelectedItemPosition();
                appState.setEstilo(EstiloString);

                Spinner sp3 = (Spinner) findViewById(R.id.spinner3);
                String DistanciaString = null;
                DistanciaString = sp3.getSelectedItem().toString();
                //int nPos = sp2.getSelectedItemPosition();
                appState.setDistancia(DistanciaString);


                finish();

//                Toast.makeText(getApplicationContext(), "getSelectedItem=" + spinnerString,
//                
//                        
//                Toast.LENGTH_LONG).show();
//                
//                
//                Toast.makeText(getApplicationContext(), "getSelectedItemPosition=" + nPos,
//                		Toast.LENGTH_LONG).show();
            }
        });
    }

    public void msgbox(String message) {
        AlertDialog alertDialog;
        alertDialog = new AlertDialog.Builder(this).create();
        alertDialog.setTitle("Cronometro");
        alertDialog.setMessage(message);

        //  alertDialog.setButton(message, null);
        alertDialog.show();
    }
}
