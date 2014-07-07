class Line {
  float lerpVal = 0.5;

  int years;
  
  PVector pos = new PVector();
  PVector tpos = new PVector();

  float cx;
  float cy;
  
  PVector opacity = new PVector();
  PVector topacity = new PVector();

  int index = 1;

  Line() {
  }
 void update() {

    pos.x = lerp(pos.x, tpos.x, lerpVal);
    pos.y = lerp(pos.y, tpos.y, lerpVal);

//    opacity.x = lerp(opacity.x, topacity.x, lerpVal);
  }


  void render() {
    pushMatrix();
    translate(cx, cy);

    ellipse(pos.x, pos.y, 10, 10);
    
    popMatrix();
  }
}

