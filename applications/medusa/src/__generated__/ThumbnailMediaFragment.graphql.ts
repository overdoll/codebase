/**
 * @generated SignedSource<<dc26df46270a19a1805fe77da2c59d79>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ThumbnailMediaFragment$data = {
  readonly __typename: "ImageMedia";
  readonly " $fragmentSpreads": FragmentRefs<"ThumbnailImageMediaFragment">;
  readonly " $fragmentType": "ThumbnailMediaFragment";
} | {
  readonly __typename: "VideoMedia";
  readonly cover: {
    readonly " $fragmentSpreads": FragmentRefs<"ThumbnailImageMediaFragment">;
  };
  readonly " $fragmentType": "ThumbnailMediaFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ThumbnailMediaFragment";
};
export type ThumbnailMediaFragment$key = {
  readonly " $data"?: ThumbnailMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ThumbnailMediaFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "ThumbnailImageMediaFragment"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ThumbnailMediaFragment",
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
      "selections": (v0/*: any*/),
      "type": "ImageMedia",
      "abstractKey": null
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
    }
  ],
  "type": "Media",
  "abstractKey": "__isMedia"
};
})();

(node as any).hash = "58bf9988dd4c38f8f0cc9907482b01b0";

export default node;
