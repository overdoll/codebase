/**
 * @generated SignedSource<<d173639c7c83506319d14281c5b7d7ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SmallBannerMediaFragment$data = {
  readonly __typename: "ImageMedia";
  readonly " $fragmentSpreads": FragmentRefs<"SmallBannerImageMediaFragment">;
  readonly " $fragmentType": "SmallBannerMediaFragment";
} | {
  readonly __typename: "VideoMedia";
  readonly cover: {
    readonly " $fragmentSpreads": FragmentRefs<"SmallBannerImageMediaFragment">;
  };
  readonly " $fragmentType": "SmallBannerMediaFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "SmallBannerMediaFragment";
};
export type SmallBannerMediaFragment$key = {
  readonly " $data"?: SmallBannerMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SmallBannerMediaFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "SmallBannerImageMediaFragment"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SmallBannerMediaFragment",
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

(node as any).hash = "2c7a9046e9aa48a89f416bb7c50fbe5c";

export default node;
