# Webhooks

It is recommended to configure the webhook functionality to ensure that node operators are aware when alerts are published. The webhook is only fired if the `ALERT_SYSTEM_ALERT_WEBHOOK_URL` is set. When set, all alerts received will issue a `POST` request to this endpoint with the following payload:\


```json
{
    "alert_type": <uint32>,
    "raw": <raw hex string of the alert>,
    "sequence": <uint32>,
    "text": <human readable alert message string>
}
```

This format natively supports Slack webhooks, but any customizable operational procedure can be handled with this webhook.
