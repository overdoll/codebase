/**
 * @generated SignedSource<<9f2a3152970772bac41d667d9fb739de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostStateClubFragment$data = {
  readonly id: string;
  readonly __typename: "Club";
  readonly " $fragmentSpreads": FragmentRefs<"ClubInformationBannerFragment">;
  readonly " $fragmentType": "PostStateClubFragment";
};
export type PostStateClubFragment = PostStateClubFragment$data;
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "d6b50942fcc37c6ee120e4af1f9bf9eb";

export default node;
