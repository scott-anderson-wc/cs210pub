/** A GUI-based color editor 
    @author Lyn Turbak
    @author [lyn, 04/00] Created for CS111 Spring'00
    @author [lyn, 04/03/07] Adapted to CS230 Spring'07 (Java 1.5 and Swing)
    @author [lyn, 11/20/07] Added field and slider for integer representation of colors
                            (as used in Fall'07 Lec. 20 and PS9). 
*/

import java.awt.*; // Import Java's original AbstractWindowToolkit
import java.awt.event.*; // Import events from Java's original AbstractWindowToolkit
import javax.swing.*; // Import events Java's Swing GUI classes
import javax.swing.event.*; // Import events Java's Swing GUI classes (needed for ChangeListener)

public class ColorPad extends JApplet {
 
  // Instance variables needed for the GUI
  private JPanel colorPad; // Where colors are drawn

  // Text fields for RGB components. This array is indexed by the constants Red, Green, and Blue,
  // defined below. Alternatively, could have defined three separate JTextFields, but then it would
  // not be possible to iterate over them easily. 
  private JTextField [] RGBFields = new JTextField[3]; 
  private JSlider [] RGBSliders = new JSlider[3]; 
  private JTextField intColorField;
  private JSlider intColorSlider;

 
  // The following help index Red, Green, Blue by integers: 
  private static final int Red = 0;
  private static final int Green = 1;
  private static final int Blue = 2;
  private static Color [] colors = {Color.red, Color.green, Color.blue};

  // This class has no explicit constructor method
  // (a nullary one is automatically defined by Java.)
  // All creation of user interface components is done in the init() method. 

  // ----------------------------------------------------------------------------
  // Instance Methods for layout and behavior
  // (all behavior is specified by anonymous inner classes.)

  public void init () {
    this.add(makeColorPad(), BorderLayout.CENTER); // Make the color pad the central component of the GUI.
    this.add(makeRGBPanel(), BorderLayout.SOUTH); // Add the RGB panel at the bottom of the GUI.
    this.add(makeIntColorPanel(), BorderLayout.NORTH);
  }
  
  private JPanel makeIntColorPanel () {
    JPanel intColorPanel = new JPanel();
    intColorPanel.setLayout(new BorderLayout());
    intColorField = new JTextField(9);
    intColorField.setText("-1");
    intColorField.setBackground(Color.white);
    intColorField.setFont(new Font("TimesRoman", Font.BOLD, 30));
    intColorPanel.add(intColorField, BorderLayout.WEST);
    intColorSlider = new JSlider(JSlider.HORIZONTAL, -16777216, -1, -1);
    intColorSlider.setMajorTickSpacing(16777215);
    intColorSlider.setOpaque(true);
    intColorSlider.setPaintTicks(true);
    intColorSlider.setPaintLabels(true);
    intColorPanel.add(intColorSlider, BorderLayout.CENTER);
    
    // Specify what to do when slider changes. 
    intColorSlider.addChangeListener(new ChangeListener(){
      public void stateChanged (ChangeEvent e) {
        int colorVal = (int) intColorSlider.getValue();
        Color newColor = new Color(colorVal, true);
        RGBFields[Red].setText(Integer.toString(newColor.getRed()));
        RGBFields[Green].setText(Integer.toString(newColor.getGreen()));
        RGBFields[Blue].setText(Integer.toString(newColor.getBlue()));
        updateFieldsSlidersAndPad();
      }
    }); 
      
    // Specify what do do when text field changes 
    intColorField.addActionListener(new ActionListener(){
      // This is called when "Return" is pressed in field. 
      public void actionPerformed (ActionEvent e) {
        try {
          int newValue = Integer.parseInt(intColorField.getText());
          if ((newValue < -16777216) || (newValue > -1)) {// new value is out of range
            intColorField.setText("-1"); // set to default value
          }
        } catch (NumberFormatException ex) {
          // new value is ill-formatted; set to default
          intColorField.setText("-1");
        }
        // Ensure that slider represents current value and update color appropriately
        int newValue = Integer.parseInt(intColorField.getText());
        Color newColor = new Color(newValue, true);
        RGBFields[Red].setText(Integer.toString(newColor.getRed()));
        RGBFields[Green].setText(Integer.toString(newColor.getGreen()));
        RGBFields[Blue].setText(Integer.toString(newColor.getBlue()));
        updateFieldsSlidersAndPad();
      }});
                                 
      return intColorPanel; 
      }
                                                             
 private JPanel makeColorPad() {
    colorPad = new JPanel() { // Create an instance of a new anonymous subclass of 
                       // JPanel that knows how to paint itself differently.
 public void paintComponent (Graphics g) {
   //  super.paintComponent(g);
   Dimension d = colorPad.getSize();
   Color c = getCurrentColor();
   g.setColor(c);
   g.fillRect(0, 0, d.width, d.height); 
   // Note: replacing the above fillRect call by the 
   // the commented out code below illustrates the strange
   // interaction between paintComponent() and double-buffering
   // in Java Swing. It can be "fixed" by either:
   // 
   // (1) painting the entire rectangle (for a conceptually 
   //     opaque component); or
          // 
   // (2) invoking super.paintComponent(g) before doing any
   //     custom painting. 
          // 
          // See the custom painting section of the Java Swing Tutorial
   // for details on paintComponent().
   
   // g.fillRect(d.width/4, d.height/4, d.width/2, d.height/2); 

 }
      }; 
    // colorPad.setOpaque(true);
    // colorPad.setBackground(Color.black);
    return colorPad;
  }

  // Create the control panel with three fields and three sliders
  private JPanel makeRGBPanel () {
    JPanel RGBPanel = new JPanel();
    RGBPanel.setLayout(new GridLayout(0,1)); // One column of color panels
    for (int i = 0; i < 3; i++) {
      RGBPanel.add(makeColorPanel(i));
    } 
    return RGBPanel;
  }

  // Create a panel with one field and one slider that controls the color at the given index.
  private JPanel makeColorPanel (final int index) {
    // Must declare index and local variables as "final" (i.e., constant)
    // in order to use them in anonymous inner class for ChangeListener.

    // Make the control panel for this color
    JPanel colorPanel = new JPanel();
    colorPanel.setLayout(new BorderLayout()); 

    // Create text field to hold color number
    final JTextField colorField = makeField();
    RGBFields[index] = colorField; 
    colorPanel.add(colorField, BorderLayout.WEST);

    // Create slider to represent color number
    final JSlider colorSlider = new JSlider(JSlider.HORIZONTAL, 0, 255, 255);
    RGBSliders[index] = colorSlider;
    colorSlider.setMajorTickSpacing(50);
    colorSlider.setBackground(colors[index]); 
    colorSlider.setOpaque(true);
    colorSlider.setPaintTicks(true);
    colorSlider.setPaintLabels(true);
    colorPanel.add(colorSlider, BorderLayout.CENTER);
    
    // Specify what to do when slider changes. 
    colorSlider.addChangeListener(new ChangeListener(){
      public void stateChanged (ChangeEvent e) {
        int colorVal = (int) colorSlider.getValue();
        colorField.setText(Integer.toString(colorVal));
        updateFieldsSlidersAndPad();
      }
    }); 
      
    // Specify what do do when text field changes 
    colorField.addActionListener(new ActionListener(){
      // This is called when "Return" is pressed in field. 
      public void actionPerformed (ActionEvent e) {
        try {
          int newValue = Integer.parseInt(colorField.getText());
          if ((newValue < 0) || (newValue > 255)) {// new value is out of range
            colorField.setText("255"); // set to default value
          }
        } catch (NumberFormatException ex) {
          // new value is ill-formatted; set to default
          colorField.setText("255");
        }
        // Ensure that slider represents current value and update color appropriately
        updateFieldsSlidersAndPad();
      }
    });
    return colorPanel;
  }

  // Encapsulates the properties shared by all the text fields. 
  private JTextField makeField () { 
    JTextField textField = new JTextField("255");
    textField.setBackground(Color.white);
    textField.setFont(new Font("TimesRoman", Font.BOLD, 30));
    return textField;
  }

  // ----------------------------------------------------------------------------
  // Auxiliary instance methods 

  // Determine current color from contents of three text fields.
  private Color getCurrentColor() {
    return new Color (Integer.parseInt(RGBFields[Red].getText()), 
        Integer.parseInt(RGBFields[Green].getText()), 
        Integer.parseInt(RGBFields[Blue].getText()));

  }
  
  // Update all fields, sliders, and pad to be consistent with current color state.
  private void updateFieldsSlidersAndPad() {
    Color current = getCurrentColor();
    int intColor = current.getRGB();
    intColorField.setText(Integer.toString(intColor));
    intColorSlider.setValue(intColor);
    for (int i = 0; i < 3; i++) {
      int colorVal = Integer.parseInt(RGBFields[i].getText());
      RGBSliders[i].setValue(colorVal);
      RGBSliders[i].setBackground(scaleColor(colorVal, colors[i])); 
    }
    colorPad.repaint();
  }  

  // Scale the given color by a number between 0 -- 255.
  private static Color scaleColor (int i, Color c) {
    return new Color ((i * c.getRed()) / 255, 
        (i * c.getGreen()) / 255, 
        (i * c.getBlue()) / 255);

  }

  // ----------------------------------------------------------------------------
  // Standard boilerplate class methods for wrapping applet in an application JFrame. 

  // Create the GUI applet and show it.  
  private static void createAndShowGUI() {
    
    // Enable window decorations. 
    JFrame.setDefaultLookAndFeelDecorated(true); 

    //Create and set up the window.
    JFrame frame = new JFrame("ColorPad");
    
    frame.setSize(600, 600); // Size for ColorPad window
    
    // Specify that the close button exits application. 
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

    ColorPad applet = new ColorPad();
    applet.init(); 
    
    // frame.getContentPane().add(contents, BorderLayout.CENTER);
    frame.add(applet, BorderLayout.CENTER);

    //Display the window.
    frame.setVisible(true);
  }

  public static void main(String[] args) {
    //Schedule a job for the event-dispatching thread:
    //creating and showing this application's GUI.
    javax.swing.SwingUtilities.invokeLater(new Runnable() {
      public void run() {
        createAndShowGUI();
      }
    });
  }

 
}
