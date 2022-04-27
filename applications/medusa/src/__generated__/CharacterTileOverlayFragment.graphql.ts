/**
 * @generated SignedSource<<e8f32d2f2c03754418f26f152a509738>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CharacterTileOverlayFragment$data = {
  readonly id: string;
  readonly name: string;
  readonly series: {
    readonly title: string;
  };
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
  } | null;
  readonly " $fragmentType": "CharacterTileOverlayFragment";
};
export type CharacterTileOverlayFragment = CharacterTileOverlayFragment$data;
export type CharacterTileOverlayFragment$key = {
  readonly " $data"?: CharacterTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CharacterTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CharacterTileOverlayFragment",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Series",
      "kind": "LinkedField",
      "name": "series",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
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
  "type": "Character",
  "abstractKey": null
};

(node as any).hash = "78c35bca29a5a51131957a69b9e35c68";

export default node;
