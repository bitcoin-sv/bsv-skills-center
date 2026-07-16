# Example: Building a Custom Transaction Broadcast Client

This guide walks through the necessary steps for building a custom transaction broadcast client.

## Overview

A transaction broadcast client is a crucial component in any Bitcoin SV application, allowing it to communicate with the Bitcoin SV network. Implementing a transaction broadcaster can be accomplished using the clearly defined Broadcast interface.

Our task will be to create a broadcaster that connects with the What's on Chain service. This broadcaster is particularly designed for browser applications and utilizes the standard Fetch API for HTTP communications with the relevant API endpoints.

## Getting Started

In order to build a compliant broadcast client, we first need to import the interfaces to implement.

```py
from bsv import (
    Broadcaster,
    BroadcastFailure,
    BroadcastResponse,
    Transaction,
    HttpClient,
    default_http_client,
)
```

Next, we create a new class that implements the Broadcaster interface which requires a broadcast function.

We will be implementing a What's on Chain (WOC) broadcaster that runs in a browser context and uses [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch\_API) to send a POST request to the WOC broadcast API endpoint.

```py
class WOC(Broadcaster):

    def __init__(self, network: str = "main", http_client: HttpClient = None):
        """
        Constructs an instance of the WOC broadcaster.

        :param network: which network to use (test or main)
        :param http_client: HTTP client to use. If None, will use default.
        """
        self.network = network
        self.URL = f"https://api.whatsonchain.com/v1/bsv/{network}/tx/raw"
        self.http_client = http_client if http_client else default_http_client()

    async def broadcast(
        self, tx: Transaction
    ) -> Union[BroadcastResponse, BroadcastFailure]:
        """
        Broadcasts a transaction via WOC.

        :param tx: The transaction to be broadcasted as a serialized hex string.
        :returns: BroadcastResponse or BroadcastFailure.
        """
        request_options = {
            "method": "POST",
            "headers": {"Content-Type": "application/json", "Accept": "text/plain"},
            "data": {"txhex": tx.hex()},
        }

        try:
            response = await self.http_client.fetch(self.URL, request_options)
            if response.ok:
                txid = response.json()["data"]
                return BroadcastResponse(
                    status="success", txid=txid, message="broadcast successful"
                )
            else:
                return BroadcastFailure(
                    status="error",
                    code=str(response.status_code),
                    description=response.json()["data"],
                )
        except Exception as error:
            return BroadcastFailure(
                status="error",
                code="500",
                description=(str(error) if str(error) else "Internal Server Error"),
            )
```

Now, you can make use of this broadcast client when sending transactions with the `.broadcast()` method:

```py
await tx.broadcast(WOC("test"))
```

The result will be one of the SDK's standard `BroadcastResponse` or `BroadcastFailure` types, indicating the status of your transaction.
