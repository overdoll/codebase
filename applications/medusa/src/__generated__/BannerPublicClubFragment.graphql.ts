/**
 * @generated SignedSource<<96fb93343bbe1056165f665e4047c090>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerPublicClubFragment$data = {
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
  readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment" | "MenuPublicClubFragment" | "SharePublicClubFragment">;
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

(node as any).hash = "80d2de9de29f336c5a6e933a81cfd2f9";

export default node;
