# Stack Memory Usage Rule

The stack memory usage consensus rule limits the amount of memory that can be used on the stacks. This rule is evaluated against the sum of the memory used by the stack and the alt-stack.

If the execution of the unlocking and locking script for an input uses more memory than defined in this rule, then the transaction is invalid.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 17.gif" alt=""><figcaption></figcaption></figure>

The memory usage of a stack is calculated using a specific formula, so that it can be coordinated across software implementations. The formula for calculating the memory usage of a stack is:

```
usage = sum of (for each element: 32 + size in bytes of element)
```

where "size in bytes of element" is the size in bytes of the element when serialized in the Bitcoin Serialization Format.

This is a configurable consensus rule, with a default value that is formally unlimited but will in practice depend on the capabilities of the system that is evaluating the script.

**Miners are expected to reach consensus on this value and configure it manually.**
