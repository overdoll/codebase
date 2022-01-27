/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuickAccessButtonProfileFragment = {
    readonly username: string;
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
(node as any).hash = '65af5247a5dcb73fd68149cacc5d7b82';
export default node;
