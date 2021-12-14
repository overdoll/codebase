/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostHeaderFragment = {
    readonly reassignmentAt: unknown | null;
    readonly " $fragmentRefs": FragmentRefs<"PostBrandFragment">;
    readonly " $refType": "PostHeaderFragment";
};
export type PostHeaderFragment$data = PostHeaderFragment;
export type PostHeaderFragment$key = {
    readonly " $data"?: PostHeaderFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostHeaderFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reassignmentAt",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostBrandFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'b8e7fb28012b7383556c5d32b065ad32';
export default node;
