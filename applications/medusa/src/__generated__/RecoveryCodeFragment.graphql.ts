/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RecoveryCodeFragment = {
    readonly token: string;
    readonly " $refType": "RecoveryCodeFragment";
};
export type RecoveryCodeFragment$data = RecoveryCodeFragment;
export type RecoveryCodeFragment$key = {
    readonly " $data"?: RecoveryCodeFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RecoveryCodeFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecoveryCodeFragment",
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
(node as any).hash = 'dfc6ed9d107afb9db8080d00e8ca0d8d';
export default node;
