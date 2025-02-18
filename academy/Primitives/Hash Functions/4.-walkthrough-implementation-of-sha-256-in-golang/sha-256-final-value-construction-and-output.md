# SHA-256 Final Value Construction and Output

## Final Value Construction and Output

The last step of our SHA-256 GoLang implementation is to take the final chaining variable values we computed using the compression function in the previous step, concatenate them into a single hexadecimal string, and output the result. Since our program is a CLI program, our result can simply be printed to STDOUT using a print statement:

PrintFinalHashValues takes the computed chaining variable hash values as an input array and returns them concatenated as a single hexadecimal string:

```markup
func PrintFinalHashValuesInHex(finalHashValues []uint32) string {          

   hashValue := fmt.Sprintf("%x%x%x%x%x%x%x%x", finalHashValues[0],                
       finalHashValues[1], finalHashValues[2], finalHashValues[3],                
       finalHashValues[4], finalHashValues[5], finalHashValues[6],                
       finalHashValues[7])          

   return hashValue 

} 
```

Finally, our result is printed to STDOUT:

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

When we run our implementation, we see our output using our test input string of "abc" matches the expected output for the string "abc" specified in the NIST.FIPS.180-4 specification:

```markup
sha256-example git:(main) ✗ ./sha256-example abc 
ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad 
```
