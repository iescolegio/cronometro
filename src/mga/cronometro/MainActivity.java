package mga.cronometro;

import static android.R.attr.key;
import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.SparseArray;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.SubMenu;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ExpandableListView;
import android.widget.LinearLayout;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import entidades.Competicion;
import entidades.SntpClient;
import entidades.prueba;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

//import org.ksoap2.SoapEnvelope;
//import org.ksoap2.serialization.SoapObject;
//import org.ksoap2.serialization.SoapPrimitive;
//import org.ksoap2.serialization.SoapSerializationEnvelope;
//import org.ksoap2.transport.HttpTransportSE;
public class MainActivity extends Activity {

    private long TiempoBrazadas = 0;
    private double ResBrazadas = 0;
    private SparseArray<Group> groups = new SparseArray<Group>();
    private String NadadorPrueba = "";
    private boolean ConInternet = false;
    private String GIDPrueba;
    private Context context;
    private String NombreGrupo = "General";
    private String CallePrueba;
    private String SeriePrueba;
    private static final int MNU_OPC1 = 1;
    private static final int MNU_OPC2 = 2;
    private static final int MNU_OPC3 = 3;
    private static final int SMNU_OPC1 = 31;
    private static final int SMNU_OPC2 = 32;
    private static final int SMNU_OPC1_MAESTRO = 51;
    private static final int SMNU_OPC2_MAESTRO = 52;
    private static final int SMNU_OPC3_MAESTRO = 53;
    private static final int SMNUCAM_OPC1 = 41;
    private static final int SMNUCAM_OPC2 = 42;
    private static final int GRUPO_MENU_1 = 101;
    private static final int GRUPO_MENU_2 = 201;
    private static final int GRUPO_MENU_3 = 301;
    private int opcionSeleccionada = 1;
    private static Pattern pattern = Pattern.compile("(\\d{2}):(\\d{2}):(\\d{2})");
    private Button buttonStart;
    private Button buttonLlegada;
    private String IdPrueba;
    // private Button buttonStop;
    private String Accion = "Cargar";
    private String Campeonato = "";
    private Bundle icicle;
    private ProgressDialog pd;
    private List<Competicion> ListCompeticiones;
    private List<prueba> res;
    private List<prueba> res2;
    private List<String> ResParcial;
    private ArrayAdapter<prueba> dataAdapter;
    private ArrayAdapter<prueba> dataAdapter3;
    private Spinner cmbPruebas;
    private Spinner cmbNadadores;
    private Chronometer mChronometer;
    private int Vueltas = -1;
    private String TiempoAnterior = "00:00:00";
    private int TotalVueltas = -1;
    private MyApp appState;
    private LinearLayout linearLayout01;
    private long lastPause;
    //   private Calendar ahora1;
    //  private long TiempoServidorRemoto;
    private long TimeServidorAhora;
    private SntpClient client;
    List<prueba> ListaCache = new ArrayList<prueba>();
    private ExpandableListView listView;
    private MyExpandableListAdapter adapter;

    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle icicle) {
        //super.onCreate(savedInstanceState);
        super.onCreate(icicle);

        context = this;
        appState = ((MyApp) getApplicationContext());

        //createData();
        res = appState.getListaPruebas();
        //   TiempoServidorRemoto=appState.GeTiempoServidorRemoto();
        setContentView(R.layout.cronometronuevo);
        //  res = new ArrayList<prueba>();
        ResParcial = new ArrayList<String>();

        res2 = new ArrayList<prueba>();
        if (res == null) {
            res = new ArrayList<prueba>();
            res.add(new prueba("-1", "Carge el Campeonato."));

        }

        linearLayout01 = (LinearLayout) findViewById(R.id.layout01);

        // View view = getWindow().findViewById(R.id.layout01);
        setTitle("Cronómetro. Grupo: - " + NombreGrupo);

        LimpiarMarcador();

        listView = (ExpandableListView) findViewById(R.id.listView);
        adapter = new MyExpandableListAdapter(this, groups);
//        listView.setAdapter(adapter);

        ConInternet = verificaConexion(this);
        if (!ConInternet) {

            Msgbox("Comprueba tu conexión a Internet.");

        } else {

            dataAdapter = new ArrayAdapter<prueba>(this, android.R.layout.simple_spinner_item, res);
            dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

            mChronometer = (Chronometer) findViewById(R.id.chronometer);
            // final Chronometer myChronometer = (Chronometer)findViewById(R.id.chronometer);

            ////final Spinner spinner3 = (Spinner) findViewById(R.id.BuscarCalle);
//        ArrayAdapter<CharSequence> adapter3 = ArrayAdapter.createFromResource(
//                this, R.array.calles_array, android.R.layout.simple_spinner_item);
//        adapter3.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
//        
//        
            dataAdapter3 = new ArrayAdapter<prueba>(this, android.R.layout.simple_spinner_item, res2);
            dataAdapter3.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

            //// spinner3.setAdapter(adapter3);
            ////spinner3.setOnItemSelectedListener(new MyOnItemSelectedListener());
            cmbNadadores = (Spinner) findViewById(R.id.BuscarCalle);

            cmbNadadores.setAdapter(dataAdapter3);
            ///  cmbNadadores.setOnItemSelectedListener(new MyOnItemSelectedListener());

            buttonStart = (Button) findViewById(R.id.buttonstart);
            //buttonStop = (Button)findViewById(R.id.buttonstop);
            //  Button buttonBuscarPruebas = (Button)findViewById(R.id.buscarPruebas);
            buttonLlegada = (Button) findViewById(R.id.buttonLlegada);
            //   Button buttonBorrar = (Button)findViewById(R.id.buttonBorrar);
            Button buttonReset = (Button) findViewById(R.id.buttonreset);
            final Button buttonSalir = (Button) findViewById(R.id.buttonsalir);
            //  final EditText TextCalle = (EditText)findViewById(R.id.TextCalle);

            cmbPruebas = (Spinner) findViewById(R.id.widget216);
            //final TextView text = (TextView) findViewById(R.id.txtDisplay);

            cmbPruebas.setAdapter(dataAdapter);
            appState.setMaestro("Si");
            linearLayout01.setBackgroundColor(Color.BLACK);
            appState.setPiscina("25");

//            Accion = "CargarCompeticiones";
//            new MainActivity.DownloadTask2().execute("");
//            pd = ProgressDialog.show(context, "Por favor espere",
//                    "Cargando Campeonatos.", true, false);
//       cmbPruebas.setOnClickListener(new spinner.OnClickListener(){
//           @Override
//            public void onClick(View v) {
//               
//           }
//       }
            cmbPruebas.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {
                    //  buttonBuscarPruebas.setEnabled(false);
                    prueba p;
                    p = (prueba) parentView.getItemAtPosition(position);
                    GIDPrueba = p.GetId();
                    if (!GIDPrueba.equals("-1")) {
                        Accion = "CargarNadador";
                        new MainActivity.DownloadTask2().execute("");
                        pd = ProgressDialog.show(context, "Por favor espere",
                                "Cargando Series.", true, false);
                    } else {
                        // appState.setListaPruebasInicio(null);
                        //    Toast.makeText(parentView.getContext(), p.GetId().toString(), Toast.LENGTH_LONG).show();
                    }
                }

                @Override
                public void onNothingSelected(AdapterView<?> parentView) {
                    //   Toast.makeText(parentView.getContext(), "herf", Toast.LENGTH_LONG).show();
                }
            });

            cmbNadadores.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parentView, View selectedItemView, int position, long id) {

                    mChronometer.setText("00:00:00");

                    //  buttonBuscarPruebas.setEnabled(false);
                    //    Toast.makeText(parentView.getContext(), p.GetId().toString(), Toast.LENGTH_LONG).show();
                }

                @Override
                public void onNothingSelected(AdapterView<?> parentView) {
                    //   Toast.makeText(parentView.getContext(), "herf", Toast.LENGTH_LONG).show();
                }
            });

            buttonStart.setOnClickListener(new Button.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // TODO Auto-generated method stub

                    if (cmbPruebas.getSelectedItem().toString().equals("Carge el Campeonato.")) {
                        Msgbox2("Carge primero el campeonato.");
                        return;
                    }

                    prueba item = (prueba) cmbPruebas.getSelectedItem();
                    String[] listaNadador;
                    prueba itemNadador = (prueba) cmbNadadores.getSelectedItem();
                    listaNadador = itemNadador.GetPrueba().split(" ");
                    SeriePrueba = listaNadador[1];
                    CallePrueba = listaNadador[3];
                    //String NadadorPrueba = "";

                    if (ListaCache.contains(itemNadador)) {

                        Msgbox2("Este nadador ya nadó.");
                        return;
                    }

                    Accion = "Guardar";
                    client = new SntpClient();

                    cmbPruebas.setEnabled(false);
                    cmbNadadores.setEnabled(false);
                    buttonLlegada.setText("Parciales");

                    buttonSalir.setEnabled(false);
                    buttonSalir.setBackgroundResource(R.drawable.btn_yellow);

                    // DB operation
                    if (listaNadador.length > 7) {
                        NadadorPrueba = listaNadador[5] + " " + listaNadador[6] + " " + listaNadador[7];
                    } else {
                        NadadorPrueba = listaNadador[5];
                    }

                    if (!TiempoAnterior.equals(mChronometer.getText().toString())) {

                        String TiempoTotal = mChronometer.getText().toString();
                        long TTotal = dateParseRegExp(TiempoTotal);
                        long TAnterior = dateParseRegExp(TiempoAnterior);
                        long TiempoParcial = TTotal - TAnterior;
                        Integer Parcial = (Vueltas + 1) * 2 * Integer.parseInt(appState.getPiscina());
                        String TiempoMarca;
                        TiempoMarca = String.valueOf(Parcial) + "-" + TiempoTotal + "-" + TimetoText(TiempoParcial);
                        TiempoMarca += "-" + ResBrazadas;

                        createDataCrono(0, NadadorPrueba, TiempoMarca);
                        listView.setAdapter(adapter);
                    }

                    IdPrueba = item.GetId(); //String.valueOf(item);
                    SW.Pruebas sw = new SW.Pruebas();
                    if (Vueltas == -1) {
                        TiempoAnterior = "00:00:00";
                        if (appState.getMaestro().equals("Si")) {
                            //   ahora1 = Calendar.getInstance();
                            mChronometer.start(0);
                            if (client.requestTime("0.es.pool.ntp.org", 300)) {
                                // if (appState.getClientInit()) {

                                TimeServidorAhora = client.getNtpTime() - client.getRoundTripTime();
                                //  TimeServidorAhora = appState.getClient().getNtpTime() - appState.getClient().getRoundTripTime();

                            }

                            long TiempoLocal = TimeServidorAhora;//ahora1.getTimeInMillis();

                            //mChronometer.start(0);
                            sw.SetPruebaInicio("" + (TiempoLocal), IdPrueba, SeriePrueba, NombreGrupo);

                            Vueltas = 0;
                        } else {

                            String TiempoInicio = sw.GetTiempoPrueba(IdPrueba, SeriePrueba, NombreGrupo);
                            //     ahora1 = Calendar.getInstance();

                            if (client.requestTime("0.es.pool.ntp.org", 300)) {
//                            if (appState.getClientInit()) {

                                TimeServidorAhora = client.getNtpTime() - client.getRoundTripTime();
                                //                              TimeServidorAhora = appState.getClient().getNtpTime() - appState.getClient().getRoundTripTime();

                            }
                            long TiempoLocal = TimeServidorAhora;//ahora1.getTimeInMillis(); 

                            long TiempoRemoto = Long.valueOf(TiempoInicio);

                            if (TiempoRemoto != 0) {
                                lastPause = TiempoLocal - TiempoRemoto;
                                mChronometer.start(Math.abs(lastPause));
                            } else {
                                mChronometer.start(0);
                            }

                            Vueltas = 0;

                        }

                        String[] lista;
                        String Estilos = cmbPruebas.getSelectedItem().toString();
                        lista = Estilos.split(" ");
                        appState.setDistancia(lista[2]);

                        buttonStart.setText("Vuelta (" + Vueltas + "/" + appState.getTotalVueltas() + ")");

                        buttonStart.setBackgroundResource(R.drawable.btn_green);
                        LimpiarMarcador();
                    } else {
                        if (Vueltas == appState.getTotalVueltas() - 1) {
                            // mChronometer.stop();

                            ListaCache.add(itemNadador);

                            cmbPruebas.setEnabled(true);
                            cmbNadadores.setEnabled(true);
                            buttonLlegada.setText("Clasificacion");

                            buttonSalir.setEnabled(true);
                            buttonSalir.setBackgroundResource(R.drawable.btn_red);
                            buttonStart.setBackgroundResource(R.drawable.btn_blue);
                        }
                        // mChronometer.setBase(mChronometer.getBase() + SystemClock.elapsedRealtime() - lastPause);
                        //  mChronometer.start();
                        // Accion="Guardar";
                        new DownloadTask2().execute("");

                        pd = ProgressDialog.show(context, "Por favor espere",
                                "Guardando datos.", true, false);
                    }

                }
            });

            buttonLlegada.setOnClickListener(new Button.OnClickListener() {
                @Override
                public void onClick(View v) {
                    // TODO Auto-generated method stub

//                    if  buttonSalir.getEnabled {
//                        
//                    }
                    // Accion = "Llegada";
                    Accion = buttonLlegada.getText().toString();

                    LimpiarMarcador();
                    new DownloadTask2().execute("");
                    pd = ProgressDialog.show(context, "Por favor espere",
                            "Consultando la Llegada.", true, false);

                }
            });

            buttonSalir.setOnClickListener(new Button.OnClickListener() {
                @Override
                public void onClick(View v) {
                    appState.setListaPruebas(null);
                    appState.setListaPruebasInicio(null);
                    appState.setListaCampeonatos(null);
                    // dataAdapter.clear();
                    // dataAdapter3.clear();
                    finish();

                }
            });

            // int item = cmbPruebas.getSelectedItemPosition();
            // p=item;
        }
    }

    public void MessageBox(String message) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }

    //Tarea en Background
    private class DownloadTask2 extends AsyncTask<String, Void, Object> {

        protected Integer doInBackground(String... args) {
            if (Accion.equals("Cargar")) {
//	                SW.Pruebas sw=new SW.Pruebas();
//                        res.clear();
//                        res.addAll(sw.GetPruebas());    

                for (int i = 0; i < ListCompeticiones.size(); i++) {
                    if (ListCompeticiones.get(i).GetCompeticion().contains(Campeonato)) {
                        Campeonato = ListCompeticiones.get(i).GetId();
                    }
                }

                // Campeonato = "2";
                SW.Pruebas sw = new SW.Pruebas();
                appState.setListaPruebas(sw.GetPruebas(Campeonato));
            } else if (Accion.equals("CargarNadador")) {
//	               
                SW.Pruebas sw = new SW.Pruebas();
                appState.setListaPruebasInicio(sw.GetPruebasNadadorInicio(GIDPrueba));

            } else if (Accion.equals("CargarCompeticiones")) {
//	               
                SW.Pruebas sw = new SW.Pruebas();
                appState.setListaCampeonatos(sw.GetCampeonatos("PONTEVEDRA"));

            } else if (Accion.equals("Guardar")) {
                if (Vueltas == appState.getTotalVueltas() - 1) {
                    mChronometer.stop();
//                            buttonStart.setBackgroundResource(R.drawable.btn_blue);
                }
                SW.Pruebas sw = new SW.Pruebas();
                String TiempoTotal = mChronometer.getText().toString();
                Vueltas++;
                //Button BStop =(Button)findViewById(R.id.buttonstop);

//                Spinner sp3 = (Spinner) findViewById(R.id.BuscarCalle);
//                String CalleString = null;
//                CalleString = sp3.getSelectedItem().toString();
//                String[] Calle;
//                Calle = CalleString.split(" ");
                long TTotal = dateParseRegExp(TiempoTotal);
                long TAnterior = dateParseRegExp(TiempoAnterior);

                //  long TiempoParcial=dateTotal.getTime()-dateAnterior.getTime();
                long TiempoParcial = TTotal - TAnterior;
                //
                String TiempoMarca;
                Integer Parcial = Vueltas * 2 * Integer.parseInt(appState.getPiscina());

                TiempoMarca = "'" + String.valueOf(Parcial) + "-" + TiempoTotal + "-" + TimetoText(TiempoParcial) + "'";

                sw.SetCrono(String.valueOf(Vueltas), CallePrueba, TiempoMarca, IdPrueba, NombreGrupo, SeriePrueba);

                TiempoAnterior = TiempoTotal;

            } else if (Accion.equals("Parciales")) {

                SW.Pruebas sw = new SW.Pruebas();
                ResParcial.clear();
                ResParcial.addAll(sw.GetCronoPrueba(IdPrueba, NombreGrupo, SeriePrueba));

//                        
            } else if (Accion.equals("Clasificacion")) {

                SW.Pruebas sw = new SW.Pruebas();
                ResParcial.clear();
                ResParcial.addAll(sw.GetCronoPruebaFinal(IdPrueba, NombreGrupo));

//                        
            }

            return 1;
        }

        @Override
        protected void onPostExecute(Object result) {
            //Se elimina la pantalla de por favor espere.
            pd.dismiss();
            //Se muestra mensaje con la respuesta del servicio web  
            if (Accion.equals("Cargar")) {
                dataAdapter.clear();
                res = appState.getListaPruebas();

                dataAdapter.addAll(res);
                cmbPruebas.setAdapter(dataAdapter);
            } else if (Accion.equals("CargarNadador")) {
                dataAdapter3.clear();
                res2 = appState.getListaPruebasInicio();
                dataAdapter3.addAll(res2);
                cmbNadadores.setAdapter(dataAdapter3);

            } else if (Accion.equals("Guardar")) {
                // buttonStop.setText("Vuelta ("+ Vueltas +")");

                if (Vueltas < appState.getTotalVueltas()) {
                    buttonStart.setText("Vuelta (" + Vueltas + "/" + appState.getTotalVueltas() + ")");
                } else {
                    buttonStart.setText("Iniciar");
                    Vueltas = -1;
                }

            } else if (Accion.equals("Llegada") || Accion.equals("Parciales") || Accion.equals("Clasificacion")) {
                Group group;
                for (int i = 0; i < ResParcial.size(); i++) {


                    String[] listaNadador;

                    listaNadador = ResParcial.get(i).toString().split(" ");


                    createDataCrono(i, "Antonio" + i, listaNadador[0] + "-34.5");


//                    if (i == 0) {
//                        txtCalle0.setText(" 1º " + ResParcial.get(i).toString());
//                        BDetalle0.setVisibility(0);
//                    }
//                    if (i == 1) {
//                        txtCalle1.setText(" 2º " + ResParcial.get(i).toString());
//                        BDetalle1.setVisibility(0);
//                    }
//                    if (i == 2) {
//                        txtCalle2.setText(" 3º " + ResParcial.get(i).toString());
//                        BDetalle2.setVisibility(0);
//                    }
//                    if (i == 3) {
//                        txtCalle3.setText(" 4º " + ResParcial.get(i).toString());
//                        BDetalle3.setVisibility(0);
//                    }
//                    if (i == 4) {
//                        txtCalle4.setText(" 5º " + ResParcial.get(i).toString());
//                        BDetalle4.setVisibility(0);
//                    }
//                    if (i == 5) {
//                        txtCalle5.setText(" 6º " + ResParcial.get(i).toString());
//                        BDetalle5.setVisibility(0);
//                    }
//                    if (i == 6) {
//                        txtCalle6.setText(" 7º " + ResParcial.get(i).toString());
//                        BDetalle6.setVisibility(0);
//                    }
//                    if (i == 7) {
//                        txtCalle7.setText(" 8º " + ResParcial.get(i).toString());
//                        BDetalle7.setVisibility(0);
//                    }
//                    if (i == 8) {
//                        txtCalle8.setText(" 9º " + ResParcial.get(i).toString());
//                        BDetalle8.setVisibility(0);
//                    }
//                    if (i == 9) {
//                        txtCalle9.setText("10º " + ResParcial.get(i).toString());
//                        BDetalle9.setVisibility(0);
//                    }
                }
            }
            listView.setAdapter(adapter);
            super.onPostExecute(result);
        }
    }

//public boolean onKeyDown(int keyCode, KeyEvent event) {
//    if (keyCode == KeyEvent.KEYCODE_BACK) {
//        moveTaskToBack(true);
//        return true;
//    }
//    return super.onKeyDown(keyCode, event);
//}    
    private void construirMenu(Menu menu) {
//        menu.add(Menu.NONE, MNU_OPC1, Menu.NONE, "Opcion1")
//                .setIcon(android.R.drawable.ic_menu_preferences);

        SubMenu smnuMaestro = menu.addSubMenu(Menu.NONE, MNU_OPC1, Menu.NONE, "Configuración")
                .setIcon(android.R.drawable.ic_menu_agenda);

        SubMenu smnuCamp = menu.addSubMenu(Menu.NONE, MNU_OPC2, Menu.NONE, "Campeonatos")
                .setIcon(android.R.drawable.ic_menu_compass);

        SubMenu smnu = menu.addSubMenu(Menu.NONE, MNU_OPC3, Menu.NONE, "Piscina")
                .setIcon(android.R.drawable.ic_menu_agenda);

        smnuMaestro.add(GRUPO_MENU_3, SMNU_OPC3_MAESTRO, Menu.NONE, "Nombre del Grupo");
        smnuMaestro.add(GRUPO_MENU_1, SMNU_OPC1_MAESTRO, Menu.NONE, "Crono Salida");
        smnuMaestro.add(GRUPO_MENU_1, SMNU_OPC2_MAESTRO, Menu.NONE, "Crono Calle");

        smnu.add(GRUPO_MENU_1, SMNU_OPC1, Menu.NONE, "25 Metros");
        smnu.add(GRUPO_MENU_1, SMNU_OPC2, Menu.NONE, "50 Metros");

        ListCompeticiones = appState.getListaCampeonatos();

        for (int i = 0; i < ListCompeticiones.size(); i++) {
            smnuCamp.add(GRUPO_MENU_2, SMNUCAM_OPC1, Menu.NONE, ListCompeticiones.get(i).GetCompeticion());
        }

        //smnuCamp.add(GRUPO_MENU_2, SMNUCAM_OPC2, Menu.NONE, "Promesas do Lerez");
        smnuMaestro.setGroupCheckable(GRUPO_MENU_2, true, true);
        smnuMaestro.setGroupCheckable(GRUPO_MENU_1, true, true);

        smnu.setGroupCheckable(GRUPO_MENU_2, true, true);

        //Establecemos la selección exclusiva para el grupo de opciones
        smnu.setGroupCheckable(GRUPO_MENU_1, true, true);
        ;

        if (appState.getMaestro().contains("Si")) {
            smnuMaestro.getItem(1).setChecked(true);

        } else {
            smnuMaestro.getItem(2).setChecked(true);

        }

        if (appState.getPiscina().contains("25")) {
            smnu.getItem(0).setChecked(true);
        } else {
            smnu.getItem(1).setChecked(true);
        }

        //Marcamos la opción seleccionada actualmente
//        if (opcionSeleccionada == 1) {
//            smnu.getItem(0).setChecked(true);
//        } else if (opcionSeleccionada == 2) {
//            smnu.getItem(1).setChecked(true);
//        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        construirMenu(menu);

        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {

            //...
            //Omito el resto de opciones por simplicidad
            case SMNU_OPC1:
                opcionSeleccionada = 1;
                appState.setPiscina("25");
                item.setChecked(true);
                return true;
            case SMNU_OPC2:

                appState.setPiscina("50");

                opcionSeleccionada = 2;
                item.setChecked(true);
                return true;

            case SMNU_OPC1_MAESTRO:

                appState.setMaestro("Si");
                linearLayout01.setBackgroundColor(Color.BLACK);
                opcionSeleccionada = 3;
                item.setChecked(true);
                return true;

            case SMNU_OPC2_MAESTRO:

                appState.setMaestro("No");
                linearLayout01.setBackgroundColor(Color.BLUE);
                opcionSeleccionada = 4;
                item.setChecked(true);
                return true;
            case SMNU_OPC3_MAESTRO:

                ObtenerGrupo();

                return true;

            case SMNUCAM_OPC1:

                Campeonato = item.getTitle().toString();

                Accion = "Cargar";
                new MainActivity.DownloadTask2().execute("");
                pd = ProgressDialog.show(context, "Por favor espere",
                        "Consultando Pruebas.", true, false);

//                dataAdapter = new ArrayAdapter<prueba>(this, android.R.layout.simple_spinner_item, res);
//                dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                opcionSeleccionada = 1;
                item.setChecked(true);
                return true;

            case SMNUCAM_OPC2:
                opcionSeleccionada = 2;
                item.setChecked(true);
                return true;

        }
        return false;
    }

    private void showMsg(String message) {
//        Toast msg = Toast.makeText(this, message, Toast.LENGTH_LONG);
//     
//        msg.setGravity(Gravity.CENTER, msg.getXOffset() / 2,
//                msg.getYOffset() / 2);
//        msg.show();
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        int action = event.getAction();
        int keyCode = event.getKeyCode();
        switch (keyCode) {
            case KeyEvent.KEYCODE_VOLUME_UP:
                if (action == KeyEvent.ACTION_DOWN) {
                    buttonStart.performClick();
                    //TODO
                }
                return true;
            case KeyEvent.KEYCODE_VOLUME_DOWN:
                if (action == KeyEvent.ACTION_DOWN) {
                    //buttonStart.performClick();
                    CalcularBrazadas();
                    //TODO
                }
                return true;
            default:
                return super.dispatchKeyEvent(event);
        }
    }

//    @Override
//    public boolean dispatchKeyEvent(KeyEvent event) {
//        int keyCode = event.getKeyCode();
//        switch (keyCode) {
//            case KeyEvent.KEYCODE_VOLUME_UP:
//            case KeyEvent.KEYCODE_VOLUME_DOWN:
//                 buttonStart.performClick();
//                 
//                return true;
//               
//            default:
//                return super.dispatchKeyEvent(event);
//        }
//    }
//
//    @Override
//    public boolean dispatchKeyEvent(KeyEvent event) {
//        int keyCode = event.getKeyCode();
//        switch (keyCode) {
//            // case KeyEvent.KEYCODE_VOLUME_UP:
//            case KeyEvent.KEYCODE_VOLUME_DOWN:
//                buttonStart.performClick();
//                return false;
//            default:
//                return super.dispatchKeyEvent(event);
//        }
//    }
//    @Override
//    public boolean onKeyUp(int keyCode, KeyEvent event) {
//
//        if ((keyCode == KeyEvent.KEYCODE_CAMERA)
//                || (keyCode == KeyEvent.KEYCODE_MENU)
//                || (keyCode == KeyEvent.KEYCODE_HOME)
//                || (keyCode == KeyEvent.KEYCODE_VOLUME_DOWN)) {
//
//          //  buttonStart.performClick();
//
//            return false;
//        } else {
//            return super.onKeyUp(keyCode, event);
//        }
//
//
//    }
    public static long dateParseRegExp(String period) {
        Matcher matcher = pattern.matcher(period);
        if (matcher.matches()) {
            return Long.parseLong(matcher.group(1)) * 60000
                    + Long.parseLong(matcher.group(2)) * 1000
                    + Long.parseLong(matcher.group(3));
        } else {
            throw new IllegalArgumentException("Invalid format " + period);
        }
    }

    private String TimetoText(long timeElapsed) {

        DecimalFormat df = new DecimalFormat("00");

        //  int hours = (int)(timeElapsed / (3600 * 1000));
        //   int remaining = (int)(timeElapsed % (3600 * 1000));
        int minutes = (int) (timeElapsed / (60 * 1000));
        int remaining = (int) (timeElapsed % (60 * 1000));

        int seconds = (int) (remaining / 1000);
        remaining = (int) (remaining % (1000));

        int milliseconds = (int) (((int) timeElapsed % 100) / 1);

        String text = "";

//                if (hours > 0) {
//                 text += df.format(hours) + ":";
//                }
        text += df.format(minutes) + ":";
        text += df.format(seconds) + ":";
        text += df.format(milliseconds);
        // text += df.format(Integer.toString(milliseconds));

        return text;
    }

    private void LimpiarMarcador() {
        groups.clear();
//        txtCalle0.setText("");
//        txtCalle1.setText("");
//        txtCalle2.setText("");
//        txtCalle3.setText("");
//        txtCalle4.setText("");
//        txtCalle5.setText("");
//        txtCalle6.setText("");
//        txtCalle7.setText("");
//        txtCalle8.setText("");
//        txtCalle9.setText("");
//
//        BDetalle0.setVisibility(View.INVISIBLE);
//        BDetalle1.setVisibility(View.INVISIBLE);
//        BDetalle2.setVisibility(View.INVISIBLE);
//        BDetalle3.setVisibility(View.INVISIBLE);
//        BDetalle4.setVisibility(View.INVISIBLE);
//        BDetalle5.setVisibility(View.INVISIBLE);
//        BDetalle6.setVisibility(View.INVISIBLE);
//        BDetalle7.setVisibility(View.INVISIBLE);
//        BDetalle8.setVisibility(View.INVISIBLE);
//        BDetalle9.setVisibility(View.INVISIBLE);
    }

    public static boolean verificaConexion(Context ctx) {
        boolean bConectado = false;
        ConnectivityManager connec = (ConnectivityManager) ctx
                .getSystemService(Context.CONNECTIVITY_SERVICE);
        // No sólo wifi, también GPRS
        NetworkInfo[] redes = connec.getAllNetworkInfo();
        // este bucle debería no ser tan ñapa
        for (int i = 0; i < 2; i++) {
            // ¿Tenemos conexión? ponemos a true
            if (redes[i].getState() == NetworkInfo.State.CONNECTED) {
                bConectado = true;
            }
        }
        return bConectado;
    }

    public void ObtenerGrupo() {
        AlertDialog.Builder alert = new AlertDialog.Builder(this);

        alert.setTitle("Cronómetro");
        alert.setMessage("Nombre del grupo para cronometrar juntos.");

// Set an EditText view to get user input 
        final EditText input = new EditText(this);
        alert.setView(input);

        alert.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int whichButton) {
                // String value = 
                NombreGrupo = input.getText().toString();
                setTitle("Cronómetro. Grupo: - " + NombreGrupo);
                // Do something with value!
            }
        });

        alert.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int whichButton) {
                // Canceled.
            }
        });

        alert.show();
    }

    public void Msgbox(String message) {
        AlertDialog alertDialog;
        alertDialog = new AlertDialog.Builder(this).create();
        alertDialog.setTitle("Cronómetro");
        alertDialog.setMessage(message);
        alertDialog.setButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {

                //here you can add functions
                finish();
            }
        });
        //  alertDialog.setButton(message, null);
        alertDialog.show();
    }

    public void Msgbox2(String message) {
        AlertDialog alertDialog;
        alertDialog = new AlertDialog.Builder(this).create();
        alertDialog.setTitle("Cronómetro");
        alertDialog.setMessage(message);
        alertDialog.setButton("OK", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                //here you can add functions
            }
        });
        //  alertDialog.setButton(message, null);
        alertDialog.show();
    }

    public void createDataCrono(int IDNadador, String Nadador, String Tiempo) {
        Group group;
        if (groups.size() > 0) {
            for (int i = 0; i < groups.size(); i++) {
                int key = groups.keyAt(i);
                // get the object by the key.
                Group obj = groups.get(key);

                if (obj.nombre.equals(Nadador)) {
                    obj.tiempo = Tiempo;
                    obj.nombre = Nadador;
                    obj.children.add(Tiempo);
                    return;
                }
            }
        }

        group = new Group(Nadador, Tiempo);
        group.children.add(Tiempo);
        groups.append(IDNadador, group);


    }

    public void CalcularBrazadas() {

        if (TiempoBrazadas == 0) {
            ResBrazadas = 0;
            TiempoBrazadas = dateParseRegExp(mChronometer.getText().toString());
        } else {
            long TiempoBrazadaAux = dateParseRegExp(mChronometer.getText().toString());
            long aux = TiempoBrazadaAux - TiempoBrazadas;
            // TimetoText(aux);
            ResBrazadas = (double) (3 * 60000) / aux;
            ResBrazadas = roundTwoDecimals(ResBrazadas);
            TiempoBrazadas = 0;
        }

    }

    double roundTwoDecimals(double d) {
        DecimalFormat twoDForm = new DecimalFormat("#.##");
        return Double.valueOf(twoDForm.format(d));
    }

    public void createData() {
        Group group;

        group = new Group("Martinez Antonio", "01:10:40");
        group.children.add("50 00:29:2 Barazadas 39");
        group.children.add("100 01:10:40 Barazadas 29");
        groups.append(0, group);

        group = new Group("Gómez Martinez", "01:10:25");
        group.children.add("50 00:30:21 Barazadas 39");
        group.children.add("100 01:10:4 Barazadas 50");
        groups.append(1, group);
    }
}
