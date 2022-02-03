/**
 * @generated SignedSource<<dba993d81c76bd145069b2121e0c79e0>>
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

(node as any).hash = "078eda26610ea54daaa18bd3fc03fdac";

export default node;
