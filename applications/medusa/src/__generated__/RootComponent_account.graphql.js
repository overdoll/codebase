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
  +viewer: ?{|
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
      "concreteType": "Viewer",
      "kind": "LinkedField",
      "name": "viewer",
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
(node: any).hash = 'b2c00bb941f6dd7e2b6aa2df3f3d257e';
module.exports = node;
