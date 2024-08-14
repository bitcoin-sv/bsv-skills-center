# Example: Building a Pulse Block Headers Client

When [verifying BEEF structures](EXAMPLE_VERIFYING_BEEF.md), it's necessary to ensure that all transactions are well-anchored: this is to say, that they come from inputs in the honest chain. The SDK doesn't ship with a headers client, but this guide shows an example of how to use it with [Pulse](https://github.com/bitcoin-sv/block-headers-service): a popular client suitable for a wide range of use-cases.

## Pre-requisites

As stated in the README, you will need to be running a Pulse instance. Get it up and running, and configure a level of authentication appropriate for your use-case:

```sh
docker pull bsvb/block-headers-service
docker run bsvb/block-headers-service:latest
```

## Building our Client

The SDK's `ChainTracker` interface defines the required structure for our implementation, as follows:

```py
class ChainTracker(ABC):
    """
    The Chain Tracker is responsible for verifying the validity of a given Merkle root
    for a specific block height within the blockchain.

    Chain Trackers ensure the integrity of the blockchain by
    validating new headers against the chain's history. They use accumulated
    proof-of-work and protocol adherence as metrics to assess the legitimacy of blocks.
    """

    @abstractmethod
    async def is_valid_root_for_height(self, root: str, height: int) -> bool:
        """
        Verify the validity of a Merkle root for a given block height.

        :param root: The Merkle root to verify.
        :param height: The block height to verify against.
        :return: A boolean indicating if the Merkle root is valid for the specified block height.
        """
        pass
```

Given an array of merkle roots and corresponding block heights, we return a boolean indicating whether they're all valid.

We can plug in the Block Header Service API with appropriate HTTP handling logic as follows:

```typescript
class WhatsOnChainTracker(ChainTracker):
    def __init__(
            self,
            network: str = "main",
            api_key: Optional[str] = None,
            http_client: Optional[HttpClient] = None,
    ):
        self.network = network
        self.URL = f"https://api.whatsonchain.com/v1/bsv/{network}"
        self.http_client = (
            http_client if http_client else default_http_client()
        )
        self.api_key = api_key

    async def is_valid_root_for_height(self, root: str, height: int) -> bool:
        request_options = {"method": "GET", "headers": self.get_headers()}

        response = await self.http_client.fetch(
            f"{self.URL}/block/{height}/header", request_options
        )
        if response.ok:
            merkleroot = response.json()["data"]["merkleroot"]
            return merkleroot == root
        elif response.status_code == 404:
            return False
        else:
            raise Exception(
                f"Failed to verify merkleroot for height {height} because of an error: {response.json()}"
            )

    def get_headers(self) -> Dict[str, str]:
        headers = {
            "Accept": "application/json",
        }
        if self.api_key:
            headers["Authorization"] = self.api_key
        return headers
```

Now, we can use our `WhatsOnChainTracker` as a `ChainTracker` when calling the `Transaction` object's `.verify()` method. You can see an example in the [BEEF verification guide](EXAMPLE_VERIFYING_BEEF.md).

This provides the ability to ensure that a transaction is well-anchored.
