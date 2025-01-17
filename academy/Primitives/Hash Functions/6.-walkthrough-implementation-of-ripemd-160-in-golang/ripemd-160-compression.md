# RIPEMD-160 Compression

{% embed url="https://youtu.be/hIb9oKkWSao" %}

## Initialisation of Working Variables

The first step is to initialise our working variables. RIPEMD-160 runs the same message schedule through two different computation paths in parallel. Each side of the function uses 5 working variables. Both sides use the same initial values to initialise their working variables. The initial values are given in Dobbertin et al's paper \[^1].

```markup
package hashComputation 
  
import "math/bits" 

var InitialValues []uint32 = []uint32{0x67452301, 0xefcdab89, 0x98badcfe, 
      0x10325476, 0xc3d2e1f0} 
  
func Compression(messageSchedule [16]uint32, chainingValues []uint32) []uint32 { 
  
      var h0, h1, h2, h3, h4 uint32 = chainingValues[0], chainingValues[1], 
        chainingValues[2], chainingValues[3], chainingValues[4] 
  
    var a, b, c, d, e = h0, h1, h2, h3, h4 
    var aa, bb, cc, dd, ee = h0, h1, h2, h3, h4 
 
... 
```

Note: If the message block is larger than 512 bits -- meaning there will be more than one round of compression, only the first round uses the initial values. Each subsequent call of the compression function uses the chaining variables computed and returned from the previous function call.

## Mutation and Compression of Message Schedule



Now we're into the fun part of the RIPEMD-160 hash function!

RIPEMD-160's compression process uses 5 rounds of 16 steps for 80 steps in total.

Each of the 5 rounds consists of a temporary word computed for each side of the algorithm using a logical function and left bit rotations using a given value schedule provided in Dobbertin et al's paper \[^1]. After the temporary word has been computed, the working variables are mutated with d, dd (i.e. d prime), b, and bb (i.e. b prime) being computed with a left rotation by 10 and the inclusion of the temporary word, respectively.

```markup
var tempWord, tempWordPrime uint32 
 
      //first round 
      for i := 0; i < 16; i++ { 
  
            tempWord = a + (b ^ c ^ d) + messageSchedule[word[i]] + 0x00000000 
            tempWord = bits.RotateLeft32(tempWord, rotationLeft[i]) + e 
            a, e, d, c, b = e, d, bits.RotateLeft32(c, 10), b, tempWord 
  
            //first round prime 
            tempWordPrime = aa + (bb ^ (cc | ^dd)) + messageSchedule[wordPrime[i]] + 0x50a28be6 
            tempWordPrime = bits.RotateLeft32(tempWordPrime, rotationLeftPrime[i]) + ee 
            aa, ee, dd, cc, bb = ee, dd, bits.RotateLeft32(cc, 10), bb, tempWordPrime 
      }   

      //second round 
      for i := 16; i < 32; i++ { 
            tempWord = a + (b&c | ^b&d) + messageSchedule[word[i]] + 0x5a827999 
            tempWord = bits.RotateLeft32(tempWord, rotationLeft[i]) + e 
            a, e, d, c, b = e, d, bits.RotateLeft32(c, 10), b, tempWord 
 
            //second round prime 
            tempWordPrime = aa + (bb&dd | cc&^dd) + messageSchedule[wordPrime[i]] + 0x5c4dd124 
            tempWordPrime = bits.RotateLeft32(tempWordPrime, rotationLeftPrime[i]) + ee 
            aa, ee, dd, cc, bb = ee, dd, bits.RotateLeft32(cc, 10), bb, tempWordPrime 
      }   

      //third round 
      for i := 32; i < 48; i++ { 
            tempWord = a + (b | ^c ^ d) + messageSchedule[word[i]] + 0x6ed9eba1 
            tempWord = bits.RotateLeft32(tempWord, rotationLeft[i]) + e 
            a, e, d, c, b = e, d, bits.RotateLeft32(c, 10), b, tempWord 

            //third round prime 
            tempWordPrime = aa + (bb | ^cc ^ dd) + messageSchedule[wordPrime[i]] + 0x6d703ef3 
            tempWordPrime = bits.RotateLeft32(tempWordPrime, rotationLeftPrime[i]) + ee 
            aa, ee, dd, cc, bb = ee, dd, bits.RotateLeft32(cc, 10), bb, tempWordPrime 
      } 
  
      //fourth round 
      for i := 48; i < 64; i++ { 
            tempWord = a + (b&d | c&^d) + messageSchedule[word[i]] + 0x8f1bbcdc 
            tempWord = bits.RotateLeft32(tempWord, rotationLeft[i]) + e 
            a, e, d, c, b = e, d, bits.RotateLeft32(c, 10), b, tempWord 
  
            //fourth round prime 
            tempWordPrime = aa + (bb&cc | ^bb&dd) + messageSchedule[wordPrime[i]] + 0x7a6d76e9 
            tempWordPrime = bits.RotateLeft32(tempWordPrime, rotationLeftPrime[i]) + ee 
            aa, ee, dd, cc, bb = ee, dd, bits.RotateLeft32(cc, 10), bb, tempWordPrime 
      }   

      //fifth round 
      for i := 64; i < 80; i++ { 
            tempWord = a + (b ^ (c | ^d)) + messageSchedule[word[i]] + 0xa953fd4e 
            tempWord = bits.RotateLeft32(tempWord, rotationLeft[i]) + e 
            a, e, d, c, b = e, d, bits.RotateLeft32(c, 10), b, tempWord 
 
            //fifthround prime 
            tempWordPrime = aa + (bb ^ cc ^ dd) + messageSchedule[wordPrime[i]] + 0x00000000 
            tempWordPrime = bits.RotateLeft32(tempWordPrime, rotationLeftPrime[i]) + ee 
            aa, ee, dd, cc, bb = ee, dd, bits.RotateLeft32(cc, 10), bb, tempWordPrime 
      } 
```

## Computing Chained Variables

The last subsection of RIPEMD-160's compression function is the computation of the chaining variables. Note, if there are no more 512-bit blocks left to compress, i.e. it's the final round of compression, the chaining variables that are returned are the final values of the hash function.

Chaining variable computation consists of adding the two sides of the compression function together with the initial values given for the current round of compression:

```markup
tempValue := h1 + c + dd 
h1 = h2 + d + ee 
h2 = h3 + e + aa 
h3 = h4 + a + bb 
h4 = h0 + b + cc 
h0 = tempValue 

chainingValues[0] = h0 
chainingValues[1] = h1 
chainingValues[2] = h2 
chainingValues[3] = h3 
chainingValues[4] = h4 
  
return chainingValues 
```

Once the chaining values have been calculated, they're returned, and the compression round is complete.
