/**
 * @generated SignedSource<<85f47ad6167d70bff510e7973363402d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerSupportClubFragment$data = {
  readonly name: string;
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"GridPaginationPostFragment">;
      };
    }>;
  };
  readonly reference: string;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ClubIconFragment" | "ClubTileOverlayFragment">;
  readonly " $fragmentType": "ContainerSupportClubFragment";
};
export type ContainerSupportClubFragment$key = {
  readonly " $data"?: ContainerSupportClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerSupportClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerSupportClubFragment",
  "selections": [
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
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubIconFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubTileOverlayFragment"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
        },
        {
          "kind": "Literal",
          "name": "supporterOnlyStatus",
          "value": [
            "NONE",
            "PARTIAL",
            "FULL"
          ]
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
      "storageKey": "posts(first:6,supporterOnlyStatus:[\"NONE\",\"PARTIAL\",\"FULL\"])"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "44696e09a2187484bb17ffda6a62de7b";

export default node;
