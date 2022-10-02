/**
 * @generated SignedSource<<1c79e5945cd89cef3f1b4554adb3690d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MobileAlternativeMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DropdownMenuButtonsFragment">;
  readonly " $fragmentType": "MobileAlternativeMenuFragment";
};
export type MobileAlternativeMenuFragment$key = {
  readonly " $data"?: MobileAlternativeMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MobileAlternativeMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MobileAlternativeMenuFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DropdownMenuButtonsFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "3cb8a4bf34393ed13b0ad04b0b8ee0e1";

export default node;
