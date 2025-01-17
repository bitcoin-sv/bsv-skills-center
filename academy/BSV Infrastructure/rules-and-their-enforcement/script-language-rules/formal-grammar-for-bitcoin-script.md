# Formal Grammar for Bitcoin Script

The Formal Grammar for Bitcoin Script is set by node operators. This contains the full set of approved opcodes and their exact spelling and function.

It’s also worth highlighting the following features of this formal grammar:

* The complete script consists of two sections, the unlocking script (scriptSig) and the locking script (scriptPubKey). The locking script is from the transaction output that is being spent, while the unlocking script is included in the transaction input that is spending the output.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 12.gif" alt=""><figcaption></figcaption></figure>

* Current consensus rules state that an unlocking script can only contain the first 96 opcodes, which allow constants and data to be pushed onto the stack. This requirement is a part of the Validity of Script Consensus Rule, defined later.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 12A.gif" alt=""><figcaption></figcaption></figure>

* A branching operator (OP\_IF or OP\_NOTIF) must have a matching OP\_ENDIF.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 12B.gif" alt=""><figcaption></figcaption></figure>

* An OP\_ELSE can only be included between a branching operator and OP\_ENDIF pair. There can only be at most one OP\_ELSE between a branching operator and an OP\_ENDIF.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 12C.gif" alt=""><figcaption></figcaption></figure>

* OP\_RETURN may appear at any location in a valid script. The functionality of OP\_RETURN has been restored and is defined later in the section OP\_RETURN Functionality. Grammatically, any bytes after an OP\_RETURN that is not in a branch block are not evaluated and there are no grammatical requirements for those bytes.

Note that disabled operations are part of this grammar. A disabled operation is grammatically correct but will produce a failure if executed.
