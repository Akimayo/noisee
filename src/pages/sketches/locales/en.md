# Projects
Projects are individual showcases for use cases of procedurally generated gradient noise, here the _Perlin Noise_ algorithm. Every project shows some useful and/or usable application and provides an interactive playground to try them out.

By default, every project's initial settings are set so that it is not very computationally expensive and can be run even on slower devices. However, some of these projects are computationally expensive by nature and may cause unstable or slow behavior of your web browser. Projects which have settings that could significantly impact performance of your device always have the setting causing performace issues marked with a warning symbol.

All of the projects are suitable to be run on mobile devices. The size of the canvas however stays the same (usually HD, 1280×720px), which, when scaled down to fit a small screen, results in a significant loss in image quality.
## Tagging
Each projects has a series of tags underneath it. Tags can quickly tell you how fast or slow the project will run, which renderer it uses and what type of vector is used for the noise function. Here's what they mean:
- **![Introduction](CompassNW)** projects cover the basics. There is one introduction project for 1D, 2D and 3D noise.
- **![P2D](MapLayers)** projects use the simple P2D renderer to show you the results. These typically require less processing power and don't use your device's GPU.
- **![WebGL](ProductVariant)** is a render engine that utilizes your device's GPU. It is required for projects with 3D output (and is sometimes used by more complex 2D ones).
- **![Simple](StorageOptical)** projects can be run on a potato.
- **![Complex](SpeedHigh)** projects require more computational power and/or will take some time to compute. These usually have a quality setting, higher quality means more resource/time intesive.
- **![1D](GridViewLarge)** projects use a one-dimensional input and outputs are represented by height.
- **![2D](GridViewMedium)** projects work with a two-dimensional input and outputs are rendered as different colors or heights.
- **![3D](GridViewSmall)** projects take a three-dimensional vector and their represenation is whack.

There is also a tag for programmers, indicating the difficulty of the algorithm:
- **![Easy](Sunny)** algorithms are ideal for beginners; they are easy to undestand and don't involve many complex operations.
- **![Medium](Cloudy)** algorithms use operations which complete beginners probably won't understand, but experienced programmers should be able to follow along wihtout any special knowledge.
- **![Hard](Thunderstorms)** algorithms involve complex logic and specialized algorithms to achieve results. These will require either a long time to understand, or previous knowledge on the matter.

The **![Commented](Comment)** tag indicates that the source code is fully commented, including the functions of the [p5.js](https://p5js.org) library. You'll commonly find this one on the easier algorithms as I'm usually too lazy to fully comment the complex ones.
