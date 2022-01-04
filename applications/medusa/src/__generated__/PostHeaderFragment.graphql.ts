/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostHeaderFragment = {
    readonly reassignmentAt: unknown | null;
    readonly " $fragmentRefs": FragmentRefs<"PostHeaderClubFragment">;
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
      "name": "PostHeaderClubFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '7e11147528c37f19210164add4613fa9';
export default node;
