/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClubTileOverlayFragment = {
    readonly name: string;
    readonly thumbnail: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly posts: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly content: ReadonlyArray<{
                    readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
                }>;
            };
        }>;
    };
    readonly " $refType": "ClubTileOverlayFragment";
};
export type ClubTileOverlayFragment$data = ClubTileOverlayFragment;
export type ClubTileOverlayFragment$key = {
    readonly " $data"?: ClubTileOverlayFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ClubTileOverlayFragment">;
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
                  "concreteType": "Resource",
                  "kind": "LinkedField",
                  "name": "content",
                  "plural": true,
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
      "storageKey": "posts(first:1)"
    }
  ],
  "type": "Club",
  "abstractKey": null
};
(node as any).hash = '1293800741068de04adaf409b99de94c';
export default node;
