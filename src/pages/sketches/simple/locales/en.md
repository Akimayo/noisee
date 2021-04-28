> ![Introduction](CompassNW), ![1D](GridViewLarge), ![P2D](MapLayers), ![Simple](StorageOptical)  
> ![Easy](Sunny)
# Start
This is the simplest showcase of gradient noise. You can see a graph of some function which seems to be basically random. Actually random (pseudorandom) function would have the graph wildly jump from one point to another (try setting **step size** and **amplitude** to maximum for a somewhat similar result), but here the values change smoothly from one another, especially when you try setting a lower **step size**.
## Controls
- **Step Size** tells the algorithm what change in the input of the noise function corresponds to a single pixel in the horizontal axis (_&#916;x_). Smaller step size makes for a smoother result while, in a way, zooming in.
- **Amplitude** sets the height of the noise. It multiplies the output of the noise and therefore changes the range of values.
