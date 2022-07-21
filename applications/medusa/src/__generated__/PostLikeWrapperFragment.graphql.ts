/**
 * @generated SignedSource<<0aa84d1e5b2da046b28d7300a388519b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostLikeWrapperFragment$data = {
  readonly id: string;
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

(node as any).hash = "dcada40121cc883028a00da7db4e64dd";

export default node;
