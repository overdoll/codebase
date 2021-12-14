/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type TotpFragment = {
    readonly token: string;
    readonly " $refType": "TotpFragment";
};
export type TotpFragment$data = TotpFragment;
export type TotpFragment$key = {
    readonly " $data"?: TotpFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"TotpFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TotpFragment",
  "selections": [
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
(node as any).hash = '3b76dc95392d94e6750767ad6845aa59';
export default node;
