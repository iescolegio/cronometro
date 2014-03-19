/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package mga.cronometro;

/**
 *
 * @author moises
 */

import android.app.Activity;
import android.util.SparseArray;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.CheckedTextView;
import android.widget.TextView;
import android.widget.Toast;

public class MyExpandableListAdapter extends BaseExpandableListAdapter {

  private final SparseArray<Group> groups;
  public LayoutInflater inflater;
  public Activity activity;

  public MyExpandableListAdapter(Activity act, SparseArray<Group> groups) {
    activity = act;
    this.groups = groups;
    inflater = act.getLayoutInflater();
  }

  @Override
  public Object getChild(int groupPosition, int childPosition) {
    return groups.get(groupPosition).children.get(childPosition);
  }

  @Override
  public long getChildId(int groupPosition, int childPosition) {
    return 0;
  }

  @Override
  public View getChildView(int groupPosition, final int childPosition,
      boolean isLastChild, View convertView, ViewGroup parent) {
    final String children = (String) getChild(groupPosition, childPosition);
    String[] Lineas;
    TextView text = null;
    TextView textBrazadas = null;
    TextView textParcial = null;
    if (convertView == null) {
      convertView = inflater.inflate(R.layout.listrow_details, null);
    }
    Lineas = children.split("-");
    text = (TextView) convertView.findViewById(R.id.textView1);
    textBrazadas = (TextView) convertView.findViewById(R.id.textBrazadas);
    textParcial = (TextView) convertView.findViewById(R.id.textParcial);
    text.setText(Lineas[0]+" "+Lineas[1]);
    textParcial.setText("Parcial "+Lineas[2]);
    textBrazadas.setText("Brazadas "+Lineas[3]);
    convertView.setOnClickListener(new OnClickListener() {
      @Override
      public void onClick(View v) {
        Toast.makeText(activity, children,
            Toast.LENGTH_SHORT).show();
      }
    });
    return convertView;
  }

  @Override
  public int getChildrenCount(int groupPosition) {
    return groups.get(groupPosition).children.size();
  }

  @Override
  public Object getGroup(int groupPosition) {
    return groups.get(groupPosition);
  }

  @Override
  public int getGroupCount() {
    return groups.size();
  }

  @Override
  public void onGroupCollapsed(int groupPosition) {
    super.onGroupCollapsed(groupPosition);
  }

  @Override
  public void onGroupExpanded(int groupPosition) {
    super.onGroupExpanded(groupPosition);
  }

  @Override
  public long getGroupId(int groupPosition) {
    return 0;
  }

  @Override
  public View getGroupView(int groupPosition, boolean isExpanded,
      View convertView, ViewGroup parent) {
    if (convertView == null) {
      convertView = inflater.inflate(R.layout.listrow_group, null);
    }
    Group group = (Group) getGroup(groupPosition);
    ((CheckedTextView) convertView).setText(group.tiempo + " " + group.nombre);
    ((CheckedTextView) convertView).setChecked(isExpanded);
    return convertView;
  }

  @Override
  public boolean hasStableIds() {
    return false;
  }

  @Override
  public boolean isChildSelectable(int groupPosition, int childPosition) {
    return false;
  }
} 