/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProfileButtonFragment = {
    readonly username: string;
    readonly avatar: unknown;
    readonly " $refType": "ProfileButtonFragment";
};
export type ProfileButtonFragment$data = ProfileButtonFragment;
export type ProfileButtonFragment$key = {
    readonly " $data"?: ProfileButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ProfileButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileButtonFragment",
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
(node as any).hash = '7de2cbb24b75b9bd132687424dcd951d';
export default node;
