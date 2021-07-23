/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type AccountLockReason = "PostInfraction" | "%future added value";
import type { FragmentReference } from "relay-runtime";
import type { RootComponent_account$ref, RootComponent_account$fragmentType } from "./RootAccountRefreshQuery.graphql";
export type { RootComponent_account$ref, RootComponent_account$fragmentType };
export type RootComponent_account = {|
  +viewer: ?{|
    +username: string,
    +isStaff: boolean,
    +isArtist: boolean,
    +isModerator: boolean,
    +avatar: any,
    +lock: ?{|
      +reason: AccountLockReason,
      +expires: number,
    |},
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
          "name": "isStaff",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isArtist",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isModerator",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatar",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountLock",
          "kind": "LinkedField",
          "name": "lock",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "reason",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "expires",
              "storageKey": null
            }
          ],
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
(node: any).hash = '0dfb3e06e95cac865f3fcb93a5811d1c';
module.exports = node;
