/**
 * @generated SignedSource<<02ec150414b017a76601098713306018>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesTileOverlayFragment$data = {
  readonly banner: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceItemFragment">;
  } | null;
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "SeriesTileOverlayFragment";
};
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
      "name": "banner",
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

(node as any).hash = "bcac93a6b12af70c4e2db0225d5ca30c";

export default node;
