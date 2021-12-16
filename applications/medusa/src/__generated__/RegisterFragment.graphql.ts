/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RegisterFragment = {
    readonly id: string;
    readonly token: string;
    readonly " $refType": "RegisterFragment";
};
export type RegisterFragment$data = RegisterFragment;
export type RegisterFragment$key = {
    readonly " $data"?: RegisterFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RegisterFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegisterFragment",
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
(node as any).hash = '45e11cad02f16cfde09a47bf7933ae89';
export default node;
