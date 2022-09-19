/**
 * @generated SignedSource<<e2d3fcb998bb5d47a9d41d642f314bda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPostFragment$data = {
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment" | "JoinClubPublicPostFragment">;
  };
  readonly description: string;
  readonly " $fragmentType": "ClubPublicPostFragment";
};
export type ClubPublicPostFragment$key = {
  readonly " $data"?: ClubPublicPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPublicPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
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
          "name": "ClubIconFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "JoinClubPublicPostFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "d0f285c3fbecdf9a39af9e4455ec96ea";

export default node;
