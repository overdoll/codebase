/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SeriesTileOverlayFragment = {
    readonly title: string;
    readonly thumbnail: {
        readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
    } | null;
    readonly " $refType": "SeriesTileOverlayFragment";
};
export type SeriesTileOverlayFragment$data = SeriesTileOverlayFragment;
export type SeriesTileOverlayFragment$key = {
    readonly " $data"?: SeriesTileOverlayFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SeriesTileOverlayFragment">;
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
(node as any).hash = 'f54e3cfc4cea72da097bc5e2dfd9033d';
export default node;
