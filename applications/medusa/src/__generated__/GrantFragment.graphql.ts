/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GrantFragment = {
    readonly id: string;
    readonly token: string;
    readonly " $refType": "GrantFragment";
};
export type GrantFragment$data = GrantFragment;
export type GrantFragment$key = {
    readonly " $data"?: GrantFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"GrantFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GrantFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "token",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
(node as any).hash = 'd1a48d67102c1579634eb6658fa56d91';
export default node;
