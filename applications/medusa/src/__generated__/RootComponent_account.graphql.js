/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type AccountRoleEnum = "Moderator" | "Staff" | "%future added value";
import type { FragmentReference } from "relay-runtime";
import type { RootComponent_account$ref, RootComponent_account$fragmentType } from "./RootAccountRefreshQuery.graphql";
export type { RootComponent_account$ref, RootComponent_account$fragmentType };
export type RootComponent_account = {|
  +authenticatedAccount: ?{|
    +username: string,
    +roles: $ReadOnlyArray<AccountRoleEnum>,
  |},
  +$refType: RootComponent_account$ref,
|};
export type RootComponent_account$data = RootComponent_account;
export type RootComponent_account$key = {
  +$data?: RootComponent_account$data,
  +$fragmentRefs: RootComponent_account$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./RootAccountRefreshQuery.graphql.js')
    }
  },
  "name": "RootComponent_account",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "authenticatedAccount",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "roles",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '306e9e7ab1478cdfad4b641f02db479e';
module.exports = node;
