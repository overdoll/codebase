/**
 * @generated SignedSource<<d3a3909939b207a789b30ccba74917f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesTileOverlayFragment$data = {
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

(node as any).hash = "f54e3cfc4cea72da097bc5e2dfd9033d";

export default node;
