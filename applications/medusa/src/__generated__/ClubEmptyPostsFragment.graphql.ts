/**
 * @generated SignedSource<<b844e464c010c2d63ff1178f09a4e7ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubEmptyPostsFragment$data = {
  readonly slug: string;
  readonly viewerIsOwner: boolean;
  readonly " $fragmentType": "ClubEmptyPostsFragment";
};
export type ClubEmptyPostsFragment$key = {
  readonly " $data"?: ClubEmptyPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubEmptyPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubEmptyPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerIsOwner",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "711e0132916fd160d48c1614b6857ea9";

export default node;
