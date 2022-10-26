/**
 * @generated SignedSource<<6bfbf0c5504d5adf59f682a324cb4071>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubShareRedditButtonFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "ClubShareRedditButtonFragment";
};
export type ClubShareRedditButtonFragment$key = {
  readonly " $data"?: ClubShareRedditButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubShareRedditButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubShareRedditButtonFragment",
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "82c1f192903e6c46cca9a7d3c04ee218";

export default node;
