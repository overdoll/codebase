/**
 * @generated SignedSource<<268e4dd5fd004afc27006a0d7d6f02c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AudienceTileOverlayFragment$data = {
  readonly title: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
  } | null;
  readonly " $fragmentType": "AudienceTileOverlayFragment";
};
export type AudienceTileOverlayFragment = AudienceTileOverlayFragment$data;
export type AudienceTileOverlayFragment$key = {
  readonly " $data"?: AudienceTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AudienceTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AudienceTileOverlayFragment",
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
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "02009734a46d84b85a3fa233f10f9517";

export default node;
