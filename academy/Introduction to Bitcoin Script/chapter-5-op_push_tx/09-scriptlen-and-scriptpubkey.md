# 09 - scriptLen and scriptPubKey

Part of the transaction pre-image is the lockScript held in the UTXO being spent in the input. This is broken down as two fields as follows:

1. lockScriptLength - the locking script length, a [VarInt](https://wiki.bitcoinsv.io/index.php/VarInt) (1, 3, 5 or 9 bytes depending on script length)
2. lockScript - the locking script for the UTXO being spent (Length as defined by previous parameter)

To extract the locking script, we must first extract the length. There are 4 possible sizes for the VarInt, depending on the length of the script. The size of this field can be inferred from the value in its first byte:

* If the value is equal to or less than 0xFC, the varInt is a 1 byte integer value containing the integer value of lockScriptLength.
* If the first byte is 0xFD, the varInt is 3 bytes long, with the last 2 bytes containing the integer value of lockScriptLength.
* If the first byte is 0xFE, the varInt is 5 bytes long, with the last 4 bytes containing the integer value of lockScriptLength.
* If the first byte is 0xFF, the varInt is 9 bytes long, with the last 8 bytes containing the integer value of lockScriptLength.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter5-Animation08.gif" alt=""><figcaption></figcaption></figure>

#### Example 1: 2 byte length field

Typically, we can know roughly how big a script might be. A 2 byte length is valid from 253B up to 64kB so we can assume for our purposes this is what we are expecting.

| Stack                                         | Script    | Description                                                                    |
| --------------------------------------------- | --------- | ------------------------------------------------------------------------------ |
| \<r\_tx\_preimg>                              | ...       | Version, hash\_prevouts, hash\_nSequence and hash\_outpoints have been removed |
| \<r\_tx\_preimg>                              | 0P\_3     | VarInt is 3 bytes long                                                         |
| \<r\_tx\_preimg> 0x03                         | OP\_SPLIT | Split length                                                                   |
| \<varint> \<rr\_tx\_preimg>                   | OP\_SWAP  | Move to top of stack                                                           |
| \<rr\_tx\_preimg> \<varint>                   | OP\_1     | First byte is VarInt length field                                              |
| \<rr\_tx\_preimg> \<varint> 0x01              | OP\_SPLIT | Calculate txid using OP\_HASH160                                               |
| \<rr\_tx\_preimg> \<varint\_id> \<length\_be> | OP\_NIP   | Nip varint ID                                                                  |
| \<rr\_tx\_preimg> \<length\_be>               | OP\_SPLIT | Split script from pre-image                                                    |
| \<rrr\_tx\_preimg> \<lock\_script>            | ...       | Rest of script                                                                 |

Now that the script is on the stack, it is possible for it to utilise data stored in itself to enforce the conditions of the next output state. We will get into this shortly.

#### Example 2: Variable VarInt handling

This example splits a script of unknown length from the stack. It first splits off the 1-byte VarInt type identifier, checks whether the varInt is 1 byte, 3 bytes or 5 bytes long, and then where needed splits the length value from r\_tx\_preimg before separating the script from the pre-image.

| Stack                                       | Script                   | Description                                                                     |
| ------------------------------------------- | ------------------------ | ------------------------------------------------------------------------------- |
| \<r\_tx\_preimg>                            | ...                      | Version, hash\_prevouts, hash\_nSequence and hash\_outpoints have been removed  |
| \<r\_tx\_preimg>                            | 0P\_1                    | VarInt type ID is 1 byte                                                        |
| \<r\_tx\_preimg> 0x01                       | OP\_SPLIT                | Split type                                                                      |
| \<type> \<rr\_tx\_preimg>                   | OP\_SWAP                 | Move to top of stack                                                            |
| \<rr\_tx\_preimg> \<type>                   | OP\_2                    |                                                                                 |
| \<rr\_tx\_preimg> \<type> 0x02              | OP\_NUM2BIN              |                                                                                 |
| \<rr\_tx\_preimg> \<type>                   | OP\_DUP                  | Duplicate type                                                                  |
| \<rr\_tx\_preimg> \<type> \<type>           | 0xFC                     | 0xFC or less is 1 byte varInt                                                   |
| \<rr\_tx\_preimg> \<type> \<type+00> 0xFC00 | OP\_GREATERTHANOREQUALTO | Is type >= 0xFE? - Use GREATERTHANOREQUAL because 0xFE is a NEGATIVE integer    |
| \<rr\_tx\_preimg> \<type> \<result>         | OP\_NOTIF                | If NOT, enter loop. Otherwise \<type> is length                                 |
| \<rr\_tx\_preimg> \<type>                   | OP\_DUP                  | Duplicate type                                                                  |
| \<rr\_tx\_preimg> \<type> \<type>           | 0xFD                     | Is length 2 bytes?                                                              |
| \<rr\_tx\_preimg> \<type> \<type> 0xFD      | OP\_EQUAL                | Test                                                                            |
| \<rr\_tx\_preimg> \<type> \<result>         | OP\_IF                   | If 2 bytes then...                                                              |
| \<rr\_tx\_preimg> \<type>                   | OP\_DROP                 | Drop type                                                                       |
| \<rr\_tx\_preimg>                           | OP\_2                    | 2 byte length                                                                   |
| \<rr\_tx\_preimg> 0x02                      | OP\_SPLIT                | Split                                                                           |
| \<length> \<rrr\_tx\_preimg>                | OP\_SWAP                 | Move length\_bigendian to top of stack                                          |
| \<rr\_tx\_preimg> \<type>                   | OP\_ELSE                 | If not 2-byte                                                                   |
| \<rr\_tx\_preimg> \<type>                   | 0xFE                     | Is length 4 bytes?                                                              |
| \<rr\_tx\_preimg> \<type> 0xFE              | OP\_EQUAL                | Check equality                                                                  |
| \<rr\_tx\_preimg> \<result>                 | OP\_IF                   | Enter if statement                                                              |
| \<rr\_tx\_preimg>                           | OP\_4                    | Length is 4 bytes                                                               |
| \<rr\_tx\_preimg> 0x04                      | OP\_SPLIT                | Split length                                                                    |
| \<length> \<rrr\_tx\_preimg>                | OP\_SWAP                 | Swap it to front                                                                |
| \<rr\_tx\_preimg>                           | OP\_ELSE                 | If not 4, must be 8                                                             |
| \<rr\_tx\_preimg>                           | OP\_8                    | Length is 8 bytes                                                               |
| \<rr\_tx\_preimg> 0x08                      | OP\_SPLIT                | Split length                                                                    |
| \<length> \<rrr\_tx\_preimg>                | OP\_SWAP                 | Swap to front                                                                   |
| \<rrr\_tx\_preimg> \<length>                | OP\_ENDIF                | Exit IF loop                                                                    |
| \<rrr\_tx\_preimg> \<length>                | OP\_ENDIF                | Exit IF loop                                                                    |
| \<rrr\_tx\_preimg> \<length>                | 0x00                     | Add 00 to stack (cannot use OP\_FALSE)                                          |
| \<rrr\_tx\_preimg> \<length> 0x00           | OP\_CAT                  | Add zeroes to the length to ensure it will be interpreted as a positive integer |
| \<rrr\_tx\_preimg> \<length+00>             | OP\_BIN2NUM              | Optimally encode the nubmer                                                     |
| \<r\_tx\_preimg> \<length>                  | OP\_SPLIT                | split the script from the pre-image remainder                                   |
| \<lock\_script> \<rrrr\_tx\_preimg>         | OP\_SWAP                 | Swap to the front                                                               |
| \<rrrr\_tx\_preimg> \<lock\_script>         | ...                      | Rest of script                                                                  |

These script elements can easily be customised to your requirements as you define your OP\_PUSH\_TX script. Simple checks may require scripts smaller than 253 bytes allowing these checks to be optimised as needed. Understanding the processing of the scriptLen value is an important aspect of this process. Much care must be taken to handle integer values so that they are interpreted correctly.

##
