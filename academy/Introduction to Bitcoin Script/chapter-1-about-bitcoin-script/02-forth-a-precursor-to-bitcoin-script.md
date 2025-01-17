# 02 - FORTH: A Precursor to Bitcoin Script

In the late 60's Charles 'Chuck' Moore developed FORTH as a fully interactive stack based programming environment that ran on a microcontroller and provided the user with a simple, command line entry based means to enter commands and build FORTH words and programs. FORTH is different to many programming languages in that it runs 'live' while the programmer is working on their software, allowing new 'words' to be defined, tested, redefined and debugged without having to recompile or restart the system. All elements of the syntax are defined as words, including variables such as constants and basic operators and the system uses a simple stack to pass instructions between words.

The following video is a 2 minute overview of Forth.

{% embed url="https://www.youtube.com/watch?v=ml9s2HfpDZY" %}



Stack based programming such as that which is used in FORTH is called Reverse Polish Notation (RPN). In RPN, the operands needed for a function must be pushed onto the stack _prior_ to the word that processes them being called. Data types are fluid, with each item existing as a bytevector in memory. Each function uses the data items it expects to see. A function will treat the bytevector however it is programmed to. It may be seen as an integer, a string of text, a floating point number or any other type of data. If a word performs a function that consumes more than one data point, it will expect the right number of items of the right types to be on the stack.

For example, to multiply 2 by 3, the user would input '2 3 \*', or '2 3 multiply'. This would consume the 2 and 3 from the stack and replace them with a 6. If there are less than 2 items, or they are too big to be integers, the program ends with an error.&#x20;

All forth words are built from a set of primitive words. These are built upon to create application specific functionality that can easily interact with microprocessor input/output hardware. Digital and analog signals can be evaluated, and techniques such as fast fourier transforms can be implemented to filter and read real world data. This ensures a high degree of efficiency and flexibility for any given system or architecture. A basic set of words can be extended to create complex applications in a tiny space.
