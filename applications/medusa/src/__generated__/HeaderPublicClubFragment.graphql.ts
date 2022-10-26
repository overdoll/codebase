/**
 * @generated SignedSource<<a7c663ce154e137cc51f9fe8796096ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubFragment$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubExternalLinksFragment" | "ClubJoinLeaveButtonFragment">;
  readonly " $fragmentType": "HeaderPublicClubFragment";
};
export type HeaderPublicClubFragment$key = {
  readonly " $data"?: HeaderPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderPublicClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
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
      "name": "ClubJoinLeaveButtonFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "1b122d18f5a2b27c1cb7dee1153ef5df";

export default node;
