/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostMenuFragment = {
    readonly id: string;
    readonly " $refType": "PostMenuFragment";
};
export type PostMenuFragment$data = PostMenuFragment;
export type PostMenuFragment$key = {
    readonly " $data"?: PostMenuFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostMenuFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostMenuFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'f1b7b02b0a6634417d7c929579b2bb8f';
export default node;
