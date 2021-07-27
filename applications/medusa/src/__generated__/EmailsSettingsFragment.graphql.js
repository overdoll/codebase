/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type EmailsSettingsFragment$ref: FragmentReference;
declare export opaque type EmailsSettingsFragment$fragmentType: EmailsSettingsFragment$ref;
export type EmailsSettingsFragment = {|
  +emails: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +email: string,
        +status: AccountEmailStatus,
      |}
    |}>
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EmailsSettingsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountEmailConnection",
      "kind": "LinkedField",
      "name": "emails",
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
                  "name": "email",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "status",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'dda530c1b1c96d248f563fe3e44adf74';
module.exports = node;
