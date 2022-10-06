/**
 * @generated SignedSource<<a8efd1b7cf60dd9a4c703ae2447a41a9>>
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
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly viewerMember: {
      readonly __typename: "ClubMember";
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment" | "ClubJoinButtonFragment">;
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
          "name": "id",
          "storageKey": null
        },
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
          "alias": null,
          "args": null,
          "concreteType": "ClubMember",
          "kind": "LinkedField",
          "name": "viewerMember",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
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
          "name": "ClubJoinButtonFragment"
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

(node as any).hash = "56cf97f78f88b55ce4d7f42b55872770";

export default node;
