/**
 * @generated SignedSource<<580f9b086f2799f2eaf649a7f2e718a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteVideoMediaFragment$data = {
  readonly cover: {
    readonly " $fragmentSpreads": FragmentRefs<"PosterImageMediaFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ContainersVideoMediaFragment">;
  readonly " $fragmentType": "RouletteVideoMediaFragment";
};
export type RouletteVideoMediaFragment$key = {
  readonly " $data"?: RouletteVideoMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteVideoMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteVideoMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ImageMedia",
      "kind": "LinkedField",
      "name": "cover",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PosterImageMediaFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainersVideoMediaFragment"
    }
  ],
  "type": "VideoMedia",
  "abstractKey": null
};

(node as any).hash = "b2d8d7dc095dddee20559bd3fe8d9959";

export default node;
