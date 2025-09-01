# What are Hash Functions?

![](../.gitbook/assets/BSVA-HashFunctions_Ch1L1_DA1.gif)

A hash function is a mathematical process that maps a **bitstring** of any length to a bitstring of a defined length. This process must also be easy to compute. A _one-way hash function_ must be **preimage resistant** and **second preimage** **resistant** while a _secure cryptographic_ or _ideal hash function_ must be preimage resistant, second preimage resistant, and **collision resistant** – we'll cover what these terms mean in the following lessons of this chapter. The hash functions we'll be looking at in this course are the secure ideal hash functions found in the BSV system: **SHA-256** and **RIPEMD-160**. For the remainder of this course, when you see the term _hash function_, it means _secure cryptographic_ or _ideal hash function_.

The output values of hash functions are often referred to as message digests, hash values, checksums, or hashes. We will use these terms interchangeably throughout this course.

You can think of a message digest as analogous to a fingerprint for digital information. In the physical world, a fingerprint is an identifier unique to each individual person such that no two people ever share the same fingerprint. A hash function takes some input message (which can be almost anything as all digital information is essentially a binary string of ones and zeros), and produces a unique, compressed, fixed-length, digital fingerprint for that input message.

As a result of their unique properties, hash functions are a very important tool in many areas of information technology:

* Hash Tables
* Digital signatures
* Keyed hashes
* One-way transformations
* Key derivation

These operations and techniques form the foundation of most digital storage and communication technologies. However, the two fundamental uses of hash functions are: maintaining data integrity, and data storage & access efficiency. Since message digests are digital fingerprints, they are very useful for making sure data hasn’t been tampered with.

### Data Integrity

For example, Bob wants to download the most recent version of Debian Linux so he goes to [debian.org](https://www.debian.org/) and downloads an .iso file for the version of Debian Linux he would like to use. However, he wants to be sure he’s downloaded the correct file before running it to minimize the risk the file has malware embedded in it. Before running the .iso file, Bob checks the website for a checksum or message digest corresponding to the version of the file he downloaded, and he finds the following listed:

```markup
c685b85cf9f248633ba3cd2b9f9e781fa03225587e0c332aef2063f6877a1f0622f56d44cf0690087b0ca36883147ecb5593e3da6f965968402cdbdf12f6dd74  debian-11.2.0-amd64-netinst.iso 
f2da0996196f19585b464e48bfb6b8e4938eb596667d92a5ebd428e1a88a1a115c00f1d052f350eca44fa08f42f0500c63351763dfb47f1e1783f917590c175d  debian-edu-11.2.0-amd64-netinst.iso 
9b5b0475fbb3235ebb7da71415f10921b02131b7debc9325403f85f9f6798a3e902d6257831a7ec9c7aef3256817fb76c4f01bb5d035bfcdb3dc24da24fa1bda  debian-mac-11.2.0-amd64-netinst.iso
```

Seeing the listed checksums were generated using the SHA-512 hash function, Bob then runs his newly downloaded .iso file through the SHA-512 hash function on his computer to make sure the output matches one of the provided hashes:

```markup
openssl sha512 ~/Downloads/debian-11.2.0-amd64-netinst 

//Output: SHA512(debian-11.2.0-amd64-netinst.iso)= c685b85cf9f248633ba3cd2b9f9e781fa03225587e0c332aef2063f6877a1f0622f56d44cf0690087b0ca36883147ecb5593e3da6f965968402cdbdf12f6dd74
```

And, sure enough, the output checksum matches one of the given checksums on the Debian website, so Bob can be reasonably sure the file he has downloaded is safe to open.

### Efficient Data Storage and Retrieval

In addition to data integrity, using hash functions as a tagging or identification mechanism in data storage or in a data structure can provide efficiency gains. Message digests of hash functions are a fixed length but still unique, and hash functions can take almost anything as an input value. Many data structures found in information systems utilize hash functions to identify or index data.

Fundamentally, all computer systems use hash tables (also called associative arrays, maps, or dictionaries) within their memory storage architectures to make memory access as efficient as possible. Hash tables are such an important data structure that all other data structures can be constructed using them; there are even some programming languages like AWK that use them exclusively. Hash tables work a lot like arrays; the difference being hash tables allow for anything that can be hashed to be used as an index value creating a key-value mapping.

For example, given an array of size 10, the contents of the array are stored by accessing the array at indexes from 0..9:

```markup
package main 

import ( 
	"fmt" 
) 

func main() { 
	var array [10]string = [10]string{"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"} 

	for i := 0; i < 9; i++ { 
		fmt.Printf("%s, ", array[i]) 
	}  

	fmt.Printf("%s\n", array[9]) 

} 

//Output: one, two, three, four, five, six, seven, eight, nine, ten 

```

Whereas hash tables use a hash of data modulus the length of the array (i.e. the remainder of the message digest divided by the length of the array) to derive the index the data will be stored in the array.

```markup
package main 

import ( 
	"bytes" 
	"encoding/binary" 
	"fmt" 
	bk "github.com/libsv/go-bk/crypto" 
	"math/big" 
) 
 
type Cell struct { 
	key   string 
	value string 
	next  *Cell 
} 

type HashTable struct { 
	Cells []*Cell 
} 
 
func main() { 
	hashTable := NewHashTable() 
	hashTable.Insert("0", "zero") 
	hashTable.Insert("1", "one") 
	hashTable.Insert("2", "two") 
	hashTable.Insert("3", "three") 
	hashTable.Insert("4", "four") 
	hashTable.Insert("5", "five") 
	hashTable.Insert("6", "six") 
	hashTable.Insert("7", "seven") 
	hashTable.Insert("8", "eight") 
	hashTable.Insert("9", "nine") 
  
	fmt.Printf("%s\n", hashTable) 
 
} 

func (hashTable *HashTable) String() string { 
 
	var out bytes.Buffer  

	for _, cell := range hashTable.Cells {  

		if cell != nil {  

			fmt.Fprintf(&out, "%s ", cell.value) 

			if cell.next != nil { 
				for nextCell := cell.next; nextCell != nil; nextCell = nextCell.next { 
					fmt.Fprintf(&out, "%s ", nextCell) 
				} 
			} 
		} 
	} 

  	return out.String() 
} 
 
func (cell *Cell) String() string { 

	var out bytes.Buffer 

	for ; cell != nil; cell = cell.next { 
  
		fmt.Fprintf(&out, "%s", cell.value) 
  
	}  

	return out.String() 

}   

func NewHashTable() *HashTable { 
	return &HashTable{Cells: make([]*Cell, 50)} 

}   

func GetIndex(key string) (index int) {   

	bInt := new(big.Int) 
	bInt.SetBytes(bk.Sha256d([]byte(key))) 

	return int(binary.BigEndian.Uint64(bInt.Bytes()) % 50) 
} 

func (hashTable *HashTable) Insert(key string, value string) { 

	index := GetIndex(key) 

	if hashTable.Cells[index] == nil { 

		hashTable.Cells[index] = &Cell{key: key, value: value} 

	} else {  

		head := hashTable.Cells[index] 

		for ; head != nil; head = head.next { 

			if head.key == key { 
				head.value = value 
			} 
			return 
		} 
 
		head.next = &Cell{key: key, value: value} 
	} 
}   

func (hashTable *HashTable) Get(key string) (string, bool) { 

	index := GetIndex(key)   

	if hashTable.Cells[index] != nil {  

		head := hashTable.Cells[index] 

		for ; ; head = head.next { 
 
			if head.key == key { 
				return head.value, true 
			}  

			if head.next == nil { 
				break 
			} 
		} 

	} 

	return "", false 
}  

//Output: three four five nine eight zero six seven one two 
```

Notice the output of the hash table is not in order like the array was, and that's because the index of the value is determined by the hash of its key. This is what makes hash tables so efficient. Because the index of the value is provided when fetching the data, retrieval is fast, yet almost any kind of input can be used to derive the index.

### Merkle Trees

![](https://bitcoinsv.academy/storage/photos/4318/BSVA-MerkleTrees_Ch1Less1_VA3%20updated.jpg)

BSV Blockchain makes extensive use of Merkle Trees. A Merkle Tree is a binary tree structure (meaning its branches terminate in two nodes) that's made entirely of hashes. For example, the leaf nodes at the bottom layer of the Merkle trees used in BSV are the hash values of the raw data from bitcoin transactions. And the successive layers of the tree leading back to the root node are constructed by concatenating the two hashes from the previous layer, and hashing them together to form a new hash. This has the effect of connecting the tree together to be represented securely by one single root node value. This structure makes it very easy to find data at the bottom of the tree, as well as to prove specific data exists in the tree - which is particularly important for scaling the BSV system efficiently.

### Digital Signatures

Although hash tables and data structures like Merkle Trees are where hash functions find their greatest use, the most widely recognized use of hash functions is in cryptography. In addition to encryption and key-exchanges, digital signatures make extensive use of hash functions. Like a physical signature, a digital signature associates an identity to a document or message. To ensure the security of digital signatures, well tested algorithms are used to both construct and verify them.

In BSV, digital signatures are most commonly used for Pay-to-Public-Key-Hash (P2PKH) transactions – the most common type of transaction template -- where the ownership of funds are transferred from the sending party to the receiving party. The two other common uses of digital signatures in BSV are for signing arbitrary messages and using an address as part of the verification process, and MinerID which is a message included in the first transaction of a block that acts as an authentication mechanism in case another miner (node) tries to act dishonestly while using the ID of a competing miner.

With that said, it's helpful to recognize that even though hash functions and cryptographic digital signatures are used in BSV, it is **not** a cryptographic system, and it's actually incorrect to use the term “cryptocurrency” when referring to Bitcoin or a system that follows the Bitcoin architectural design like BSV. This is a really important distinction to be aware of because as we'll see in chapter 7, it's fundamental to how the BSV system operates and how it's secured.
