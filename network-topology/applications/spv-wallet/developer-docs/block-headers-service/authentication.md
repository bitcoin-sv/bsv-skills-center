# Authentication

## Enabled by Default

By default, it is assumed that you want to use Authentication, which requires a single environment variable.

`BHS_HTTP_AUTH_TOKEN=replace_me_with_token_you_want_to_use_as_admin_token`

## Disabling Auth Requirement

To disable authentication and expose all endpoints openly, set the following environment variable.
This is available if you prefer to use your own authentication in a separate proxy or similar.
We do not recommend you expose the server to the internet without authentication,
as it would then be possible for anyone to prune your headers at will.

`BHS_HTTP_USE_AUTH=false`

## Authenticate with admin token

After the setup of authentication you can use provided token to authenticate.
To do it, just add the following header to all the requests to Block Headers Service.
```
Authorization: Bearer replace_me_with_token_you_want_to_use_as_admin_token
```

## Additional tokens

If you have a need for additional tokens to authenticate in Block Headers Service.
you can generate such with the following request:
```http request
POST https://{{block-headers-service_url}}/api/v1/access
Authorization: Bearer replace_me_with_token_you_want_to_use_as_admin_token
```
In response, you should receive something similar to the following:
```json
{
  "token": "some_token_created_by_server",
  "createdAt": "2023-05-11T10:20:16.227582Z",
  "isAdmin": false
}
```
Now, you can take the value from the 'token' property in the response and use it in all requests to the server by setting it as a header.
```http header
Authorization: Bearer some_token_created_by_server
```

If at some point you want to revoke this additional token you can make a request:
```http request
DELETE https://{{block-headers-service_url}}/api/v1/access/{{some_token_created_by_server}}
Authorization: Bearer replace_me_with_token_you_want_to_use_as_admin_token
```
After this request succeeded the token can't be used to authenticate in Block Headers Service.
