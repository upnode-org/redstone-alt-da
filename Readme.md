# Redstone Alt DA

This tool push offchain Redstone data availability to third-party DA providers through our [Alt-DA Translation Hub](https://github.com/upnodedev/op-alt-da)

## Launching an instance of Alt DA

1. Clone https://github.com/upnodedev/op-alt-da
2. Launch Alt DA with the command below (For Celestia DA)

```bash
go run ./cmd/alt-da start --da celestia \
  --celestia.auth_token=... \
  --celestia.namespace=... \
  --celestia.rpc=... \
  --private-key=...
```

`celestia.namespace` can be any 29 bytes hex with 19 bytes leading zeroes such as `00000000000000000000000000000000000000eeeef23aa24dee7eeeee` (You could change eeee...eeee part to any hex you want)

For `celestia.auth_token` and `celestia.rpc`, please refer to [Celestia Node](https://docs.celestia.org/tutorials/node-tutorial) and [Celestia Auth Token](https://docs.celestia.org/tutorials/node-tutorial#auth-token) documentations.

And `private-key` is a private key of the wallet that submit to the Alt-DA translation hub contract

Now, we will have an Alt DA server running at port 8087 on localhost

## Launching Redstone Alt DA Submitter

1. Clone https://github.com/upnode-org/redstone-alt-da
2. Run `yarn install`
3. Create `.env` file and set these environment variables

```
ALT_DA_ENDPOINT=http://localhost:8087
MORALIS_API_KEY=...
```

You can get a Moralis API Key from https://admin.moralis.com/api-keys

4. Run `yarn build && yarn start`
