# Chapter 3 assessment 5

#### Assessment

1. Which set of inputs will **not** solve the following script? `OP_DEPTH OP_3 OP_EQUAL OP_IF OP_ADD OP_ADD OP_ELSE OP_DEPTH OP_2 OP_EQUAL OP_IF OP_MUL OP_ELSE OP_10 OP_DIV OP_ENDIF OP_ENDIF OP_16 OP_EQUAL`

* [ ] `0x04 0x08 0x04`
* [ ] `0x04 0x04`
* [x] `0x12 0x02 0x02`
* [ ] `0xA0`

1. Which opcodes are needed to fill in the blanks for the following script to solve correctly when the input `0x0102030405060708` is used? `OP_3 OP_SPLIT OP_1 OP_SPLIT OP_SWAP OP_DUP OP_DUP OP_CAT OP_CAT ______ OP_ADD OP_3 OP_SPLIT OP_SWAP ______`

* [ ] `OP_OVER, OP_GREATERTHAN`
* [x] `OP_ROT, OP_EQUALVERIFY`
* [ ] `OP_NIP, OP_EQUAL`
* [ ] `OP_MAX, OP_GREATERTHAN`
