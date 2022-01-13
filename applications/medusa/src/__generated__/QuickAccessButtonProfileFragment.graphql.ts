/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuickAccessButtonProfileFragment = {
    readonly avatar: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly " $refType": "QuickAccessButtonProfileFragment";
};
export type QuickAccessButtonProfileFragment$data = QuickAccessButtonProfileFragment;
export type QuickAccessButtonProfileFragment$key = {
    readonly " $data"?: QuickAccessButtonProfileFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"QuickAccessButtonProfileFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuickAccessButtonProfileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "avatar",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '9110d5ea7845df8ea7557b35ee2a7594';
export default node;
