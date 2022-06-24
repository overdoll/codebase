/**
 * @generated SignedSource<<a68033c5b4e5e13476880d1109598b66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubRichObjectFragment$data = {
  readonly backgroundPost: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PostContentRichObjectFragment">;
      };
    }>;
  };
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "PublicClubRichObjectFragment";
};
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
