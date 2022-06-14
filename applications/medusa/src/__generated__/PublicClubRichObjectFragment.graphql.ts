/**
 * @generated SignedSource<<e5bc00372ef10ca25833c867c934d7ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubRichObjectFragment$data = {
  readonly slug: string;
  readonly name: string;
  readonly backgroundPost: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PostContentRichObjectFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "PublicClubRichObjectFragment";
};
export type PublicClubRichObjectFragment = PublicClubRichObjectFragment$data;
export type PublicClubRichObjectFragment$key = {
  readonly " $data"?: PublicClubRichObjectFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicClubRichObjectFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PublicClubRichObjectFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
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
      "alias": "backgroundPost",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostContentRichObjectFragment"
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

(node as any).hash = "609dbbbf88217f4311e86352f12bbee4";

export default node;
