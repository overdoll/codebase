/**
 * @generated SignedSource<<acb3f6a9746a58698d5f122c0f5ecb4d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostStateClubFragment$data = {
  readonly __typename: "Club";
  readonly " $fragmentSpreads": FragmentRefs<"ClubDraftPostsAlertFragment" | "ClubInformationBannerFragment" | "CreatePostFlowFragment">;
  readonly " $fragmentType": "PostStateClubFragment";
};
export type PostStateClubFragment$key = {
  readonly " $data"?: PostStateClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostStateClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostStateClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubInformationBannerFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubDraftPostsAlertFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreatePostFlowFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a710e4d85f3b41bd1e7a305f1e1eca0e";

export default node;
