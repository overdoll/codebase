/**
 * @generated SignedSource<<6871eb077a035e2b8aec2d677c4ca441>>
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubDraftPostsAlertFragment" | "ClubInformationBannerFragment">;
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "6fc23f74734f6098f45682a9756057ff";

export default node;
