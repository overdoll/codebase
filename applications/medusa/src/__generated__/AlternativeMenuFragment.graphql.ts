/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlternativeMenuFragment = {
    readonly " $fragmentRefs": FragmentRefs<"DropdownMenuButtonProfileFragment" | "QuickAccessButtonProfileFragment" | "LanguageManagerFragment">;
    readonly " $refType": "AlternativeMenuFragment";
};
export type AlternativeMenuFragment$data = AlternativeMenuFragment;
export type AlternativeMenuFragment$key = {
    readonly " $data"?: AlternativeMenuFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AlternativeMenuFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlternativeMenuFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DropdownMenuButtonProfileFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuickAccessButtonProfileFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LanguageManagerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '01d079aadc1017275737d344b56c1b8a';
export default node;
