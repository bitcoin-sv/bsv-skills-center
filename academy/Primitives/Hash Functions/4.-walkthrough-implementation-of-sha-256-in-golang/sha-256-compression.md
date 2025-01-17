# SHA-256 Compression

{% embed url="https://youtu.be/ZgeUVdthits" %}

## Compression

The compression step consists of 3 sub steps: initialization of registers, i.e. working variables; computation of temporary words, and register mutation and computation; and resulting hash value computation:

```markup
func Compression(messageBlock []byte, initialValues []uint32, constants []uint32) []uint32 {          

   messageSchedule := preprocessing.BuildMessageSchedule(messageBlock)           

   //Working Variables         
   a := initialValues[0]         
   b := initialValues[1]         
   c := initialValues[2]         
   d := initialValues[3]         
   e := initialValues[4]         
   f := initialValues[5]         
   g := initialValues[6]         
   h := initialValues[7]          

   for i := 0; i < 64; i++ {                 
       //calc temp words                
       tempWord1 := h + bitwiseMovements.BigSigmaOne(e) + bitwiseMovements.Choice(e, f, g) + constants[i] + messageSchedule[i]                
       tempWord2 := bitwiseMovements.BigSigmaZero(a) + bitwiseMovements.Majority(a, b, c)                 

       h = g                
       g = f                
       f = e                
       e = d + tempWord1                
       d = c                
       c = b                
       b = a                
       a = tempWord1 + tempWord2         
   }          

   var hashValues []uint32          

   hashValues = append(hashValues, a+initialValues[0])         
   hashValues = append(hashValues, b+initialValues[1])         
   hashValues = append(hashValues, c+initialValues[2])         
   hashValues = append(hashValues, d+initialValues[3])         
   hashValues = append(hashValues, e+initialValues[4])         
   hashValues = append(hashValues, f+initialValues[5])         
   hashValues = append(hashValues, g+initialValues[6])         
   hashValues = append(hashValues, h+initialValues[7])          

   return hashValues  

}  
```

## Initialization of Registers

The first round of compression with the first 512 bit message block starts by initializing our 8 registers or working variables. The SHA-256 algorithm uses the first 32 bits of the fractional portion of the square root of the first 8 prime numbers. The NIST.FIPS.180-4 specification provides these values, and for the sake of efficiency, it's good practice to hardcode them, however, a constants class has also been provided to give you an idea of how they're calculated:

```markup
//First 8 prime numbers are: 2, 3, 5, 7, 11, 13, 17, 19   


func InitializeRegisters() []uint32 {          

   registerValues := []uint32{}          

   for i := 0; i < 8; i++ {                
       root := math.Pow(float64(First_eight_primes[i]), (1 / 2.0))                
       value, _ := math.Modf(root * (1 << 32))                
       hexValue := uint32(value)                 

       registerValues = append(registerValues, hexValue)         
   }          

   return registerValues 

}  

//Output in hexadecimal: [6a09e667, bb67ae85, 3c6ef372, a54ff53a, 510e527f, 9b05688c, 1f83d9ab, 5be0cd19]
```

For any subsequent rounds of compression, the values from the previous round are used as the initial values for the new round via chaining variables.

## Computation of Temporary Words and Register Mutations

Now we're into the really fun part of the hash function! Hash functions get their 3 important properties of preimage resistance, second preimage resistance, and collision resistance from combinations of bit addition and logical functions which are compound bitwise logic operations (AND, OR, XOR, and NOT).

For each word in a message schedule, SHA-256 uses bit addition and logical functions to compute 2 temporary words. It then slides these temporary words into the working registers using bit addition and mutates the registers at the same time. The code for this step is as follows:

```markup
for i := 0; i < 64; i++ {      
 
    //calc temp words                           
    tempWord1 := h + logicalFunctions.BigSigmaOne(e) + logicalFunctions.Choice(e, f, g) + constants[i] + messageSchedule[i]   
    tempWord2 := logicalFunctions.BigSigmaZero(a) + logicalFunctions.Majority(a, b, c)      

    h = g     
    g = f     
    f = e     
    e = d + tempWord1     
    d = c     
    c = b     
    b = a     
    a = tempWord1 + tempWord2 
} 
```

The four logical functions used to compute the temporary words are:

```markup
∑0(x): ROTR(2) XOR ROTR(13) XOR ROTR(22)  

∑1(x): ROTR(6) XOR ROTR(11) XOR ROTR(25)  

Choice(x,y,z): (x & Y) XOR (~x & z)  

Majority(x,y,z): (x & y) XOR (x & z) XOR (y & z) 

```

Expressed in GoLang, these functions look like this:

```markup
// ∑0(x): (ROTR 2) XOR (ROTR 13) XOR (ROTR 22) 

func BigSigmaZero(input uint32) uint32 {          

   return bits.RotateLeft32(input, -2) ^ bits.RotateLeft32(input, -13) ^ bits.RotateLeft32(input, -22) 
}  

// ∑1(x): (ROTR 6) XOR (ROTR 11) XOR (ROTR 25) 
func BigSigmaOne(input uint32) uint32 {          

   return bits.RotateLeft32(input, -6) ^ bits.RotateLeft32(input, -11) ^ bits.RotateLeft32(input, -25) 
}  

// The Choice Function://  
if(x) then y else z 
func Choice(x, y, z uint32) uint32 {          

   return (x & y) ^ (^x & z) 
}  

//The Majority Function: 
//if(x && y || x && z || y && z) then 1 else 0 
func Majority(x, y, z uint32) uint32 {          

   return (x & y) ^ (x & z) ^ (y & z) 
} 

```

At the end of this step, our output looks like this -- using the same input string "abc" as before:

```markup
for i := 0; i < 64; i++ {      

    //calc temp words       
    tempWord1 := h + bitwiseMovements.BigSigmaOne(e) + bitwiseMovements.Choice(e, f, g) + constants[i] + messageSchedule[i]   
    tempWord2 := bitwiseMovements.BigSigmaZero(a) + bitwiseMovements.Majority(a, b, c)      

    h = g     
    g = f     
    f = e     
    e = d + tempWord1     
    d = c     
    c = b     
    b = a     
    a = tempWord1 + tempWord2 
}  

//Output: Output: [506e3058, d39a2165, 4d24d6c, b85e2ce9, 5ef50f24, fb121210, 948d25b6, 961f4894] 

```

Our final step for this section of the SHA-256 hash function algorithm is to integrate our initial values into our working variable values to compute our chaining variable values.

Once we have our chaining variable values, we return them. The chaining variable values can then be used as the initial values for another round of compression if there are still some 512 bit message blocks left to compute, or they can be concatenated into a hexadecimal string and output as our message digest.

In our case, since the input string "abc" only results in one 512 bit message block, the chaining variables calculated in this step will be used to construct our message digest:

```markup
hv0 := a + initialValues[0] 
hv1 := b + initialValues[1] 
hv2 := c + initialValues[2] 
hv3 := d + initialValues[3] 
hv4 := e + initialValues[4] 
hv5 := f + initialValues[5] 
hv6 := g + initialValues[6] 
hv7 := h + initialValues[7]  

fmt.Printf("Output: [%x, %x, %x, %x, %x, %x, %x, %x]\n", hv0, hv1, hv2, hv3, hv4, hv5, hv6, hv7) 
//Output: [ba7816bf, 8f01cfea, 414140de, 5dae2223, b00361a3, 96177a9c, b410ff61, f20015ad] 
```

&#x20;
