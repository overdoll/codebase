/**
 * @generated SignedSource<<72074e5ff82de74513af4bdeae18a5ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinLoggedOutButtonFragment$data = {
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "ClubJoinLoggedOutButtonFragment";
};
export type ClubJoinLoggedOutButtonFragment$key = {
  readonly " $data"?: ClubJoinLoggedOutButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinLoggedOutButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinLoggedOutButtonFragment",
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

(node as any).hash = "d038cfccdba2f1f48206caae46404b9c";

export default node;
