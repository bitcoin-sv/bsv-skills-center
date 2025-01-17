# Hash Functions

### Introduction

{% embed url="https://youtu.be/LGRx1cEYfII" %}

There are three primitive elements found in Bitcoin: Hash Functions, [Merkle Trees](https://bitcoinsv.academy/course/bitcoin-primitives-merkle-trees), and [Digital Signatures](https://bitcoinsv.academy/course/bitcoin-primitives-digital-signatures). If you take the time to learn these three Bitcoin primitives well, you will likely find the learning curve to understanding Bitcoin significantly reduced. The focus of this course is Hash functions.

We examine what hash functions are, the hash functions used in Bitcoin, how hash functions are used in Bitcoin, why double hashing is used in Bitcoin, and the role hash functions play in Bitcoin's security model. Bitcoin makes use of two hash functions: SHA-256 and RIPEMD-160.

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



The GoLang code used in this course can be found here: [https://github.com/jakeBitcoinAssociation/hash-functions](https://github.com/jakeBitcoinAssociation/hash-functions)

A certificate of completion is automatically awarded when students earn a passing grade on the final assessment.

If you have any questions as you go through the course, please join our [Discord channel](https://discord.gg/3y3nY96AsV) and ask.

To report any issues with the course, please use our [contact form](https://bitcoinsv.academy/contact).
