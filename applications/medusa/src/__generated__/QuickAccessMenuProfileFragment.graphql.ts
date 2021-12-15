/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuickAccessMenuProfileFragment = {
    readonly username: string;
    readonly avatar: unknown;
    readonly " $refType": "QuickAccessMenuProfileFragment";
};
export type QuickAccessMenuProfileFragment$data = QuickAccessMenuProfileFragment;
export type QuickAccessMenuProfileFragment$key = {
    readonly " $data"?: QuickAccessMenuProfileFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"QuickAccessMenuProfileFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuickAccessMenuProfileFragment",
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
(node as any).hash = 'e9868fc6e3c80fa6b6af02c2c198fb54';
export default node;
