/**
 * @generated SignedSource<<f022f459b45b7dd7206b3c7f8afcfede>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerMediaFragment$data = {
  readonly __typename: "ImageMedia";
  readonly " $fragmentSpreads": FragmentRefs<"BannerImageMediaFragment">;
  readonly " $fragmentType": "BannerMediaFragment";
} | {
  readonly __typename: "VideoMedia";
  readonly cover: {
    readonly " $fragmentSpreads": FragmentRefs<"BannerImageMediaFragment">;
  };
  readonly " $fragmentType": "BannerMediaFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "BannerMediaFragment";
};
export type BannerMediaFragment$key = {
  readonly " $data"?: BannerMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerMediaFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "BannerImageMediaFragment"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerMediaFragment",
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

(node as any).hash = "f5ef688397964e764b5a58ea10a12489";

export default node;
