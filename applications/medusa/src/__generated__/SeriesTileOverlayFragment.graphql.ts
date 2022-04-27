/**
 * @generated SignedSource<<40d4c70d9712395d95558a78da5bb634>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesTileOverlayFragment$data = {
  readonly id: string;
  readonly title: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
  } | null;
  readonly " $fragmentType": "SeriesTileOverlayFragment";
};
export type SeriesTileOverlayFragment = SeriesTileOverlayFragment$data;
export type SeriesTileOverlayFragment$key = {
  readonly " $data"?: SeriesTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesTileOverlayFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
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
          "name": "ResourceItemFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "986d0d7bae1227d80148e5d384549de2";

export default node;
