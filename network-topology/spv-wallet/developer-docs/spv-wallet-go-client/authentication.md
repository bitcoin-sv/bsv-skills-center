# Authentication

## Authenticate as admin

To authenticate within the SPV Wallet as an admin, you need to use admin HD key pair.\
At the SPV Wallet side the admin key pair is recognized by the admin xpub which need to be configured ([see configuration docs](../spv-wallet/configuration.md)).

When you have the admin xpriv, you can now create SPV Wallet Client for admin API:

```go
import (
	wallet "github.com/bitcoin-sv/spv-wallet-go-client"
	"github.com/bitcoin-sv/spv-wallet-go-client/config"
)

func main() {
	adminAPI, err := wallet.NewAdminAPIWithXPriv(config.New(config.WithAddr("{{spv-wallet-url}}")), "{{xpriv_of_the_admin}}")
	// ...
}
```

## User

### Authentication using HD keys of user

#### Register users xpub

To authenticate as user, first user and his xpub must be added by admin to SPV Wallet.

To register user, admin need to make a following request to SPV Wallet:

```go
import (
    "context"
    
    wallet "github.com/bitcoin-sv/spv-wallet-go-client"
    "github.com/bitcoin-sv/spv-wallet-go-client/commands"
    "github.com/bitcoin-sv/spv-wallet-go-client/config"
)

func main() {
    adminAPI, err := wallet.NewAdminAPIWithXPriv(config.New(config.WithAddr("{{spv-wallet-url}}")), "{{xpriv_of_the_admin}}")
    // ...
    res, err := adminAPI.CreateXPub(context.Background(), &commands.CreateUserXpub{XPub: "{{xpub_of_the_user}}"})
    // ...
}
```

#### Authenticate with users xpub

To authenticate within the SPV Wallet as a user, you simply need to create a new SPV Wallet Client for users API.

```go
import (
	wallet "github.com/bitcoin-sv/spv-wallet-go-client"
	"github.com/bitcoin-sv/spv-wallet-go-client/config"
)

func main() {
	userAPI, err := wallet.NewUserAPIWithXPriv(config.New(config.WithAddr("{{spv-wallet-url}}")), "{{xpriv_of_the_user}}")
	//...
}
```

### Authentication using Access key

Another way of authenticate as a user is by use of access key.

#### Create

To authenticate as user with access key, first user must create an access key by making a following call:

```go
import (
	"context"

	wallet "github.com/bitcoin-sv/spv-wallet-go-client"
	"github.com/bitcoin-sv/spv-wallet-go-client/commands"
	"github.com/bitcoin-sv/spv-wallet-go-client/config"
)

func main() {
	userAPI, err := wallet.NewUserAPIWithXPriv(config.New(config.WithAddr("{{spv-wallet-url}}")), "{{xpriv_of_the_user}}")
	// ...
	
	response, err := userAPI.GenerateAccessKey(context.Background(), &commands.GenerateAccessKey{})
	// ...
}
```

In response, you can find the following important properties:

* `Key` - which is actually an additional private key and is not stored on the SPV Wallet side, so it is displayed to user only once and user is responsible for storing it
* `ID` - which actually can be used for checking the state of the access key (if it was revoked or when it was created) or revoking it.

#### Use

To authenticate as user with access key, you need to create a new SPV Wallet Client for users API with the access key.

```go
import (
    wallet "github.com/bitcoin-sv/spv-wallet-go-client"
    "github.com/bitcoin-sv/spv-wallet-go-client/config"
)

func main() {
    userAPI, err := wallet.NewUserAPIWithAccessKey(config.New(config.WithAddr("{{spv-wallet-url}}")), "{{key}}")
    //...
}
```

#### Revoke

Whenever a user believes that a particular access key has been compromised or is no longer needed, it can be revoked to prevent any further use.

To revoke an access key, a user needs to make the following call:

```go
import (
	"context"

	wallet "github.com/bitcoin-sv/spv-wallet-go-client"
	"github.com/bitcoin-sv/spv-wallet-go-client/config"
)

func main() {
	userAPI, err := wallet.NewUserAPIWithXPriv(config.New(config.WithAddr("{{spv-wallet-url}}")), "{{xpriv_of_the_user}}")
	// ...

	err := userAPI.RevokeAccessKey(context.Background(), "{{access_key_id}}")
	// ...
}
```
