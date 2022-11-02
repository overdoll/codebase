/**
 * @generated SignedSource<<1dd86cfde08c396d5cd672d6bc24bf05>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RecommendedPostsGridFragment$data = {
  readonly postsRecommendations: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"GridPaginationPostFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "RecommendedPostsGridFragment";
};
export type RecommendedPostsGridFragment$key = {
  readonly " $data"?: RecommendedPostsGridFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RecommendedPostsGridFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecommendedPostsGridFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "postsRecommendations",
      "plural": false,
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "GridPaginationPostFragment"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "postsRecommendations(first:30)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "ddf67edbf9f809989af5b1dce8b1d67e";

export default node;
