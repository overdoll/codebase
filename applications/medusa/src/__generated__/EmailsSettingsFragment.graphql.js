/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { EmailCardFragment$ref } from "./EmailCardFragment.graphql";
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
import type { FragmentReference } from "relay-runtime";
import type { EmailsSettingsFragment$ref, EmailsSettingsFragment$fragmentType } from "./EmailsSettingsPaginationQuery.graphql";
export type { EmailsSettingsFragment$ref, EmailsSettingsFragment$fragmentType };
export type EmailsSettingsFragment = {|
  +emails: {|
    +__id: string,
    +edges: $ReadOnlyArray<{|
      +node: {|
        +status: AccountEmailStatus,
        +$fragmentRefs: EmailCardFragment$ref,
      |}
    |}>,
  |},
  +id: string,
  +$refType: EmailsSettingsFragment$ref,
|};
export type EmailsSettingsFragment$data = EmailsSettingsFragment;
export type EmailsSettingsFragment$key = {
  +$data?: EmailsSettingsFragment$data,
  +$fragmentRefs: EmailsSettingsFragment$ref,
  ...
};


const node: ReaderFragment = (function(){
var v0 = [
  "emails"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 5,
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
      "operation": require('./EmailsSettingsPaginationQuery.graphql.js'),
      "identifierField": "id"
    }
  },
  "name": "EmailsSettingsFragment",
  "selections": [
    {
      "alias": "emails",
      "args": null,
      "concreteType": "AccountEmailConnection",
      "kind": "LinkedField",
      "name": "__EmailsSettingsFragment_emails_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AccountEmailEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AccountEmail",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "status",
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
                  "name": "EmailCardFragment"
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
(node: any).hash = '61647e9f7d6b3b803b4605825e973488';
module.exports = node;
