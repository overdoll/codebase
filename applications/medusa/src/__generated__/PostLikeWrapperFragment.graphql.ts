/**
 * @generated SignedSource<<7f3fb15f293ea70ef7628d6d7bb6317a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostLikeWrapperFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly id: string;
  readonly reference: string;
  readonly viewerLiked: {
    readonly __typename: "PostLike";
  } | null;
  readonly " $fragmentType": "PostLikeWrapperFragment";
};
export type PostLikeWrapperFragment$key = {
  readonly " $data"?: PostLikeWrapperFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeWrapperFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostLikeWrapperFragment",
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
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PostLike",
      "kind": "LinkedField",
      "name": "viewerLiked",
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
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "b432e07541e0d80d10ffbc75ada7941c";

export default node;
