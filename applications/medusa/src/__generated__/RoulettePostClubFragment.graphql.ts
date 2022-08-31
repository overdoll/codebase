/**
 * @generated SignedSource<<23ca089c245108d75a8aa8f53c24044c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RoulettePostClubFragment$data = {
  readonly banner: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "RoulettePostClubFragment";
};
export type RoulettePostClubFragment$key = {
  readonly " $data"?: RoulettePostClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RoulettePostClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RoulettePostClubFragment",
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "banner",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f221bbae04d64feec4c6c6f1796fd627";

export default node;
