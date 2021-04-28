> ![Introduction](CompassNW), ![2D](GridViewMedium), ![P2D](MapLayers), ![Complex](SpeedHigh)  
> ![Easy](Sunny)
# Noise Map
This project is a follow-up to [Start](/sketches/simple).

This image is generated in basically the same way as the previous project, but here, noise is evaluated in both axis, not just the one. Also, instead of height, this project uses color saturation - the redder the pixel, the higher the value of noise. Like before, you can try changing the **step size** to get smoother transitions between values (colors). The quality is so low because even though evaluating noise is not _that_ slow, doing it hundereds of thousands of times is bound to take a bit of time. Feel free to poke at the **quality** setting, just be careful with the top quality, that takes up to several seconds.
## Controls
- **Step Size** still corresponds to a change in the input of the noise function for every pixel, here in both axis (_&#916;x_ and _&#916;y_).
- **Quality** sets the size of a pixel. Because noise is evaluated for every one of these pixels, larger pixels mean less of them, less noise evaluations and faster drawing.
