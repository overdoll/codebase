/**
 * @generated SignedSource<<939b1a21c1ae3078c5a312c8dad2d71f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenBackgroundFragment$data = {
  readonly content: ReadonlyArray<{
    readonly media: {
      readonly __typename: "ImageMedia";
      readonly " $fragmentSpreads": FragmentRefs<"BackgroundPosterImageMediaFragment">;
    } | {
      readonly __typename: "VideoMedia";
      readonly cover: {
        readonly " $fragmentSpreads": FragmentRefs<"BackgroundPosterImageMediaFragment">;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
  }>;
  readonly " $fragmentType": "RouletteScreenBackgroundFragment";
};
export type RouletteScreenBackgroundFragment$key = {
  readonly " $data"?: RouletteScreenBackgroundFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenBackgroundFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "BackgroundPosterImageMediaFragment"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenBackgroundFragment",
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "media",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ImageMedia",
                  "kind": "LinkedField",
                  "name": "cover",
                  "plural": false,
                  "selections": (v0/*: any*/),
                  "storageKey": null
                }
              ],
              "type": "VideoMedia",
              "abstractKey": null
            },
            {
              "kind": "InlineFragment",
              "selections": (v0/*: any*/),
              "type": "ImageMedia",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "1dbf67cbd262c6bd9b4cabf3d2f913c2";

export default node;
