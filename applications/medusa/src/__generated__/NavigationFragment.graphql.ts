/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type NavigationFragment = {
    readonly " $fragmentRefs": FragmentRefs<"SimpleProfileButtonFragment" | "ProfileButtonFragment">;
    readonly " $refType": "NavigationFragment";
};
export type NavigationFragment$data = NavigationFragment;
export type NavigationFragment$key = {
    readonly " $data"?: NavigationFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NavigationFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavigationFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SimpleProfileButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProfileButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = 'caa555e42cda0b63f24f9388dddd21d9';
export default node;
