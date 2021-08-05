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
    +__typename: string
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'ae2a17311769027df62fcefe59c2fa34';
module.exports = node;
