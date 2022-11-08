/**
 * @generated SignedSource<<3aef28d2d496d4d5cd733221c6404d28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerPublicClubFragment$data = {
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubBlurbFragment" | "ClubExternalLinksFragment" | "ScrollClubPostsFragment">;
  readonly " $fragmentType": "ContainerPublicClubFragment";
};
export type ContainerPublicClubFragment$key = {
  readonly " $data"?: ContainerPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerPublicClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubExternalLinksFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubBlurbFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollClubPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "fb714b408dd77b1b786297c20f18376d";

export default node;
