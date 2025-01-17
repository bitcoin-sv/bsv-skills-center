# RIPEMD-160 Final Value Construction and Output

{% embed url="https://youtu.be/yukEttxD9D0" %}

## Final Value Construction

The last step in the RIPEMD-160 hash function is to build the final value and print it to standard output in hexadecimal.

In our implementation of RIPEMD-160, we use the function PrintFinalHashValuesInHex to build our output value from our calculated hash values, i.e. final chaining values:

```markup
func PrintFinalHashValuesInHex(hashValues []uint32) string { 

      finalValue := make([]byte, 20) 

      binary.LittleEndian.PutUint32(finalValue[0:], hashValues[0]) 
      binary.LittleEndian.PutUint32(finalValue[4:], hashValues[1]) 
      binary.LittleEndian.PutUint32(finalValue[8:], hashValues[2]) 
      binary.LittleEndian.PutUint32(finalValue[12:], hashValues[3]) 
      binary.LittleEndian.PutUint32(finalValue[16:], hashValues[4])  

      return fmt.Sprintf("%x", finalValue) 
} 
```

We then we return it to our main input/output function and print it to standard output:

```markup
func main() { 
 
      fi, _ := os.Stdin.Stat() 

      if (fi.Mode() & os.ModeCharDevice) == 0 { 
            reader := bufio.NewReader(os.Stdin) 
            input, _ := reader.ReadString('\n') 
            input = strings.TrimSuffix(input, "\n") 
            fmt.Println(GetHash(input)) 
      } else { 
  
            if len(os.Args) > 1 && len(os.Args) < 3 {  

                  fmt.Println(GetHash(os.Args[1])) 
 
            } else { 
                  fmt.Println("Please provide a single input string") 
            } 
      }   

} 
```

And that's how RIPEMD-160 works. And we can verify its correctness by testing it against the test values supplied in Dobbertin et. al.'s paper:

```markup
// Input abc 
// Expected Output: 8eb208f7e05d987a9b044a8e98c6b087f15a0bfc 
  
➜  ripemd160-example git:(main) ./ripemd160-example abc 
8eb208f7e05d987a9b044a8e98c6b087f15a0bfc 
  
// Input: a 1 million times 
// Expected Output: 52783243c1697bdbe16d37f97f68f08325dc1528 
  
➜  ripemd160-example git:(main) printf a%0.s {1..1000000} | ./ripemd160-example 
52783243c1697bdbe16d37f97f68f08325dc1528
```
