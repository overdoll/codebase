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
  +moderator: ?{|
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
      "concreteType": "Moderator",
      "kind": "LinkedField",
      "name": "moderator",
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
  "type": "Account",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'fec638bad0397d02a842975b4b7aff19';
module.exports = node;
