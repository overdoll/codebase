/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RevokeSessionFragment = {
    readonly id: string;
    readonly " $refType": "RevokeSessionFragment";
};
export type RevokeSessionFragment$data = RevokeSessionFragment;
export type RevokeSessionFragment$key = {
    readonly " $data"?: RevokeSessionFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RevokeSessionFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RevokeSessionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "AccountSession",
  "abstractKey": null
};
(node as any).hash = 'a9c954e8aff1aab33a851f19553e0eca';
export default node;
