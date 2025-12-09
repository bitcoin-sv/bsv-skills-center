# Overview of SHA-256

![](../../../../.gitbook/assets/BSVA-HashFunctions_Ch3L1_DA1.gif)

Although it's not required in order to gain an understanding of how BSV works, examining how each of the underlying hash functions used in BSV work can be helpful because the concepts and operations used within the hash function algorithms can be found in other parts of the BSV system. For example, combining binary values using the exclusive OR bit operation (XOR) is also used in both digital signature construction as well as Bitcoin Script.

Note: This implementation is for informational purposes only. It has not been optimized or rigorously tested and should therefore not be used in a production environment. As a general rule, you should only ever use a rigorously tested and widely accepted implementation of any hash function.

## Example Implementation of SHA-256 in GoLang

Our implementation of SHA-256 follows this design:

**1. Input and Preprocessing**

* Input
* Message block construction
* Message schedule construction

**2. Compression**

* Initialization of working variables
* Computation of temporary words and mutation of working variables
* Integrate computed and mutated working variables with initial values

**3. Final value construction and output**
