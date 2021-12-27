/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QueueSettingsFragment = {
    readonly id: string;
    readonly moderatorSettings: {
        readonly isInModeratorQueue: boolean;
    };
    readonly " $refType": "QueueSettingsFragment";
};
export type QueueSettingsFragment$data = QueueSettingsFragment;
export type QueueSettingsFragment$key = {
    readonly " $data"?: QueueSettingsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"QueueSettingsFragment">;
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
(node as any).hash = 'd3c67b9890964a2024059300c14fb725';
export default node;
