/**
 * @generated SignedSource<<76d74173b6a39207d4b4b4733017507f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchResultsClubFragment$data = {
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubTileOverlayFragment">;
  readonly " $fragmentType": "SearchResultsClubFragment";
};
export type SearchResultsClubFragment$key = {
  readonly " $data"?: SearchResultsClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SearchResultsClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SearchResultsClubFragment",
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
      "name": "ClubTileOverlayFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "19acb6bed010e03e7fc393228b4a629b";

export default node;
