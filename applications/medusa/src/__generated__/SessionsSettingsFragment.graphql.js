/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { RevokeSessionFragment$ref } from "./RevokeSessionFragment.graphql";
import type { FragmentReference } from "relay-runtime";
import type { SessionsSettingsFragment$ref, SessionsSettingsFragment$fragmentType } from "./SessionsPaginationQuery.graphql";
export type { SessionsSettingsFragment$ref, SessionsSettingsFragment$fragmentType };
export type SessionsSettingsFragment = {|
  +sessions: {|
    +__id: string,
    +edges: $ReadOnlyArray<{|
      +node: {|
        +userAgent: string,
        +ip: string,
        +created: string,
        +current: boolean,
        +$fragmentRefs: RevokeSessionFragment$ref,
      |}
    |}>,
  |},
  +id: string,
  +$refType: SessionsSettingsFragment$ref,
|};
export type SessionsSettingsFragment$data = SessionsSettingsFragment;
export type SessionsSettingsFragment$key = {
  +$data?: SessionsSettingsFragment$data,
  +$fragmentRefs: SessionsSettingsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "sessions"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 3,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./SessionsPaginationQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "SessionsSettingsFragment",
  "selections": [
    {
      "alias": "sessions",
      "args": null,
      "concreteType": "AccountSessionConnection",
      "kind": "LinkedField",
      "name": "__sessions_sessions_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountSessionEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AccountSession",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "userAgent",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "ip",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "created",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "current",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "RevokeSessionFragment"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = '365dcbe4b362aee7bed2a27fc215aff3';
module.exports = node;
