/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DeleteFragment = {
    readonly id: string;
    readonly email: string;
    readonly " $refType": "DeleteFragment";
};
export type DeleteFragment$data = DeleteFragment;
export type DeleteFragment$key = {
    readonly " $data"?: DeleteFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"DeleteFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteFragment",
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
(node as any).hash = '1e70daac2f5bdbfb6f7895bda5c4b14b';
export default node;
