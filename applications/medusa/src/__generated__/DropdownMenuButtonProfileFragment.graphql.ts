/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DropdownMenuButtonProfileFragment = {
    readonly username: string;
    readonly avatar: string;
    readonly " $refType": "DropdownMenuButtonProfileFragment";
};
export type DropdownMenuButtonProfileFragment$data = DropdownMenuButtonProfileFragment;
export type DropdownMenuButtonProfileFragment$key = {
    readonly " $data"?: DropdownMenuButtonProfileFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"DropdownMenuButtonProfileFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DropdownMenuButtonProfileFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
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
(node as any).hash = '291730f3ad925ce9c8fe367b212efc9e';
export default node;
