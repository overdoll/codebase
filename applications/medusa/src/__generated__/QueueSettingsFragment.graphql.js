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
  +id: string,
  +moderatorSettings: {|
    +isInModeratorQueue: boolean
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
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ModeratorSettings",
      "kind": "LinkedField",
      "name": "moderatorSettings",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isInModeratorQueue",
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
(node: any).hash = 'd3c67b9890964a2024059300c14fb725';
module.exports = node;
