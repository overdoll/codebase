/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { EmailCardFragment$ref } from "./EmailCardFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type EmailsSettingsFragment$ref: FragmentReference;
declare export opaque type EmailsSettingsFragment$fragmentType: EmailsSettingsFragment$ref;
export type EmailsSettingsFragment = {|
  +emails: {|
    +__id: string,
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +$fragmentRefs: EmailCardFragment$ref,
      |}
    |}>,
  |},
  +$refType: EmailsSettingsFragment$ref,
|};
export type EmailsSettingsFragment$data = EmailsSettingsFragment;
export type EmailsSettingsFragment$key = {
  +$data?: EmailsSettingsFragment$data,
  +$fragmentRefs: EmailsSettingsFragment$ref,
  ...
};


const node: ReaderFragment = {
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
          "emails"
        ]
      }
    ]
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
                  "name": "id",
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
    }
  ],
  "type": "Account",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '406b623f1b92918b91d06bf91c499728';
module.exports = node;
