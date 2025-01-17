# Standard Local Script Language Policies

[https://player.vimeo. com/video/674778670](https://player.vimeo.com/video/674778670)

Script Language Policies apply to the execution of script.

### Minimal Encoding Policy

The Minimal Encoding Policy mandates that any push operations done within a script must use the most efficient pushdata opcode to do so. Bitcoin has individual pushdata opcodes to push data items up to 75 bytes in length using a single byte instruction. For data items which are between 76 and 255 bytes, the sequence OP\_PUSHDATA1 must be used, where the data length is defined using an 8 bit unsigned integer value. For data items between 256 and 65,535 bytes long, the sequence OP\_PUSHDATA2 must be used, where the data length is defined using a 16 bit unsigned integer value. For data items between 65,536 and 4,294,967,295 bytes long, the sequence OP\_PUSHDATA4 must be used, where the data length is defined using a 32 bit unsigned integer value. Data items larger than 4,294,967,295 bytes must be split in order to be pushed into a transaction.

### Numeric Value Length

The length of numeric value policy defines the maximum length of a byte sequence to be considered a valid numeric value. The default value for this policy is 250,000 bytes.

[https://player.vimeo. com/video/674769412](https://player.vimeo.com/video/674769412?h=dcbeeda21e\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

Transactions which contain scripts that consume numeric values that are larger than this policy setting will be rejected; they will not be propagated across the P2P network or be included in a block.

### Stack Memory Usage Policy

The stack memory usage policy limits the amount of memory that can be used on the stacks. This policy is evaluated against the sum of the memory used by the stack and the memory used by the alt-stack.

[https://player.vimeo. com/video/674769477](https://player.vimeo.com/video/674769477?h=69273c0096\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

If the execution of the unlocking and locking script for an input uses more stack memory than defined in this policy, then the transaction is rejected.

The memory usage of a stack is calculated using the same formula described in the Stack Memory Usage Consensus Rule (above).

The default value for this policy is 100MB (100,000,000 bytes). The value of this policy must be less than or equal to the value of the Stack Memory Usage Consensus Rule.
