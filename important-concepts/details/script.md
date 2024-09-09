# Script

Bitcoin uses a scripting system for transactions, specifically output locking scripts. Similar to Forth, Script is simple, stack-based, language that is processed from left to right as a series of sequential instructions. Data is pushed onto the stack and opcodes are used to perform operations on the items on the stack.

Script is Turing-complete despite not having jump instructions. Finite state machines can be built which hold their current state in one or more UTXOs. Among other methods, these machines can receive information from oracles, generate deterministic pseudo random values or look back to previous transactions on the ledger for the data needed to determine the next-state. A loop is formed by checking these input conditions and asserting a particular output state for the next UTXO holding the Turing machine. In this way, the Turing machine is held in a continually operating state until such a time as a transaction is created that determines that the process can halt. One such technique called 'OP\_PUSH\_TX' uses the ECDSA message pre-image to enforce conditions for the next stages of each computation. Techniques that are considered Turing complete can be described as using the Bitcoin ledger as an unbounded ticker tape to store computational results and future instructions.

A transaction output script is a predicate formed by a list of instructions that describe how the next person wanting to transfer the tokens locked in the script must unlock them. The script for a typical P2PKH script requires the spending party to provide two things:

a public key that, when hashed, yields the destination address embedded in the script, and a signature to prove ownership of the private key corresponding to the public key just provided. Scripting provides the flexibility to change the parameters of what's needed to spend transferred bitcoins. For example, the scripting system could be used to require two private keys, or a combination of several keys, or even a file and no keys at all. The tokens are unlocked if the solution provided by the spending party leaves a non-zero value on the top of the stack when the script terminates.

De facto, Bitcoin script is defined by the code run by the nodes building the Blockchain. Nodes collectively agree on the opcode set that is available for use, and how to process them. Throughout the history of Bitcoin there have been numerous changes to the way script is processed including the addition of new opcodes and disablement or removal of opcodes from the set.

The nodes checking Bitcoin script, process transaction inputs in a script evaluation engine. The engine is comprised of two stacks which are:

The main stack The alt stack In addition, the system also uses a subscript management system to track the depth of nested If-Loops

The main and alt stacks hold byte vectors which can be used by Bitcoin opcodes to process script outcomes. When used as numbers, byte vectors are interpreted as little-endian variable-length integers with the most significant bit determining the sign of the integer. Thus 0x81 represents -1. 0x80 is another representation of zero (so called negative 0). Positive 0 can be represented by a null-length vector or a string of hexadecimal zeros of any length. Byte vectors are interpreted as Booleans where False is represented by any representation of zero and True is represented by any representation of non-zero.

Before the Genesis upgrade, byte vectors on the stack are not allowed to be more than 520 bytes long, however in the unbounded Bitcoin protocol the amount of data being pushed onto the stack is only limited to the economic limits imposed by the miners. As services such as mAPI are rolled out further, users will be presented with further choice in how they use the network.

While pushdata opcodes are limited to pushing 4.3GB onto the stack it is theoretically possible to concatenate multiple objects on the stack to form larger singular data items for processing.

Before Genesis, Opcodes which take integers and bools off the stack require that they be no more than 4 bytes long, but addition and subtraction can overflow and result in a 5 byte integer being put on the stack. After the Genesis upgrade in early 2020, nodes are now free to mine transactions with data items of any size possible within protocol rules. These will be usable with mathematical functions within script. Over time, network node operators will collectively agree on appropriate data limits.
