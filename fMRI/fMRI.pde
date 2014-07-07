int[] answers;
Line [] lines;
int count;
boolean h = false;

void setup() {
  size(400, 400);
  smooth(8);
//  noStroke();
  fill(0);
  strokeWeight(.25);
  loadData(); //this function will load the data and do something with it
}

void draw() {
  background(255);
  for (int i = 0; i< count; i++) {
    lines[i].update();
    lines[i].render();
  }
  if (h){
    show();
  }
}

void loadData() {
  Table data = loadTable("diffusionMRI.csv", "header");
  count = data.getRowCount();

  answers = new int[data.getRowCount()];

  for (int i = 0; i < data.getRowCount(); i++) {
    answers[i] = data.getRow(i).getInt(2);
    println(answers[i]+"year");
  }

  lines = new Line[count]; 
  for (int i = 0; i< count; i++) {
    Line line = new Line();
    line.years = answers[i];
    lines[i]=line;
  }
}

void show() {

  for (int i = 0; i< count; i++) {
    if (lines[i] != null) {
      lines[i].opacity.x = 255;  // Apply transparency without changing color
      lines[i].topacity.x = 255;

      lines[i].cx = 0;
      lines[i].cy = 0; 
      
      float yPos = height/4+random(0,1)*height/2;
//      float yPos = map(lines[i].years, 1984, 2014, 10, height-10);
      lines[i].tpos.y = yPos;
      
      float xPos = map(lines[i].years, 1984, 2014, 10, width-10);
      lines[i].tpos.x = xPos;
    }
  }
}

void keyPressed() {
  if (key=='h') h = !h; 
}








