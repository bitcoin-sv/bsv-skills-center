# Chapter 3 assessment 3

1. Which script returns true if \<input> is either 0x00 or 0x01?

* [ ] `<input> OP_DUP OP_IF OP_1 OP_ELSE OP_FALSE OP_ENDIF OP_NUMEQUALVERIFY`
* [ ] `<input> OP_IF OP_1 OP_NUMEQUALVERIFY OP_ENDIF`
* [ ] `<input> OP_DUP OP_NOTIF OP_RETURN OP_ELSE OP_1 OP_NUMEQUALVERIFY OP_ENDIF`
* [x] `<input> OP_IFDUP OP_IF OP_1 OP_EQUALVERIFY OP_ENDIF OP_1`

2. Which script fails if \<input0> \<input1> and \<input2> are 0, 1 and 2 respectively?

* [x] `<input0> <input1> <input2> OP_0 OP_EQUALVERIFY OP_1 OP_EQUALVERIFY OP_2 OP_EQUALVERIFY`
* [ ] `<input0> <input1> <input2> OP_2 OP_EQUALVERIFY OP_1 OP_EQUALVERIFY OP_FALSE OP_EQUALVERIFY OP_TRUE`
* [ ] `<input0> <input1> <input2> OP_2 OP_ROLL OP_NOTIF OP_SWAP OP_1 OP_EQUALVERIFY OP_2 OP_EQUALVERIFY OP_1 OP_ENDIF`
* [ ] `<input0> <input1> <input2> OP_SWAP OP_PICK OP_PICK`
