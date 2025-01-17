# RIPEMD-160 Input and Processing

{% embed url="https://youtu.be/D53eTlld9pQ" %}

Input and processing can be split into 3 sub-sections: input, message block construction, and message schedule construction.

## Input

Our RIPEMD-160 implementation wouldn't be very useful unless it's able to take an input value. GoLang makes this easy by allowing us to cast an input string as an array of bytes, i.e. an array of 8 bit units.

For example, if our input is the string "abc", our code looks like the following:

```markup
message := []byte("abc") 

fmt.Printf("Output: %b", message)
//Output: [1100001 110010 1100011
```

## Message Block Creation

Once we have our input, the next step is to use it to create the necessary message block(s).

The message blocks found in RIPEMD-160 have the same bit length requirements as SHA-256 -- they must be padded to 448 congruent to 512 bits in length. In other words, we need to pad the bits from our input message with enough bits to get a length that's 64 bits short of a multiple of 512.

To do this, we first add a 1 bit to denote where the padding bits start within the message block, then we add zeros until we reach a bit length that's 64 bits shy of a multiple of 512 bits.

If our input message is longer than 448 bits, then we'll need to create a message block that's longer than 512 bits but that's still a multiple of 512 bits; e.g. 1024 bits.

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
      binary.LittleEndian.PutUint64(messageLengthInBits, uint64(messageLength)) 
  
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

We then create another byte array which we can build upon without altering the byte array that's holding our message so we can pass our message bytes as input to subsequent functions and append our message bytes as a copy to our working messageBlock.

```markup
var messageBlock []byte 
fmt.Printf("Output: %b\n", messageBlock) 
//Output: []
 
messageBlock = append(messageBlock, message...) 
fmt.Printf("Output: %b\n" messageBlock) 
//Output: [1100001 1100010 1100011] 
```

The next step adds the required padding to get our message block to 448 congruent to 512 bits.

Since there are 8 bits in a byte, it follows that there are 512 bits in 64 bytes. Therefore, if we take our message length modulous 64 (i.e. the remainder of our message length divided by 64), and the result is less than 56 (i.e. 448), it means our message length is short enough to fit within one 64-byte block.

Once we've determined the amount of padding that needs to be added, we add our separator bit using the hexadecimal representation of 128 so it's added to the front of the byte immediately following our message bits, and then we add our zero bits until we reach 56 bytes or 448 bits.

```markup
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
```

&#x20;Our messageBlock after these steps looks like this:

```markup
messageBlock = addZeroPaddingBits(messageBlock, message) 
fmt.Printf("Output: %b\n", messageBlock) 
//Output: [1100001 1100010 1100011 10000000 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
```

The final step in our message block(s) construction is to add the length of our input message (which in our case using the input "abc" is 24, i.e., 3 bytes or 8x3 = 24).

If you already went through the SHA-256 implementation, you'll notice that these steps have been identical to this point; however, RIPEMD-160 follows a different convention with this step. The 8-byte value of our message length (which in our case is 3 bytes) has to be added to the end of our message block using the Little-Endian convention on a per byte basis.

What this means is instead of the most significant byte value, i.e., the biggest value, of our message length being on the left side of our 8-byte block -- e.g., 0 0 0 0 0 0 0 11000 -- it has to be on the right side -- e.g., 11000 0 0 0 0 0 0 0

To demonstrate, instead of our message block looking like it did in SHA-256:

```markup
messageBlock = addMessageLength(messageBlock, message) 
fmt.Printf("Output: %b\n", messageBlock) 
//Output: [1100001 1100010 1100011 10000000 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 11000]
```

&#x20;It will look like the following:

```markup
messageBlock = addZeroPaddingBits(messageBlock, message) 
fmt.Printf("Output: %b\n", messageBlock) 
Output: [1100001 1100010 1100011 10000000 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 11000 0 0 0 0 0 0 0]
```

## Message Schedule Creation

Now that we have our RIPEMD-160 message block(s), we can proceed to creating our message schedules.

Message schedules in the RIPEMD-160 hash function consist of 16 32-bit 'words' which can be represented as unsigned 32-bit integers.

Each 512-bit message block is used to create a 16-word message schedule -- 512/32 = 16.

Our BuildMessageSchedule function takes a single 512 messageBlock as input and uses it to build and return a 16-word message schedule:

```markup
package preprocessing 

import "encoding/binary" 

func BuildMessageSchedule(messageBlock []byte) [16]uint32 { 
  
      var schedule [16]uint32 
 
      i := 0 
      for j := 0; j < 16; j++ { 
  
            schedule[j] = binary.LittleEndian.Uint32(messageBlock[i:]) 
  
            i += 4 

      } 
  
      return schedule 
  
} 
```

Our message schedule using our same input of "abc" looks like this in hexadecimal:

```markup
fmt.Printf("Output: %x\n", schedule)
//Output: [80636261 0 0 0 0 0 0 0 0 0 0 0 0 0 18 0]
```
