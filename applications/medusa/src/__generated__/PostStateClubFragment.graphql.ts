/**
 * @generated SignedSource<<d4d85fb601679167c01fcc568e0a88c5>>
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
  readonly id: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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

(node as any).hash = "c96e23f89df6d166cf80f9ba85145b1b";

export default node;
