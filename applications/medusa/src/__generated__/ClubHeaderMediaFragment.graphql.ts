/**
 * @generated SignedSource<<97ffbf8aa8f0e7f0cd489af23a9f8842>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubHeaderMediaFragment$data = {
  readonly __typename: "ImageMedia";
  readonly " $fragmentSpreads": FragmentRefs<"HeaderImageMediaFragment">;
  readonly " $fragmentType": "ClubHeaderMediaFragment";
} | {
  readonly __typename: "VideoMedia";
  readonly cover: {
    readonly " $fragmentSpreads": FragmentRefs<"HeaderImageMediaFragment">;
  };
  readonly " $fragmentType": "ClubHeaderMediaFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ClubHeaderMediaFragment";
};
export type ClubHeaderMediaFragment$key = {
  readonly " $data"?: ClubHeaderMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubHeaderMediaFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "HeaderImageMediaFragment"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubHeaderMediaFragment",
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

(node as any).hash = "97c8962aaf88c2008d03b12bf9a6f8e4";

export default node;
