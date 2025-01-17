# Chapter 3 assessment 2

Which script is invalid?

* [ ] `<input> OP_IF OP_2 OP_ELSE OP_1 OP_ENDIF`
* [ ] `<input_1> <input_2> OP_NOTIF 0x98 OP_EQUAL OP_IF <winner> OP_ELSE <no win> OP_ENDIF OP_ELSE <winner> OP_ENDIF`
* [x] `<input_1> <input_2> OP_IF OP_2 OP_IF OP_4 OP_ENDIF`
* [ ] `<input_1> OP_IF OP_1 OP_ELSE OP_0 OP_ENDIF`

Which script is valid if the scriptSig is `0x00`

* [ ] `OP_NOTIF OP_TRUE OP_IF OP_FALSE OP_ENDIF OP_ENDIF`
* [ ] `OP_IF OP_FALSE OP_ENDIF`
* [x] `OP_NOTIF OP_TRUE OP_ENDIF`
* [ ] `OP_NOTIF OP_FALSE OP_ELSE OP_TRUE OP_ENDIF`
