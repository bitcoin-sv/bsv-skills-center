# Hardware Developments to Meet User Demand



As the BSV network grows, the requirement for nodes on the network to build ever larger blocks will spur the creation of computing systems which are targeted to perform highly specific tasks relating to the validation of transactions and blocks. The incentives at play will tend to intensify focus on developing highly parallelised systems that can manage huge numbers of transactions in real time through a variety of pathways.

<figure><img src="../../../.gitbook/assets/Chapter 5 GIF 10.gif" alt=""><figcaption></figcaption></figure>

Because each transaction may have several inputs being spent at once, and each of those inputs may represent a different script or template, nodes can break each transaction down and funnel inputs using particular template types into specific optimised pipelines. When all of the inputs of the transaction have been validated, the totality of the transaction can be evaluated as valid and the transaction can be appended to the node’s block template.

Where the network trends towards there being large numbers of TX's of a particular template or type, the use of programmable silicon hardware such as FPGAs (Field Programmable Gate Array) which are specifically tailored to process transactions using those templates will be developed. Similarly, hardware that is optimised for the handling of large data, custom scripts and more can be developed to manage the transactional load. Eventually it will be possible the silicon that handles the opcodes used in Bitcoin script can be developed similar to those that have been developed to process FORTH instructions directly.
