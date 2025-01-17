---
coverY: 0
---

# Calculations

We consider the scenario of an attacker trying to generate an alternate chain faster than the honest chain. Even if this is accomplished, it does not throw the system open to arbitrary changes, such as creating value out of thin air or taking money that never belonged to the attacker. Nodes are not going to accept an invalid transaction as payment, and honest nodes will never accept a block containing them. An attacker can only try to change one of his own transactions to take back money he recently spent.

The race between the honest chain and an attacker chain can be characterized as a Binomial Random Walk. The success event is the honest chain being extended by one block, increasing its lead by +1, and the failure event is the attacker's chain being extended by one block, reducing the gap by -1.

The probability of an attacker catching up from a given deficit is analogous to a Gambler's Ruin problem. Suppose a gambler with unlimited credit starts at a deficit and plays potentially an infinite number of trials to try to reach breakeven. We can calculate the probability he ever reaches breakeven, or that an attacker ever catches up with the honest chain, as follows[\[8\]](https://nakamotoinstitute.org/bitcoin/#fn8):

p= probability an honest node finds the next block

q= probability the attacker finds the next block

qz= probability the attacker will ever catch up from z blocks behind

qz={1 if p≤q\
&#x20;       (q/p)z if p>q}

Given our assumption that p>q, the probability drops exponentially as the number of blocks the attacker has to catch up with increases. With the odds against him, if he doesn't make a lucky lunge forward early on, his chances become vanishingly small as he falls further behind.

We now consider how long the recipient of a new transaction needs to wait before being sufficiently certain the sender can't change the transaction. We assume the sender is an attacker who wants to make the recipient believe he paid him for a while, then switch it to pay back to himself after some time has passed. The receiver will be alerted when that happens, but the sender hopes it will be too late.

The receiver generates a new key pair and gives the public key to the sender shortly before signing. This prevents the sender from preparing a chain of blocks ahead of time by working on it continuously until he is lucky enough to get far enough ahead, then executing the transaction at that moment. Once the transaction is sent, the dishonest sender starts working in secret on a parallel chain containing an alternate version of his transaction.

The recipient waits until the transaction has been added to a block and z blocks have been linked after it. He doesn't know the exact amount of progress the attacker has made, but assuming the honest blocks took the average expected time per block, the attacker's potential progress will be a Poisson distribution with expected value:

![](https://lh4.googleusercontent.com/6TFqB5dJW9FnO7OjhLt0Qn_y-S8dqj_f_yf1fNsEvODDIAXGT-98S0BNy-iEUqE7rz34FpyxOZiNO0dz9zSKv-u1rh_fuhqdZqAno7zPVCqxUUtiSAxvdyphqfdAuKtbrLbShAi0)

To get the probability the attacker could still catch up now, we multiply the Poisson density foreach amount of progress he could have made by the probability he could catch up from that point:

![](https://lh3.googleusercontent.com/GIoS6zRFrhU4TzPR-ZPPlaBJ9fXEK_hbWTY5yaVYridU3C-byhqNHGXxi9ym9NBiEKBpzJ654VUvMD9cU_8S8CgdB2RzsqBT5CUwvtfJ5LjSVBYcEY9TbEhfIlTxiWum5dBJvAnw)

Rearranging to avoid summing the infinite tail of the distribution…

![](https://lh4.googleusercontent.com/M9gxyVuwPlrqN-OTSJNNCgQiobpFinZr-_EwXJny-jlKz2BmBhMB5ak6aLk36SYzcDLbevUNbHEYnykDv26CrWX2tJpszYKJW8Tb91EHi874kVI5NV00_FO0Ljw1CjLhpd7dwrOx)&#x20;

```
#include 
double AttackerSuccessProbability(double q, int z)
{
    double p = 1.0 - q;
    double lambda = z * (q / p);
    double sum = 1.0;
    int i, k;
    for (k = 0; k <= z; k++)
    {
        double poisson = exp(-lambda);
        for (i = 1; i <= k; i++)
            poisson *= lambda / i;
        sum -= poisson * (1 - pow(q / p, z - k));
    }
    return sum;
}
```

Running some results, we can see the probability drop off exponentially with $$z$$z.

```
q=0.1
z=0    P=1.0000000
z=1    P=0.2045873
z=2    P=0.0509779
z=3    P=0.0131722
z=4    P=0.0034552
z=5    P=0.0009137
z=6    P=0.0002428
z=7    P=0.0000647
z=8    P=0.0000173
z=9    P=0.0000046
z=10   P=0.0000012

q=0.3
z=0    P=1.0000000
z=5    P=0.1773523
z=10   P=0.0416605
z=15   P=0.0101008
z=20   P=0.0024804
z=25   P=0.0006132
z=30   P=0.0001522
z=35   P=0.0000379
z=40   P=0.0000095
z=45   P=0.0000024
z=50   P=0.0000006
```

Solving for P less than 0.1%...

```
P < 0.001
q=0.10   z=5
q=0.15   z=8
q=0.20   z=11
q=0.25   z=15
q=0.30   z=24
q=0.35   z=41
q=0.40   z=89
q=0.45   z=340
```

