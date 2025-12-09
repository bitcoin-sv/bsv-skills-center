# Inputs and Outputs

> To allow value to be split and combined,transactions contain multiple inputs and outputs.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Combining and Splitting Value - Inputs and Outputs.gif>)

To facilitate the aggregation of many small coins into one large payment, transactions support the capability to use multiple coins as inputs. This means that a user who’s wallet mainly receives micropayments can still use those small coins to make larger purchases without burdening the receiver. This same mechanism also allows for multiple users to participate in a transaction by separate signing an input or inputs into the transaction.

Similarly, on the output side, a single transaction can pay out to one or many separate output scripts, providing a means for users to pay multiple parties in a single transaction. For example, a merchant who receives goods on consignment can have their customer pay the manufacturer directly at the point of sale, while also paying their cut, sales tax and any municipal surcharges that might apply. In this scenario, all parties to the transaction receive their payments instantaneously, removing the burden of quarterly accounting from the merchant.
