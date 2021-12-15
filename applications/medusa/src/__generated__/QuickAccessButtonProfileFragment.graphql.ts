/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuickAccessButtonProfileFragment = {
    readonly avatar: unknown;
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
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '1411a6d15c2a741a498c4af54465f525';
export default node;
