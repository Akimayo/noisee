# Generators
The custom tool used to generated is available for download below. It is a [Processing](https://processing.org) project, _Processing_ is a framework similar to _p5.js_, which is used for this app, but built on _Java_.

The program's entry point is the `generators.pde` file. This file for the most part contains configurable options of rendering (`P2D` or `P3D`) and canvas sizes, and the core of the app, e. g. initialization, main render loop and keyboard input processing. The visual outputs themselves are generated in the rest of the files (the classes).

Upon launching the program or pressing the right arrow key in 2D mode, a menu of all currently available visualizations is shown on the left side. Each item in the menu has a key associated with it, pressing the key will set the visualization. In 3D mode, the menu is not displayed, but the controls work the same way (keys are `a`, `b` and `c`). Pressing the spacebar saves the contents of the canvas into the `results/` directory (a message containing the file name is also displayed).

The code is not commented.
