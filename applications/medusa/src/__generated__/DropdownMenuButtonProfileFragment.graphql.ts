/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DropdownMenuButtonProfileFragment = {
    readonly username: string;
    readonly avatar: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
    } | null;
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
(node as any).hash = '360aba14d2fa06a5c672bf759e028e4b';
export default node;
