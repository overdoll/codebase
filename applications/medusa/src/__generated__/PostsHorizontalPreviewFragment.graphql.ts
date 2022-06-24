/**
 * @generated SignedSource<<ff3e418180221246c36bcb1906b3c7a1>>
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
      readonly club: {
        readonly slug: string;
      };
      readonly reference: string;
      readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment">;
    };
  }>;
  readonly " $fragmentType": "PostsHorizontalPreviewFragment";
};
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

(node as any).hash = "b3567e19d7120719748b367b3ec92ec9";

export default node;
