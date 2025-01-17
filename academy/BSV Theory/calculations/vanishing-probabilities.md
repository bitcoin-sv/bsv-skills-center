# Vanishing Probabilities



> The recipient waits until the transaction has been added to a block and z blocks have been linked after it. He doesn't know the exact amount of progress the attacker has made, but assuming the honest blocks took the average expected time per block, the attacker's potential progress will be a Poisson distribution with expected value:
>
> ![](https://lh4.googleusercontent.com/6TFqB5dJW9FnO7OjhLt0Qn_y-S8dqj_f_yf1fNsEvODDIAXGT-98S0BNy-iEUqE7rz34FpyxOZiNO0dz9zSKv-u1rh_fuhqdZqAno7zPVCqxUUtiSAxvdyphqfdAuKtbrLbShAi0)
>
> To get the probability the attacker could still catch up now, we multiply the Poisson density foreach amount of progress he could have made by the probability he could catch up from that point:
>
> ![](https://lh3.googleusercontent.com/GIoS6zRFrhU4TzPR-ZPPlaBJ9fXEK_hbWTY5yaVYridU3C-byhqNHGXxi9ym9NBiEKBpzJ654VUvMD9cU_8S8CgdB2RzsqBT5CUwvtfJ5LjSVBYcEY9TbEhfIlTxiWum5dBJvAnw)
>
> Rearranging to avoid summing the infinite tail of the distribution…
>
> ![](https://lh4.googleusercontent.com/M9gxyVuwPlrqN-OTSJNNCgQiobpFinZr-_EwXJny-jlKz2BmBhMB5ak6aLk36SYzcDLbevUNbHEYnykDv26CrWX2tJpszYKJW8Tb91EHi874kVI5NV00_FO0Ljw1CjLhpd7dwrOx)
>
> Converting to C code…
>
> \#include\
> double AttackerSuccessProbability(double q, int z)\
> {\
> &#x20;   double p = 1.0 - q;\
> &#x20;   double lambda = z \* (q / p);\
> &#x20;   double sum = 1.0; int i, k;\
> &#x20;    for (k = 0; k <= z; k++)\
> &#x20;   {\
> &#x20;       double poisson = exp(-lambda);\
> &#x20;       for (i = 1; i <= k; i++)\
> &#x20;       poisson \*= lambda / i;\
> &#x20;       sum -= poisson \* (1 - pow(q / p, z - k));\
> &#x20;   }\
> &#x20;   return sum;\
> }\
> Running some results, we can see the probability drop off exponentially with z.
>
> ![](https://lh5.googleusercontent.com/JhEqcufv34aR951-kFZSoTvCnQQ1Wo8b3yoQI61rs5woXi8uohfCr2HTmvMQhmjwWgumUXSSX8wfJ7td94BpurslWwNsFTLVhTkLKmQKrGWvKHF70CHsYDG--hJ-8oPwD3cLNnPY)
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](https://lh3.googleusercontent.com/PQ1OA18HFunxH6cGmaTVqdlte3voCJylto-U53djMZ1pAYABHyM-CfC-6GSEiB2T29xCNbmRFeiYkVyCL9lPrUJznjLmYCR-Z-s95xBSb8WqHeNsTLwrZYdMNovepDt3ghYo7-9S)

![](https://lh5.googleusercontent.com/4zuiEO9_HwSyg8G5sdKunokesjwV3lLT1SfMDICr4vVyMa9mVIUbrO-b29dVmJQEztABf9xBw_tJC5loq4tT8ZSssTMIc3CiQrCugznK8p3TJ6WBM0SmMyEZaXPYji3VqF5Ywc-P)

![](https://lh6.googleusercontent.com/o9uhVh4gPUVqU6Vk2L6zCUmsXvEVGxtK5vwrvjPts8PaCn4MtTw31lgPQNKoqmY-v94dDn0N5rYadGc6Jn54xJ6H-z_PuSnEEnfJKvwSPH1x4nDMWEbJGxff0xNba_nwWTEY7GKn)

The final part of this section concerns the probabilities of success an attacker might have given varying different quantities of hashpower with which to execute their attack. The first two charts show that for a given percentage of the network’s hashpower (10% and 30% respectively), the chance of ever catching up from a lead of more than just one block is probabilistically low, making the attack highly risky.

The third chart shows how many blocks lead represents a 0.1% chance of catching for a given % of hashpower. We can see that for anything below 30% of the hashrate, a lead of just 24 blocks can represent a 1/1000 chance.
