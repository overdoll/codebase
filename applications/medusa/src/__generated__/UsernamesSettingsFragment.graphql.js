/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { UsernameAliasCard$ref } from "./UsernameAliasCard.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type UsernamesSettingsFragment$ref: FragmentReference;
declare export opaque type UsernamesSettingsFragment$fragmentType: UsernamesSettingsFragment$ref;
export type UsernamesSettingsFragment = {|
  +username: string,
  +usernames: {|
    +__id: string,
    +edges: $ReadOnlyArray<{|
      +node: {|
        +username: string,
        +$fragmentRefs: UsernameAliasCard$ref,
      |}
    |}>,
  |},
  +$refType: UsernamesSettingsFragment$ref,
|};
export type UsernamesSettingsFragment$data = UsernamesSettingsFragment;
export type UsernamesSettingsFragment$key = {
  +$data?: UsernamesSettingsFragment$data,
  +$fragmentRefs: UsernamesSettingsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": null,
        "direction": "forward",
        "path": [
          "usernames"
        ]
      }
    ]
  },
  "name": "UsernamesSettingsFragment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "usernames",
      "args": null,
      "concreteType": "AccountUsernameConnection",
      "kind": "LinkedField",
      "name": "__UsernamesSettingsFragment_usernames_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountUsernameEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AccountUsername",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
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
                  "name": "UsernameAliasCard"
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = 'cc77d6ea0d55a6d0b7fdb34008e8ae6f';
module.exports = node;
