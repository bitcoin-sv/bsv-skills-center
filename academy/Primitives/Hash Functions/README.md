# Hash Functions

### Introduction

There are three primitive elements found in BSV: Hash Functions, [Merkle Trees](https://bitcoinsv.academy/course/bitcoin-primitives-merkle-trees), and [Digital Signatures](https://bitcoinsv.academy/course/bitcoin-primitives-digital-signatures). If you take the time to learn these three primitives well, you will likely find the learning curve to understanding these systems significantly reduced. The focus of this course is Hash functions.

We examine what hash functions are, the hash functions used in BSV, how hash functions are used in BSV, why double hashing is used in BSV, and the role hash functions play in BSV's security model. BSV makes use of two hash functions: SHA-256 and RIPEMD-160.

There is example code in various parts of the course, and two example hash function implementations all written using the Go programming language. These examples are simply meant to aid in understanding the course material; knowing how to read and write code is not required to complete this course.\
\
&#xNAN;_**However, although it is not necessary to understand and complete the course, some familiarity with command line or terminal environments and programming is assumed with respect to the example code presented in the course.**_

Installation of Supporting Libraries Quick-Start: GoLang

You can install Go for your operating system from the official Go website: [https://go.dev/doc/install](https://go.dev/doc/install)

Once you have Go installed, create a new directory and initialize a new Go module using the following command:

```markup
go mod init github.com/[your username]/bsv-examples
```

The examples in this course also utilize the official BSV libsv Go libraries which you can add to your module using the following commands:

```markup
go get github.com/libsv/go-bt
go get github.com/libsv/go-bk
​​​​​​​go get github.com/libsv/go-bc
```



