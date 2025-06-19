# Fundamentals of Data in ICT

Binary data is the fundamental form of data representation in digital computing systems. At its core, binary data uses just two symbols, 0 and 1, to encode information. This binary system simplifies the way computers process, store, and communicate all types of data. Each binary digit (or bit) represents a power of two, and by combining these bits, complex data can be represented and manipulated efficiently in electronic devices.

### Converting Data to Binary

**Text:** Text in computers is converted into binary using character encoding standards like ASCII (American Standard Code for Information Interchange) and Unicode. These standards map each character of text to a unique binary number.

<figure><img src="../../../.gitbook/assets/ASCII Conversion Chart.gif" alt=""><figcaption><p><a href="https://web.alfredstate.edu/faculty/weimandn/miscellaneous/ascii/ASCII%20Conversion%20Chart.gif">https://web.alfredstate.edu/faculty/weimandn/miscellaneous/ascii/ASCII%20Conversion%20Chart.gif</a></p></figcaption></figure>

* **Example:** The letter 'A' is represented as 01000001 in the ASCII encoding system. In this system, the capital letter 'A' corresponds to the decimal number 65, which is represented in binary as 01000001.

**Images:** Digital images are composed of tiny dots called pixels, and each pixel is represented by binary values that encode its color and brightness. The way these values are encoded depends on the color depth (bit depth) of the image.\
\


<figure><img src="../../../.gitbook/assets/image (17).png" alt=""><figcaption><p><a href="https://en.wikipedia.org/wiki/File:RGB_color_wheel_pixel_30.svg">https://en.wikipedia.org/wiki/File:RGB_color_wheel_pixel_30.svg</a></p></figcaption></figure>

* In a simple black and white image, each pixel might only be represented by one bit, where 0 could represent white and 1 could represent black. In more complex color images, each pixel typically consists of three color channels (Red, Green, and Blue), with each channel often using 8 bits, allowing for 256 variations in intensity per channel.

**Videos:** Videos are essentially sequences of images, called frames, displayed at a speed that creates the illusion of motion. Each frame is a still image and thus stored in binary just like any digital image. Additionally, the sound accompanying the video is also encoded in binary. Video files often use compression techniques to reduce the file size, enabling more efficient storage and transmission.

<figure><img src="../../../.gitbook/assets/dancing.gif" alt=""><figcaption></figcaption></figure>

* Consider a short video clip that consists of a series of frames where each frame is an image. If a video is recorded at 24 frames per second, a 1-second clip results in 24 individual images stored sequentially. Compression techniques like MPEG (Moving Picture Experts Group) encode these frames using algorithms that minimize redundancy between successive frames and within the frames themselves, efficiently storing the binary data.
