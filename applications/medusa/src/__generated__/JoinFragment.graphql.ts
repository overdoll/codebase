/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type JoinFragment = {
    readonly email: string;
    readonly " $refType": "JoinFragment";
};
export type JoinFragment$data = JoinFragment;
export type JoinFragment$key = {
    readonly " $data"?: JoinFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"JoinFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinFragment",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
(node as any).hash = '34fd654e87ce3db60aaa5ce15530aa6a';
export default node;
