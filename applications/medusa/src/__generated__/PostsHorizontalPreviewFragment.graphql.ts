/**
 * @generated SignedSource<<f47221f65408cd4e1287bd8140bb1085>>
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
      readonly id: string;
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

(node as any).hash = "5430b22cb2d68127a698161b6a5bc368";

export default node;
