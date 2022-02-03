/**
 * @generated SignedSource<<466c0108e707a8e3dc556811ad164e61>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderFragment$data = {
  readonly reassignmentAt: any | null;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderClubFragment">;
  readonly " $fragmentType": "PostHeaderFragment";
};
export type PostHeaderFragment = PostHeaderFragment$data;
export type PostHeaderFragment$key = {
  readonly " $data"?: PostHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderFragment">;
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

(node as any).hash = "7e11147528c37f19210164add4613fa9";

export default node;
