/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type QueueSettingsFragment$ref: FragmentReference;
declare export opaque type QueueSettingsFragment$fragmentType: QueueSettingsFragment$ref;
export type QueueSettingsFragment = {|
  +viewer: ?{|
    +__typename: string,
    +id: string,
  |},
  +$refType: QueueSettingsFragment$ref,
|};
export type QueueSettingsFragment$data = QueueSettingsFragment;
export type QueueSettingsFragment$key = {
  +$data?: QueueSettingsFragment$data,
  +$fragmentRefs: QueueSettingsFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QueueSettingsFragment",
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
          "name": "__typename",
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '2ed1838e8f0b2203db4d3f5e91e038c1';
module.exports = node;
