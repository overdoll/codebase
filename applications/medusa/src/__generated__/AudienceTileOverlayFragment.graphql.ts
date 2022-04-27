/**
 * @generated SignedSource<<31bcf9aea457010efecf6d929873b678>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AudienceTileOverlayFragment$data = {
  readonly id: string;
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
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "03e179b8de683a7e2fc08728364b64a5";

export default node;
