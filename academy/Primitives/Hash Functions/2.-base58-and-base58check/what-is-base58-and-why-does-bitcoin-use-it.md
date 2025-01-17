# What is Base58 and Why Does Bitcoin Use It?

![](../.gitbook/assets/BSVA-HashFunctions_Ch2L1_DA1.gif)

While Base58 & Base58Check are not hash functions, they are important topics to cover.

Base58 is a binary-to-text encoding of data to plain text; i.e., printable characters.

Like Base64, Base58 is used to represent 8-bit bytes of binary data in an **ASCII** string format. BSV uses a binary-to-text encoding to enable data stored in binary formats to be transmitted across communication channels that only reliably support text values like email and the internet.

The original Bitcoin source code provides an explanation for why Base58 is used in Bitcoin instead of the more common Base64:

```
// Why base58 instead of standard base-64 encoding?
// - Don't want 0OIl characters that look the same in some fonts and
//      could be used to create visually identical looking account numbers.
// - A string with non-alphanumeric characters is not as easily accepted as an account number.
// - E-mail usually won't line-break if there's no punctuation to break at.
// - Doubleclicking selects the whole number as one word if it's all alphanumeric.-
```

In other words, since Base58 avoids using non-alphanumeric characters (+ and /) and ambiguous letters (0 - zero, I - capital i, O - capital o, and l - lower case L), it helps ensure addresses are readable, transmittable, and more secure.

One important point to note is the Base58 encoding used in Bitcoin is unique to Bitcoin and is not intended to match any other Base58 encoding implementations.

The table below shows the Base58 value mappings.

<table data-header-hidden><thead><tr><th width="112"></th><th width="177"></th><th width="86"></th><th></th></tr></thead><tbody><tr><td><strong>Value</strong></td><td><strong>Base58 Character Encoding</strong></td><td><strong>Value</strong></td><td><strong>Base58 Character Encoding</strong></td></tr><tr><td>0</td><td>1</td><td>29</td><td>W</td></tr><tr><td>1</td><td>2</td><td>30</td><td>X</td></tr><tr><td>2</td><td>3</td><td>31</td><td>Y</td></tr><tr><td>3</td><td>4</td><td>32</td><td>Z</td></tr><tr><td>4</td><td>5</td><td>33</td><td>a</td></tr><tr><td>5</td><td>6</td><td>34</td><td>b</td></tr><tr><td>6</td><td>7</td><td>35</td><td>c</td></tr><tr><td>7</td><td>8</td><td>36</td><td>d</td></tr><tr><td>8</td><td>9</td><td>37</td><td>e</td></tr><tr><td>9</td><td>A</td><td>38</td><td>f</td></tr><tr><td>10</td><td>B</td><td>39</td><td>g</td></tr><tr><td>11</td><td>C</td><td>40</td><td>h</td></tr><tr><td>12</td><td>D</td><td>41</td><td>i</td></tr><tr><td>13</td><td>E</td><td>42</td><td>j</td></tr><tr><td>14</td><td>F</td><td>43</td><td>k</td></tr><tr><td>15</td><td>G</td><td>44</td><td>m</td></tr><tr><td>16</td><td>H</td><td>45</td><td>n</td></tr><tr><td>17</td><td>J</td><td>46</td><td>o</td></tr><tr><td>18</td><td>K</td><td>47</td><td>p</td></tr><tr><td>19</td><td>L</td><td>48</td><td>q</td></tr><tr><td>20</td><td>M</td><td>49</td><td>r</td></tr><tr><td>21</td><td>N</td><td>50</td><td>s</td></tr><tr><td>22</td><td>P</td><td>51</td><td>t</td></tr><tr><td>23</td><td>Q</td><td>52</td><td>u</td></tr><tr><td>24</td><td>R</td><td>53</td><td>v</td></tr><tr><td>25</td><td>S</td><td>54</td><td>w</td></tr><tr><td>26</td><td>T</td><td>55</td><td>x</td></tr><tr><td>27</td><td>U</td><td>56</td><td>y</td></tr><tr><td>28</td><td>V</td><td>57</td><td>z</td></tr></tbody></table>

#### Activity - Encode a BSV public key hash in Base58

Using the [hash calculator](https://bitcoinsv.academy/hash-calculator), encode the following hash (displayed in HEX) in Base58:

```markup
094d77441cfead50daa8e9ce893698962dbcbbce
```

\
