/**
 * @generated SignedSource<<e8bcc9e35b127a7bea1204560d07ebf8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostLikeButtonFragment$data = {
  readonly id: string;
  readonly reference: string;
  readonly club: {
    readonly slug: string;
  };
  readonly viewerLiked: {
    readonly __typename: string;
  } | null;
  readonly likes: number;
  readonly " $fragmentType": "PostLikeButtonFragment";
};
export type PostLikeButtonFragment = PostLikeButtonFragment$data;
export type PostLikeButtonFragment$key = {
  readonly " $data"?: PostLikeButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostLikeButtonFragment",
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
      "name": "reference",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "likes",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "1ba15028b4da2743260e9a57a02a4536";

export default node;
