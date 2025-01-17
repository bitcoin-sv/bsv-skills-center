# SHA-256 Input and Processing

{% embed url="https://youtu.be/ejPXni35fJE" %}

## Input

Hash functions aren't very useful unless there's a way to give them an input value. In our GoLang implementation which is a command-line-interface (CLI) program, we can simply take in some input as a string and then represent that input as an array of bytes:

For example, if our input is the string "abc":

```markup
message := []byte("abc")  
 
2 3fmt.Printf("Output: %b", message) // the %b prints the output in binary form 4 
//Output: [1100001 1100010 1100011] 
```

## Message Block Creation

Once we have our input, the next step is to turn it into a message block or a series of message blocks that consists of an array of bits that's 448 congruent to 512bits in length.

All this means is we need to pad the bits from our message with enough bits to get it to a length that's 64 bits short of a multiple of 512.

To do this, we first add a 1 bit to denote where the padding bits start within the block, then we add zeros until we reach a bit length that's 64 bits short of a multiple of 512 bits.

The logic is as follows:

```markup
package preprocessing 

import "encoding/binary" 

func HowMuchPadding(message []byte) int { 

     messageLength := len(message) 
     result := 0 

    if messageLength%64 < 56 { 
          result = 56 - messageLength%64 
    } else { 
          result = 64 + 56 - messageLength%64 
    } 

    return result 
} 

func AddZeroPaddingBits(messageBlock []byte, message []byte) []byte { 

    zeros := make([]byte, HowMuchPadding(message)) 

    //add separator bit 
    zeros[0] += 0x80 

    return append(messageBlock, zeros...) 
} 

func AddMessageLength(messageBlock []byte, message []byte) []byte { 

    messageLength := len(message) << 3 

    messageLengthInBits := make([]byte, 8) 
    binary.BigEndian.PutUint64(messageLengthInBits[:], uint64(messageLength)) 

    return append(messageBlock, messageLengthInBits...) 
} 

func BuildMessageBlocks(message []byte) []byte { 

    var messageBlock []byte 

    messageBlock = append(messageBlock, message...) 

    messageBlock = AddZeroPaddingBits(messageBlock, message) 

    messageBlock = AddMessageLength(messageBlock, message) 

    return messageBlock 
} 
```

First, we take our message bytes as input via the function BuildMessageBlocks.

We then create another byte array which we can build upon and copy the bytes from the input message so we can pass our input message bytes to subsequent functions.

The first two steps of BuildMessageBlocks result in the following output:

```markup
var messageBlock []byte 
fmt.Printf("Output: %b\n", messageBlock) 
//Output: [] 
 
messageBlock = append(mesageBlock, message...) 
fmt.Printf("Output: %b\n", messageBlock) 
//Output: [1100001 1100010 1100011] 
```

The next step adds the required padding to get to the 448 bits congruent to 512-bit length.

Since there are 8 bits in a byte, it follows that there are 512 bits in 64 bytes and 448 bits in 56 bytes. Therefore, if our message length in bytes modulous 64 (i.e. the remainder of our message length divided by 64 bytes) is less than 56, it means our message length is small enough to fit within one 64-byte block. Otherwise, we need to add padding to create more than one message block.

Once we've determined the amount of padding that needs to be added, we add our separator bit using the hexadecimal representation of 128 to add the 1 bit to the front of the byte immediately following our message bytes, and then we add our zero bits to the amount we determined in the previous step:

```markup
func howMuchPadding(message []byte) int { 

      messageLength := len(message) 
      result := 0 

      if messageLength%64 < 56 { 
            result = 56 - messageLength%64 
      } else { 
            result = 64 + 56 - messageLength%64 
      } 

      return result 
} 

func addZeroPaddingBits(messageBlock []byte, message []byte) []byte { 
  
      zeros := make([]byte, howMuchPadding(message)) 
  
      //add separator bit 
      zeros[0] += 0x80 

      return append(messageBlock, zeros...) 
} 
```

Our resulting output is our message with our required padding:

```markup
messageBlock = addMessageLength(messageBlock, message) 
fmt.Printf("Output: %b\n", messageBlock) 
//Output: [1100001 1100010 1100011 10000000 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 11000] 
```

The final step in our message block(s) construction is to add the length of our input message using the last 64 bits or 8 bytes of our message block space to get our message block to a multiple of 512 bits or 64 bytes.

To do this, we calculate the length of our message in bytes as a 64 bit unsigned integer value, and then we append this value in bytes to the end of our message block as an unsigned 64 bit integer to match our required bit length. In our case, the length of our input message "abc" is 24 bits or 3 bytes:

```markup
func addMessageLength(messageBlock []byte, message []byte) []byte {          

messageLength := len(message) << 3          

messageLengthInBits := make([]byte, 8)         
binary.BigEndian.PutUint64(messageLengthInBits[:], uint64(messageLength))          

return append(messageBlock, messageLengthInBits...) 
} 
```

Our final result is returned as a \[]byte array:

```markup
messageBlock = addMessageLength(messageBlock, message) 
fmt.Printf("Output: %b\n", messageBlock) 
//Output: [1100001 1100010 1100011 10000000 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 11000] 
```

## Message Schedule Creation

Now that we have our message block(s), we can proceed to creating our message schedules.

Message schedules in the SHA-256 hash function consist of 64 32 bit 'words' which can be represented as unsigned 32 bit integers.

Each 512 bit message block is used to create a 64 word message schedule. The first 16 words consist of the message block itself: 512/32 = 16.

The last 48 words are computed from the first 16 words using logical functions. You should also be aware that each sum in SHA-256 is computed modulo 232 meaning the result is always constrained to 32 bits. Since we're using uint32 variables to hold our words, we don't need to worry about this as it will be done automatically for us.

BuildMessageSchedule takes a messageBlock as input and uses it to build and return a message schedule:

```markup
package preprocessing  

import "encoding/binary" 
import "sha256-example/logicalFunctions"  

func BuildMessageSchedule(message []byte) [64]uint32 {          

   schedule := getFirst16Words(BuildMessageBlocks(message))          

   schedule = getRemaining48Words(schedule)          

   return schedule 
}  

func getFirst16Words(messageBlock []byte) [64]uint32 {          

   var schedule [64]uint32          

   j := 0         
   for i := 0; i < 64; i += 4 {                 

       schedule[j] = binary.BigEndian.Uint32(messageBlock[i:])                
       j++         
   }          

   return schedule  

}   

func getRemaining48Words(schedule [64]uint32) [64]uint32 {          

   for i := 16; i < 64; i++ {                
       schedule[i] = bitwiseMovements.SmallSigmaOne(schedule[i-2]) + schedule[i-7] + bitwiseMovements.SmallSigmaZero(schedule[i-15]) + schedule[i-16]         

   }          

   return schedule   

}
```

The first step is to parse the input message block into 16 32 bit words and add them to our message schedule which is represented as an array of 64 uint32 values:

```markup
var messageSchedule [64]uint32  

messageSchedule = getFirst16Words(messageBlock)  

fmt.Printf("Output: %b\n", messageSchedule) 
//Output: [1100001011000100110001110000000 0 0 0 0 0 0 0 0 0 0 0 0 0 0 11000 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0]
```

Notice how the first 16 values now match our message block.

The next 48 values are computed using bitwise logical functions and bit addition.

The formula is as follows:

```markup
Wt = σ1(t-2) + (t-7) + σ0(t-15) + (t-16) 
```

W16 = σ1(W14) + (W9) + σ0(W1) + (W0)

And, in the case of W63:

W63 = σ1(W61) + (W56) + σ0(48) + (47)

The two bitwise functions used in this step are:

```markup
σ0(x) = (ROTR 7) XOR (ROTR 18) XOR (SHR 3)  

σ1(x) = (ROTR 17) XOR (ROTR 19) XOR (SHR 10) 
```

Where ROTR indicates a bit rotation to the right which wraps bits from the right side of the 32-bit array around to the left side; SHR represents a bit shift to the right which does not wrap bits, and XOR represents an exclusive or logical operation where only one of two bits being added together is a 1 for a result of 1.

The result is as follows:

```markup
messageSchedule = getRemaining48Words(messageSchedule) 

fmt.Printf("Output: %b\n", messageSchedule) 
//Output: [
         1100001011000100110001110000000
         0 
         0 
         0 
         0 
         0 
         0 
         0 
         0 
         0 
         0 
         0 
         0 
         0 
         0 
         11000 
         1100001011000100110001110000000
         11110000000000000000
         1111101101010000110010000000101
         1100000000000000000001111000110
         111110100111010111101101111000
         1100000111111110000000000
         10010110111001011111111011011
         11100010111000101100001110001110
         11001000001000010101110000011010
         10110111001101100111100110100010
         11100101101111000011100100001001
         110010011001100011110001011011
         10011101001000001001110101100111
         11101100100001110010011011001011
         1110000001000010011100010100100
         11010011101101111001011100111011
         10010011111101011001100101111111
         111011011010001011101001110011
         10101111111101001111111111000001
         11110001000010100101110001100010
         1010100010110011100110010110
         1110010101011111000001100001010
         10010100000010011110001100111110
         100100011001000001010100100010
         10011111010001111011111110010100
         11110000101001100100111101011010
         111110001001000110101001111001
         100111001100110011101110100011
         1100010001110110001111110010
         10000100000010101011111100100111
         1111010001010010000110101011101
         110010111000100001111011010
         11111011001111101000100111001011
         11001100011101100001011111011011
         10111001111001100110110000110100
         10101001100110010011011001100111
         10000100101110101101111011011101
         11000010000101000110001010111100
         10100100001110100011100101100
         10110010000011110111101010011001
         11101111010101111011100111001101
         11101011111001101011001000111000
         10011111111000110000100101011110
         1111000101111001000110101001011
         10100100001111111100111100010101
         1100110100010110010111111111000
         11101110101010111010001011001100
         10010101100011110110111101011
]
```

Now that we have our message schedule, we can move on to the hash computation or compression function of the SHA-256 hash function.

Note: the message block creation step is performed once, and for each of the 512 bit sections of the message block, a message schedule is created and is compressed in the following steps with the result being passed between each step using 'chaining variables'.\
\
