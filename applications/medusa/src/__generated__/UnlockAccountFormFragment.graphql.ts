/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnlockAccountFormFragment = {
    readonly id: string;
    readonly " $refType": "UnlockAccountFormFragment";
};
export type UnlockAccountFormFragment$data = UnlockAccountFormFragment;
export type UnlockAccountFormFragment$key = {
    readonly " $data"?: UnlockAccountFormFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UnlockAccountFormFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnlockAccountFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = 'e762dc0a9488c0e1299b0599f938d00f';
export default node;
