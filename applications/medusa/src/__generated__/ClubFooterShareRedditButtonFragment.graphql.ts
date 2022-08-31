/**
 * @generated SignedSource<<f679918d7fb3f48f727c076bbe9c04b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubFooterShareRedditButtonFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "ClubFooterShareRedditButtonFragment";
};
export type ClubFooterShareRedditButtonFragment$key = {
  readonly " $data"?: ClubFooterShareRedditButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterShareRedditButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubFooterShareRedditButtonFragment",
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

(node as any).hash = "7896465664e6f2d6c9e813c23c7a3616";

export default node;
