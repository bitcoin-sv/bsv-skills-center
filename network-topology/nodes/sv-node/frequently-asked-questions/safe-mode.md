# Safe Mode

If a node believes it has detected a potential Withholding attack, the node will enter safe mode and the wallet functionality (e.g. _`getbalance`_` ``RPC)` will be disabled as a protective measure. At this point a miner should stay alert and be prepared to take manual intervention.&#x20;

Withholding attacks can be neutralised by calling the _`invalidateblock`_ RPC on the block at the base of the attack chain. The local node will then consider the entire attack chain as no longer valid.&#x20;

Safe mode will be triggered by the presence of a chain fork longer than that specified by the configuration parameter_`safemodeminforklength`_. Default = 6.  It is possible that in exceptional circumstances such a fork can be produced normally. i.e. by a node that is not under attack.

Once a node goes into safe mode, it will remain in that state until the main branch is longer than the attack chain by the number of block specified by the configurable parameter _`safemodeminblockdifference`_. Default = 72 blocks.

Safe mode can be disabled (RPC functionality restored) by putting the _`disablesafemode`_ configuration parameter to 1 and restarting the node. It is recommended that this is NOT done, except in extreme circumstances. If this option is set, the node becomes vulnerable to Withholding attacks.
