/**
 * @generated SignedSource<<8a429c2bed0c07f553b83b8653b27189>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerPublicClubFragment$data = {
  readonly header: {
    readonly __typename: string;
  } | null;
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly content: ReadonlyArray<{
          readonly media: {
            readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubMediaFragment">;
          };
        }>;
        readonly id: string;
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ClubHeaderFragment" | "ClubIconFragment" | "MenuPublicClubFragment" | "SharePublicClubFragment">;
  readonly " $fragmentType": "BannerPublicClubFragment";
};
export type BannerPublicClubFragment$key = {
  readonly " $data"?: BannerPublicClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerPublicClubFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 3
        },
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "TOP"
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
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
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
                      "concreteType": null,
                      "kind": "LinkedField",
                      "name": "media",
                      "plural": false,
                      "selections": [
                        {
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "BannerPublicClubMediaFragment"
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
      "storageKey": "posts(first:3,sortBy:\"TOP\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "header",
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
      "name": "ClubHeaderFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubIconFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MenuPublicClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SharePublicClubFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "a7a498a0c94c310f8b07e19650092c61";

export default node;
