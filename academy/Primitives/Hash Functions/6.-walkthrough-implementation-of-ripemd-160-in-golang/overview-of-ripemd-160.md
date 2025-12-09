# Overview of RIPEMD-160

![](../../../../.gitbook/assets/BSVA-HashFunctions_Ch5L1_DA1.gif)

The other underlying good hash function used in BSV is RIPEMD-160. And again, although it's not required in order to gain an understanding of how BSV works, it can be very helpful to see a working example implementation.

Note: This implementation is for informational purposes only. It has not been optimized or rigorously tested and should therefore not be used in a production environment. As a general rule, you should only ever use a rigorously tested and widely accepted implementation of any hash function.

## Example Implementation of RIPEMD-160 in GoLang

Like SHA-256, RIPEMD-160 follows a Merkle Damgaard construction and can be split into three parts:

1. Input and Processing
   * Input
   * Message block construction
   * Message schedule construction
2. Compression
   * Initialization of working variables
   * Computation of temporary words and mutation of working variables
   * Integrate computed and mutated working variables with initial values
3. Final value construction and output
