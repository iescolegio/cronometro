/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package mga.cronometro;

/**
 *
 * @author administrador
 */
//package info.androidhive.androidsplashscreentimer;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.TextView;
import entidades.Competicion;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SplashScreen extends Activity {

    String now_playing, earned;
    private MyApp appState;
    private TextView txtCargando;
    private boolean ConInternet = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        appState = ((MyApp) getApplicationContext());


        ConInternet = verificaConexion(this);
        if (ConInternet) {
            txtCargando = (TextView) findViewById(R.id.Cargando);
            //  txtCargando.setTextColor(R.drawable.btn_black);
            txtCargando.setTextColor(Color.BLACK);
            txtCargando.setText("Cargando Campeonatos...");
            // appState.getClientInit();
            /**
             * Showing splashscreen while making network calls to download
             * necessary data before launching the app Will use AsyncTask to
             * make http call
             */
            new PrefetchData().execute();

        }




    }

    /**
     * Async Task to make http call
     */
    private class PrefetchData extends AsyncTask<Void, Void, Void> {

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            // before making http calls        

        }

        @Override
        protected Void doInBackground(Void... arg0) {
            /*
             * Will make http call here This call will download required data
             * before launching the app
             * example:
             * 1. Downloading and storing in SQLite
             * 2. Downloading images
             * 3. Fetching and parsing the xml / json
             * 4. Sending device information to server
             * 5. etc.,
             //             */


            SW.Pruebas sw = new SW.Pruebas();
            appState.setListaCampeonatos(sw.GetCampeonatos("PONTEVEDRA"));

            try {
                Thread.sleep(5000);
            } catch (InterruptedException ex) {
                Logger.getLogger(SplashScreen.class.getName()).log(Level.SEVERE, null, ex);
            }


//            JsonParser jsonParser = new JsonParser();
//            String json = jsonParser
//                    .getJSONFromUrl("http://api.androidhive.info/game/game_stats.json");
// 
//            Log.e("Response: ", "> " + json);

//            if (json != null) {
//                try {
//                    JSONObject jObj = new JSONObject(json)
//                            .getJSONObject("game_stat");
//                    now_playing = jObj.getString("now_playing");
//                    earned = jObj.getString("earned");
// 
//                    Log.e("JSON", "> " + now_playing + earned);
// 
//                } catch (JSONException e) {
//                    // TODO Auto-generated catch block
//                    e.printStackTrace();
//                }
// 
//            }

            return null;
        }

        @Override
        protected void onPostExecute(Void result) {
            super.onPostExecute(result);
            // After completing http call
            // will close this activity and lauch main activity
            Intent i = new Intent(SplashScreen.this, MainActivity.class);
            //  i.putCharSequenceArrayListExtra("Competiciones", ListaCompeticiones);
            // i.putExtra("earned", earned);
            startActivity(i);

            // close this activity
            finish();
        }
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
}