/**
 * @generated SignedSource<<46ba0ee4136f75221ce3e54bc2f2e818>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubTileOverlayFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly content: ReadonlyArray<{
          readonly resource: {
            readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
          };
        }>;
      };
    }>;
  };
  readonly " $fragmentType": "ClubTileOverlayFragment";
};
export type ClubTileOverlayFragment = ClubTileOverlayFragment$data;
export type ClubTileOverlayFragment$key = {
  readonly " $data"?: ClubTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubTileOverlayFragment",
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "posts",
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
                  "concreteType": "PostContent",
                  "kind": "LinkedField",
                  "name": "content",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Resource",
                      "kind": "LinkedField",
                      "name": "resource",
                      "plural": false,
                      "selections": [
                        {
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "ResourceItemFragment"
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
          "storageKey": null
        }
      ],
      "storageKey": "posts(first:1)"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f723b4b71736d036e5604084072c1627";

export default node;
