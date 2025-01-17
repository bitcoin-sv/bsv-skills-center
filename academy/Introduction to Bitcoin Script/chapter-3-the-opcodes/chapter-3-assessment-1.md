# Chapter 3 assessment 1

1. What OPCODE would you use to push the data item 0x0129a0 onto the stack?

* [ ] OP\_6
* [ ] OP\_3
* [x] 0x03
* [ ] OP\_PUSHDATA4

2. Which script correctly pushes 1, 17, 64, 256, 65536 onto the stack? (values are represented as little-endian hexadecimal numbers)

* [ ] `OP_1 OP_17 OP_PUSHDATA1 0x40 OP_PUSHDATA_2 0x0001 OP_PUSHDATA4 0x00000100`
* [ ] `0x01 0x17 0x64 OP_PUSHDATA2 0x0001 OP_PUSHDATA4 0x00000100`
* [x] `OP_1 0x01 0x11 0x01 0x40 0x02 0x0001 0x03 0x000001`
* [ ] `OP_1 OP_PUSHDATA1 0x01 0x11 OP_PUSHDATA1 0x01 0x40 OP_PUSHDATA1 0x03 0x000001`

3. Which opcode would you use to push an 82,492 byte long data item to the stack?

* [ ] `OP_3`
* [ ] `OP_PUSHDATA2`
* [ ] `OP_PUSHDATA3`
* [x] `OP_PUSHDATA4`
