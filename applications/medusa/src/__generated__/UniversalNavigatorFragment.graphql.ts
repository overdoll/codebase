/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UniversalNavigatorFragment = {
    readonly " $fragmentRefs": FragmentRefs<"AlternativeMenuFragment">;
    readonly " $refType": "UniversalNavigatorFragment";
};
export type UniversalNavigatorFragment$data = UniversalNavigatorFragment;
export type UniversalNavigatorFragment$key = {
    readonly " $data"?: UniversalNavigatorFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UniversalNavigatorFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UniversalNavigatorFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AlternativeMenuFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = 'b2fe21485e34196bc7a2f619077e12f7';
export default node;
