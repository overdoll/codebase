/**
 * @generated SignedSource<<cfd4a22a45e42d75e14f5b608dfc66e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BannerPublicClubMediaFragment$data = {
  readonly __typename: "ImageMedia";
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubImageMediaFragment">;
  readonly " $fragmentType": "BannerPublicClubMediaFragment";
} | {
  readonly __typename: "VideoMedia";
  readonly cover: {
    readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubImageMediaFragment">;
  };
  readonly " $fragmentType": "BannerPublicClubMediaFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "BannerPublicClubMediaFragment";
};
export type BannerPublicClubMediaFragment$key = {
  readonly " $data"?: BannerPublicClubMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BannerPublicClubMediaFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "BannerPublicClubImageMediaFragment"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BannerPublicClubMediaFragment",
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

(node as any).hash = "f97838500ec569d0c2408f892782bf4c";

export default node;
