/**
 * @generated SignedSource<<af2ce44f781522458de7869b3576bca8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GridPaginationPostContentFragment$data = {
  readonly media: {
    readonly __typename: "ImageMedia";
    readonly " $fragmentSpreads": FragmentRefs<"PreviewGridImageMediaFragment">;
  } | {
    readonly __typename: "VideoMedia";
    readonly cover: {
      readonly " $fragmentSpreads": FragmentRefs<"PreviewGridImageMediaFragment">;
    };
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
  readonly " $fragmentType": "GridPaginationPostContentFragment";
};
export type GridPaginationPostContentFragment$key = {
  readonly " $data"?: GridPaginationPostContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GridPaginationPostContentFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "PreviewGridImageMediaFragment"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GridPaginationPostContentFragment",
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
  "type": "PostContent",
  "abstractKey": null
};
})();

(node as any).hash = "f75259be0b8cfdac69165ab653ab7131";

export default node;
