/**
 * @generated SignedSource<<fb1dba192702780d9d2443ee4cbc1f53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsHorizontalPreviewFragment$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly reference: string;
      readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment">;
    };
  }>;
  readonly " $fragmentType": "PostsHorizontalPreviewFragment";
};
export type PostsHorizontalPreviewFragment = PostsHorizontalPreviewFragment$data;
export type PostsHorizontalPreviewFragment$key = {
  readonly " $data"?: PostsHorizontalPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostsHorizontalPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostsHorizontalPreviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Post",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "reference",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PostPreviewContentFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostConnection",
  "abstractKey": null
};

(node as any).hash = "f8f5a403bedad5b435dcc3cfccbce02e";

export default node;
