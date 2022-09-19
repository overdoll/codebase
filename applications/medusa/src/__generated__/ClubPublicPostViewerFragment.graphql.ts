/**
 * @generated SignedSource<<41c1c30b7081fdc93966ba87f3be2b7d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubPublicPostViewerFragment">;
  readonly " $fragmentType": "ClubPublicPostViewerFragment";
};
export type ClubPublicPostViewerFragment$key = {
  readonly " $data"?: ClubPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPublicPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinClubPublicPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "af86e5c12e638cc04239856587a15359";

export default node;
