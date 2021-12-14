/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MakePrimaryFragment = {
    readonly id: string;
    readonly email: string;
    readonly " $refType": "MakePrimaryFragment";
};
export type MakePrimaryFragment$data = MakePrimaryFragment;
export type MakePrimaryFragment$key = {
    readonly " $data"?: MakePrimaryFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MakePrimaryFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MakePrimaryFragment",
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
      "name": "email",
      "storageKey": null
    }
  ],
  "type": "AccountEmail",
  "abstractKey": null
};
(node as any).hash = '9fe90f28be57ac0e819ab85109160030';
export default node;
